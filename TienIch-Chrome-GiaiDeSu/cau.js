// Chạy trong trang Giải đề: chuyển tin giữa trang (window.postMessage) và nền (nen.js).
"use strict";
const ra = o => window.postMessage({src: "gds-ext", ...o}, "*");
window.addEventListener("message", ev => {
  if (ev.source !== window || !ev.data || ev.data.src !== "gds-page") return;
  const d = ev.data;
  if (d.loai === "ping") return ra({loai: "pong", ver: chrome.runtime.getManifest().version});
  if (d.loai === "giao") {
    chrome.runtime.sendMessage({loai: "giao", job: d.job})
      .then(r => ra({loai: "da-giao", ...(r || {ok: false, loi: "tiện ích không phản hồi"})}))
      .catch(e => ra({loai: "da-giao", ok: false, loi: String(e && e.message || e)}));
  }
  if (d.loai === "huy") chrome.runtime.sendMessage({loai: "huy"}).catch(() => {});
});
// nền → trang (tiến độ, kết quả)
chrome.runtime.onMessage.addListener(m => { if (m && m.loai) ra(m); });
