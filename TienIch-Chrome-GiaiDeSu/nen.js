// Nền (service worker): giữ MỘT việc hiện tại, giao cho tab Gemini, trả kết quả về tab trang Giải đề.
// v1.6: trạng thái việc được lưu vào chrome.storage.session để không mất khi Chrome tắt/khởi động lại service worker.
"use strict";
let lastPoll = 0, lastPollTab = null;   // lần gần nhất một tab Gemini hỏi việc (để chẩn đoán)
const luuKq = new Map();   // id việc -> kết quả cuối (giữ vài việc gần nhất để trang hỏi lại nếu tin báo bị rơi)
const huyIds = new Set();   // id các việc đã bị hủy: không dựng lại sau khi service worker khởi động lại
const HUY_TOI_DA = 30;
let cur = null;   // {id, job, pageTab, nhan, huy, xong, beat, t0}
const GEM = "https://gemini.google.com/";
const goc = n => n ? `${GEM}u/${n}/` : GEM;
const toPage = (tab, msg) => chrome.tabs.sendMessage(tab, msg).catch(() => {});

// ---------- lưu / nạp lại trạng thái (chrome.storage.session) ----------
const KHO = (chrome.storage && chrome.storage.session) || null;
let luuCuoi = "", tepDaLuu = null, hangLuu = Promise.resolve();
// Nạp đúng MỘT lần lúc khởi động; mọi tin nhắn đều chờ `sanSang` rồi mới xử lý (tránh hai lần nạp ghi đè nhau).
async function napLai() {
  if (!KHO) return;
  try {
    const s = await KHO.get(["gds_cur", "gds_tep", "gds_huy", "gds_kq"]);
    (s.gds_huy || []).forEach(id => huyIds.add(id));
    (s.gds_kq || []).forEach(([id, du]) => luuKq.set(id, du));
    const c = s.gds_cur;
    if (!c) return;
    const dangChay = !c.xong && !c.huy;
    if (c.job && dangChay) {
      if (!Array.isArray(s.gds_tep)) return;      // không còn tệp đề (ghi hỏng/hết hạn mức) -> coi như mất việc; trang sẽ tự gửi lại
      c.job = {...c.job, tep: s.gds_tep}; tepDaLuu = c.id;
    }
    cur = {...c, beat: Date.now()};                // beat mới: tránh quy tắc 75s giao việc cho tab Gemini thứ hai
  } catch (e) { /* không có kho thì chạy như bản cũ (chỉ trong bộ nhớ) */ }
}
const sanSang = napLai();
async function luu() {
  if (!KHO) return;
  const c = cur ? {id: cur.id, pageTab: cur.pageTab, nhan: cur.nhan, huy: cur.huy, xong: cur.xong, t0: cur.t0,
                   job: cur.job ? {...cur.job, tep: undefined} : null} : null;
  const huy = [...huyIds].slice(-HUY_TOI_DA), kq = [...luuKq];
  const snap = JSON.stringify([c, huy, kq.map(k => k[0])]);
  if (snap === luuCuoi) return;                    // chỉ ghi khi có thay đổi thật (không ghi theo mỗi nhịp)
  luuCuoi = snap;
  try {
    const tepId = cur && cur.job && !cur.xong && !cur.huy ? cur.id : null;
    if (tepId !== tepDaLuu) {
      if (tepId) await KHO.set({gds_tep: cur.job.tep || []}); else await KHO.remove("gds_tep");
      tepDaLuu = tepId;
    }
    await KHO.set({gds_cur: c, gds_huy: huy, gds_kq: kq});
  } catch (e) {   // hết hạn mức: xóa bản lưu cũ để sau khi nạp lại không dựng nhầm việc đã xong (khi đó khoiPhuc dựng lại việc từ nhịp tab Gemini)
    try { await KHO.remove(["gds_cur", "gds_tep"]); } catch (e2) { /* bỏ qua */ }
    tepDaLuu = null;
  }
}
const luuHang = () => (hangLuu = hangLuu.then(luu, luu));

async function moTabGemini(job) {
  const ds = await chrome.tabs.query({url: GEM + "*"});
  if (!ds.length) { await chrome.tabs.create({url: goc(job.tai_khoan) + "app", active: true}); return; }
  // Tab Gemini nằm nền thì Chrome làm chậm bộ đếm giờ của nó -> đưa lên trước (chỉ đổi tab trong cửa sổ của nó, không cướp cửa sổ khác)
  if (!ds.some(t => t.active)) chrome.tabs.update(ds[0].id, {active: true}).catch(() => {});
}
// Service worker có thể bị Chrome tắt giữa chừng làm mất `cur`: dựng lại từ id việc + tab trang mà tab Gemini gửi kèm
function khoiPhuc(du) {
  if ((!cur || ((cur.xong || cur.huy) && cur.id !== du.id)) && du && du.id && du.pageTab != null && !huyIds.has(du.id))
    cur = {id: du.id, job: null, pageTab: du.pageTab, nhan: true, huy: false, xong: false, beat: Date.now(), t0: Date.now()};
}

async function xuLy(tin, sender) {
  const du = tin.du_lieu || {};
  if (tin.loai === "giao") {
    if (cur && !cur.xong && !cur.huy && Date.now() - cur.beat < 120000 && Date.now() - cur.t0 < 1500000)
      return {ok: false, loi: "Đang có một việc khác chạy — hãy đợi hoặc bấm Hủy."};
    cur = {id: tin.job.id, job: tin.job, pageTab: sender.tab.id, nhan: false, huy: false, xong: false, beat: Date.now(), t0: Date.now()};
    await moTabGemini(tin.job);
    return {ok: true};
  }
  if (tin.loai === "lay-ket-qua") return luuKq.get(du.id) || null;   // trang hỏi lại kết quả của một việc đã xong
  if (tin.loai === "huy") {
    if (cur && (!du.id || cur.id === du.id)) cur.huy = true;          // huỷ theo id: lệnh huỷ muộn của việc cũ không giết việc mới
    if (du.id) { huyIds.add(du.id); while (huyIds.size > HUY_TOI_DA) huyIds.delete(huyIds.values().next().value); }
    return {ok: true};
  }
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
}

chrome.runtime.onMessage.addListener((tin, sender, traLoi) => {
  (async () => {
    await sanSang;
    try { return await xuLy(tin, sender); }
    finally { await luuHang(); }
  })().then(traLoi).catch(() => traLoi(null));
  return true;
});
