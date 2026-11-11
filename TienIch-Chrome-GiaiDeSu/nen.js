// Nền (service worker): giữ MỘT việc hiện tại, giao cho tab Gemini, trả kết quả về tab trang Giải đề.
"use strict";
let lastPoll = 0, lastPollTab = null;   // lần gần nhất một tab Gemini hỏi việc (để chẩn đoán)
const luuKq = new Map();   // id việc -> kết quả cuối (giữ vài việc gần nhất để trang hỏi lại nếu tin báo bị rơi)
const huyIds = new Set();   // id các việc đã bị hủy: không dựng lại sau khi service worker khởi động lại
let cur = null;   // {id, job, pageTab, nhan, huy, xong, beat, t0}
const GEM = "https://gemini.google.com/";
const goc = n => n ? `${GEM}u/${n}/` : GEM;
const toPage = (tab, msg) => chrome.tabs.sendMessage(tab, msg).catch(() => {});

async function moTabGemini(job) {
  const ds = await chrome.tabs.query({url: GEM + "*"});
  if (!ds.length) { await chrome.tabs.create({url: goc(job.tai_khoan) + "app", active: true}); return; }
  // Tab Gemini nằm nền thì Chrome làm chậm bộ đếm giờ của nó -> đưa lên trước (chỉ đổi tab trong cửa sổ của nó, không cướp cửa sổ khác)
  if (!ds.some(t => t.active)) chrome.tabs.update(ds[0].id, {active: true}).catch(() => {});
}
// Service worker có thể bị Chrome tắt giữa chừng làm mất `cur`: dựng lại từ id việc + tab trang mà tab Gemini gửi kèm
function khoiPhuc(du) {
  if (!cur && du && du.id && du.pageTab != null && !huyIds.has(du.id))
    cur = {id: du.id, job: null, pageTab: du.pageTab, nhan: true, huy: false, xong: false, beat: Date.now(), t0: Date.now()};
}

chrome.runtime.onMessage.addListener((tin, sender, traLoi) => {
  (async () => {
    const du = tin.du_lieu || {};
    if (tin.loai === "giao") {
      if (cur && !cur.xong && !cur.huy && Date.now() - cur.beat < 120000 && Date.now() - cur.t0 < 1500000)
        return {ok: false, loi: "Đang có một việc khác chạy — hãy đợi hoặc bấm Hủy."};
      cur = {id: tin.job.id, job: tin.job, pageTab: sender.tab.id, nhan: false, huy: false, xong: false, beat: Date.now(), t0: Date.now()};
      await moTabGemini(tin.job);
      return {ok: true};
    }
    if (tin.loai === "lay-ket-qua") return luuKq.get(du.id) || null;   // trang hỏi lại kết quả của một việc đã xong
    if (tin.loai === "huy") { if (cur) cur.huy = true; if (du.id) huyIds.add(du.id); return {ok: true}; }
    if (tin.loai === "trang-thai") {                // trang Giải đề hỏi: tab Gemini có đang chạy tiện ích không?
      const tabs = await chrome.tabs.query({url: GEM + "*"});
      return {tabs: tabs.length, poll_ago: lastPoll ? Date.now() - lastPoll : null,
              job: cur ? {nhan: cur.nhan, xong: cur.xong, huy: cur.huy, tuoi: Date.now() - cur.t0} : null};
    }
    if (tin.loai === "lay") {                       // tab Gemini hỏi có việc không
      lastPoll = Date.now(); lastPollTab = sender.tab ? sender.tab.id : null;
      if (!cur || cur.xong || cur.huy || !cur.job) return null;
      // tab nhận việc im lặng quá 75s (đóng/treo) -> cho tab khác nhận lại
      if (cur.nhan && Date.now() - cur.beat > 75000) cur.nhan = false;
      if (cur.nhan) return null;
      cur.nhan = true; cur.beat = Date.now();
      return {...cur.job, pageTab: cur.pageTab};
    }
    if (tin.loai === "nhip") {                      // false = việc đã bỏ/hủy -> tab thôi làm
      khoiPhuc(du);
      if (!cur || cur.id !== du.id || cur.huy || cur.xong) return false;
      cur.beat = Date.now(); toPage(cur.pageTab, {loai: "nhip"}); return true;   // báo trang biết tab Gemini còn sống
    }
    if (tin.loai === "nhat-ky") { khoiPhuc(du); if (cur) toPage(cur.pageTab, {loai: "tien-do", s: du.s}); return true; }
    if (tin.loai === "ket-qua") {
      khoiPhuc(du);
      if (!cur || cur.id !== du.id) return false;
      luuKq.set(du.id, du); if (luuKq.size > 4) luuKq.delete(luuKq.keys().next().value);
      cur.xong = true; toPage(cur.pageTab, {loai: "ket-qua", du});
      if (du.chuan_bi && sender.tab) {              // đưa tab Gemini lên trước để người dùng bấm Gửi
        chrome.tabs.update(sender.tab.id, {active: true}).catch(() => {});
        chrome.windows.update(sender.tab.windowId, {focused: true}).catch(() => {});
      }
      return true;
    }
    return null;
  })().then(traLoi).catch(() => traLoi(null));
  return true;
});
