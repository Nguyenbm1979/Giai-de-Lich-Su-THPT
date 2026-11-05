// Nền (service worker): giữ MỘT việc hiện tại, giao cho tab Gemini, trả kết quả về tab trang Giải đề.
"use strict";
let lastPoll = 0, lastPollTab = null;   // lần gần nhất một tab Gemini hỏi việc (để chẩn đoán)
let cur = null;   // {id, job, pageTab, nhan, huy, xong, beat, t0}
const GEM = "https://gemini.google.com/";
const goc = n => n ? `${GEM}u/${n}/` : GEM;
const toPage = (tab, msg) => chrome.tabs.sendMessage(tab, msg).catch(() => {});

async function moTabGemini(job) {
  const ds = await chrome.tabs.query({url: GEM + "*"});
  if (ds.length) return;
  await chrome.tabs.create({url: goc(job.tai_khoan) + "app", active: true});
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
    if (tin.loai === "huy") { if (cur) cur.huy = true; return {ok: true}; }
    if (tin.loai === "trang-thai") {                // trang Giải đề hỏi: tab Gemini có đang chạy tiện ích không?
      const tabs = await chrome.tabs.query({url: GEM + "*"});
      return {tabs: tabs.length, poll_ago: lastPoll ? Date.now() - lastPoll : null,
              job: cur ? {nhan: cur.nhan, xong: cur.xong, huy: cur.huy, tuoi: Date.now() - cur.t0} : null};
    }
    if (tin.loai === "lay") {                       // tab Gemini hỏi có việc không
      lastPoll = Date.now(); lastPollTab = sender.tab ? sender.tab.id : null;
      if (!cur || cur.xong || cur.huy) return null;
      // tab nhận việc im lặng quá 75s (đóng/treo) -> cho tab khác nhận lại
      if (cur.nhan && Date.now() - cur.beat > 75000) cur.nhan = false;
      if (cur.nhan) return null;
      cur.nhan = true; cur.beat = Date.now();
      return cur.job;
    }
    if (tin.loai === "nhip") {                      // false = việc đã bỏ/hủy -> tab thôi làm
      if (!cur || cur.id !== du.id || cur.huy || cur.xong) return false;
      cur.beat = Date.now(); return true;
    }
    if (tin.loai === "nhat-ky") { if (cur) toPage(cur.pageTab, {loai: "tien-do", s: du.s}); return true; }
    if (tin.loai === "ket-qua") {
      if (!cur || cur.id !== du.id) return false;
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
