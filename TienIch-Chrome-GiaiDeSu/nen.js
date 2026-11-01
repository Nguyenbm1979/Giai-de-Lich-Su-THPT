// Nền (service worker): giữ MỘT việc hiện tại, giao cho tab Gemini, trả kết quả về tab trang Giải đề.
"use strict";
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
    if (tin.loai === "lay") {                       // tab Gemini hỏi có việc không
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
      cur.xong = true; toPage(cur.pageTab, {loai: "ket-qua", du}); return true;
    }
    return null;
  })().then(traLoi).catch(() => traLoi(null));
  return true;
});
