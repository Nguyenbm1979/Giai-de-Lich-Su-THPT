// Chạy trong trang Giải đề: chuyển tin giữa trang (window.postMessage) và nền (nen.js).
"use strict";
const ra = o => window.postMessage({src: "gds-ext", ...o}, "*");
// Tiện ích vừa được tải lại: đoạn mã cũ còn trong tab mất liên lạc (chrome.runtime.id = undefined)
// -> mọi lệnh chrome.runtime.* ném "Extension context invalidated". Báo cho trang thay vì lỗi.
const conSong = () => { try { return !!(chrome.runtime && chrome.runtime.id); } catch (e) { return false; } };
function hetHan() {
  ra({loai: "het-han"});
}
window.addEventListener("message", ev => {
  if (ev.source !== window || !ev.data || ev.data.src !== "gds-page") return;
  const d = ev.data;
  if (!conSong()) return hetHan();
  try {
    if (d.loai === "ping") return ra({loai: "pong", ver: chrome.runtime.getManifest().version});
    if (d.loai === "giao") {
      chrome.runtime.sendMessage({loai: "giao", job: d.job})
        .then(r => ra({loai: "da-giao", ...(r || {ok: false, loi: "tiện ích không phản hồi"})}))
        .catch(e => ra({loai: "da-giao", ok: false, loi: String(e && e.message || e)}));
    }
    if (d.loai === "trang-thai")
      chrome.runtime.sendMessage({loai: "trang-thai"})
        .then(r => ra({loai: "trang-thai", tu_dong: !!d.tu_dong, ...(r || {tabs: -1})}))
        .catch(() => ra({loai: "trang-thai", tu_dong: !!d.tu_dong, tabs: -1}));
    if (d.loai === "lay-ket-qua")
      chrome.runtime.sendMessage({loai: "lay-ket-qua", du_lieu: {id: d.id}}).then(r => { if (r) ra({loai: "ket-qua", du: r}); }).catch(() => {});
    if (d.loai === "huy") chrome.runtime.sendMessage({loai: "huy", du_lieu: {id: d.id}}).catch(() => {});
  } catch (e) {
    if (!conSong()) return hetHan();
    ra({loai: "da-giao", ok: false, loi: String(e && e.message || e)});
  }
});
// nền → trang (tiến độ, kết quả)
try {
  chrome.runtime.onMessage.addListener(m => { if (m && m.loai) ra(m); });
} catch (e) { /* ngữ cảnh đã hết hạn lúc nạp: trang sẽ nhận 'het-han' khi gửi lệnh */ }
