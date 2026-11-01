// Chạy trong tab gemini.google.com. Cứ vài giây hỏi nền (nen.js) có việc không; có thì:
// chat mới → chọn model → dán các tệp đề → câu lệnh → '@thẻ' (tùy chọn) → Gửi → chờ xong
// → gửi về: chữ thô + Markdown dựng lại từ trang. Các bước thao tác giữ theo tiện ích
// Pdf-Picture-to-Tex (giao diện Gemini 10/2026); Google đổi giao diện thì sửa các bộ chọn dưới đây.
"use strict";
const ngu = ms => new Promise(r => setTimeout(r, ms));
let daTaiLai = false;
function moCoi() {   // tiện ích vừa nạp lại: đoạn mã cũ trong tab mất liên lạc -> tải lại trang
  if (chrome.runtime && chrome.runtime.id) return false;
  if (!daTaiLai) { daTaiLai = true; location.reload(); }
  return true;
}
const gui = (loai, du_lieu) => new Promise(r => {
  if (moCoi()) return r(null);
  try { chrome.runtime.sendMessage({loai, du_lieu}, r); } catch (e) { moCoi(); r(null); }
});
const log = s => { console.log("[giai-de-su]", s); gui("nhat-ky", {s}); };
const hien = e => e && e.offsetParent !== null;
const tim = ds => { for (const s of ds) { const e = [...document.querySelectorAll(s)].find(hien); if (e) return e; } return null; };
let dangLam = false, biHuy = false;
async function cho(ham, ms = 10000, buoc = 250) {
  const het = Date.now() + ms;
  while (Date.now() < het) { if (biHuy) return null; const kq = ham(); if (kq) return kq; await ngu(buoc); }
  return null;
}

const O_NHAP = ["div.ql-editor[contenteditable='true']", "rich-textarea div[contenteditable='true']", "div[contenteditable='true'][role='textbox']"];
const NUT_GUI = ["button[aria-label*='Gửi']", "button[aria-label*='Send']", "button.send-button"];
const NUT_NGUNG = ["button[aria-label*='Ngừng']", "button[aria-label*='Dừng']", "button[aria-label*='Stop']"];
const NUT_MODEL = ["[data-test-id='bard-mode-menu-button']", "button[aria-label*='chọn chế độ']", "button[aria-label*='mode picker']"];
const CHAT_MOI = ["[data-test-id='new-chat-button'] a", "[data-test-id='new-chat-button'] button", "[data-test-id='new-chat-button']",
                  "a[aria-label*='trò chuyện mới']", "button[aria-label*='trò chuyện mới']", "a[aria-label*='New chat']", "button[aria-label*='New chat']"];
const XOA_TEP = ["button[aria-label*='Xóa tệp']", "button[aria-label*='Xoá tệp']", "button[aria-label*='Remove file']", "button[data-test-id*='cancel-button']"];
const XEM_TEP = "img[src^='blob:'], [data-test-id*='file-preview'], .file-preview, uploader img, uploader-file-preview";
const traLois = () => [...document.querySelectorAll("message-content")].filter(hien);
const VIEC_DO = "gds-viec-do";
const uHienTai = () => { const m = location.pathname.match(/^\/u\/(\d+)\//); return m ? Number(m[1]) : 0; };
const goc = n => n ? `https://gemini.google.com/u/${n}/` : "https://gemini.google.com/";
const demTep = () => document.querySelectorAll(XEM_TEP).length;

async function moChatMoi(v) {
  if (traLois().length) {
    const nut = tim(CHAT_MOI);
    if (nut) nut.click();
    if (!nut || !await cho(() => !traLois().length && tim(O_NHAP), 15000)) {
      if ((v.lan_tai_lai || 0) >= 2) throw new Error("không mở được chat mới");
      sessionStorage.setItem(VIEC_DO, JSON.stringify({...v, lan_tai_lai: (v.lan_tai_lai || 0) + 1}));
      location.assign(goc(uHienTai()) + "app");
      return false;
    }
    await ngu(800);
  }
  for (let i = 0; i < 8; i++) { const x = tim(XOA_TEP); if (!x) break; x.click(); await ngu(300); }
  const o = tim(O_NHAP);
  if (o && o.innerText.trim()) { o.focus(); document.execCommand("selectAll"); document.execCommand("delete"); }
  return true;
}

const khopModel = (muon, chu) => {
  const t = (chu || "").toLowerCase(), m = (muon || "").toLowerCase();
  if (m === "flash") return t.includes("flash") && !t.includes("lite");
  if (m === "pro") return /\bpro\b/.test(t);
  return t.includes(m);
};
const nhanModel = () => { const n = tim(NUT_MODEL); return n ? ((n.getAttribute("aria-label") || "") + " " + n.innerText) : ""; };
async function chonModel(muon) {
  if (!muon || khopModel(muon, nhanModel())) return;
  const nut = tim(NUT_MODEL);
  if (!nut) return log("không thấy nút chọn model — giữ model hiện tại");
  nut.click();
  const muc = await cho(() => [...document.querySelectorAll("[role='menuitem'], [role='menuitemradio']")]
    .filter(hien).find(e => khopModel(muon, (e.innerText || "").split("\n")[0])), 5000);
  if (!muc) { document.body.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape", bubbles: true})); return log("menu không có model " + muon); }
  muc.click();
  await cho(() => khopModel(muon, nhanModel()), 6000);
}

function tepTuB64(t) {
  const bin = atob(t.b64), a = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
  return new File([a], t.ten || "de", {type: t.type || "image/png"});
}
// dán MỘT tệp (ảnh/PDF) rồi chờ số bản xem trước tăng; thử kéo-thả nếu dán không ăn
async function danTep(o, tep) {
  const truoc = demTep();
  const dt = new DataTransfer(); dt.items.add(tep);
  o.focus();
  o.dispatchEvent(new ClipboardEvent("paste", {clipboardData: dt, bubbles: true, cancelable: true}));
  if (await cho(() => demTep() > truoc, 12000)) return true;
  for (const ev of ["dragenter", "dragover", "drop"])
    o.dispatchEvent(new DragEvent(ev, {dataTransfer: dt, bubbles: true, cancelable: true}));
  return !!await cho(() => demTep() > truoc, 12000);
}

function conTroCuoi(o) {
  o.focus();
  let n = o; while (n.lastChild) n = n.lastChild;
  const r = document.createRange();
  if (n.nodeType === 3) r.setStart(n, n.length); else { r.selectNodeContents(n); r.collapse(false); }
  r.collapse(true);
  const s = getSelection(); s.removeAllRanges(); s.addRange(r);
}
async function goTungKyTu(o, chu) {
  for (const k of chu) {
    const kw = {key: k, bubbles: true, cancelable: true};
    o.dispatchEvent(new KeyboardEvent("keydown", kw));
    o.dispatchEvent(new KeyboardEvent("keypress", kw));
    document.execCommand("insertText", false, k);
    o.dispatchEvent(new KeyboardEvent("keyup", kw));
    await ngu(35);
  }
}
function theOCuoi(ten) {
  const chu = (tim(O_NHAP)?.innerText || "").replace(/ /g, " ").trimEnd();
  return chu.endsWith("@" + ten);
}
async function ganKyNang(ten) {
  const o = tim(O_NHAP);
  conTroCuoi(o);
  await goTungKyTu(o, " @" + ten);
  const muc = await cho(() => [...document.querySelectorAll("button.at-mentions-v2-item")]
    .filter(hien).find(e => (e.innerText || "").split("\n")[0].trim() === ten), 6000);
  if (!muc) {
    o.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape", bubbles: true}));
    conTroCuoi(tim(O_NHAP));
    for (let i = 0; i < ten.length + 2; i++) document.execCommand("delete", false);
    return false;
  }
  muc.click();
  await ngu(800);
  return theOCuoi(ten);
}

const IM_LANG_TOI_DA = 60000;
async function choTraLoi(soCu) {
  const batDau = Date.now();
  let cu = "", onDinh = 0, imTu = Date.now();
  while (Date.now() - batDau < 1200000) {
    await ngu(1000);
    if (biHuy) return;
    const ds = traLois();
    const dangViet = !!tim(NUT_NGUNG) || (ds.length > soCu && (ds[ds.length - 1].innerText || "").trim());
    if (dangViet) imTu = Date.now();
    else if (Date.now() - imTu > IM_LANG_TOI_DA) return;
    if ((Date.now() - batDau) % 15000 < 1000 && ds.length > soCu)
      log(`Gemini đang viết… ${(ds[ds.length - 1].innerText || "").length} ký tự`);
    if (ds.length <= soCu) continue;
    const chu = ds[ds.length - 1].innerText || "";
    if (!tim(NUT_NGUNG) && chu.trim() && chu === cu) { if (++onDinh >= 4) break; } else onDinh = 0;
    cu = chu;
  }
}

// ---------- dựng lại Markdown từ HTML câu trả lời ----------
function htmlToMd(root) {
  const INL = /^(SPAN|STRONG|B|EM|I|A|CODE|BR|SUP|SUB|U|MARK|SMALL)$/;
  const inlNode = c => {
    if (c.nodeType === 3) return c.nodeValue.replace(/\s+/g, " ");
    if (c.nodeType !== 1) return "";
    const dm = c.getAttribute("data-math");
    if (dm) return c.classList.contains("math-block") ? `\n$$${dm}$$\n` : `$${dm}$`;
    const t = c.tagName, inner = () => inl(c);
    if (t === "BR") return "\n";
    if (t === "STRONG" || t === "B") { const s = inner(); const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/); return m[2] ? `${m[1]}**${m[2]}**${m[3]}` : s; }
    if (t === "EM" || t === "I") { const s = inner(); const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/); return m[2] ? `${m[1]}*${m[2]}*${m[3]}` : s; }
    if (t === "CODE") return "`" + c.innerText + "`";
    return inner();
  };
  const inl = n => [...n.childNodes].map(inlNode).join("");
  const list = (ul, nho) => {
    const ol = ul.tagName === "OL"; let i = 0, s = "";
    for (const li of ul.children) {
      if (li.tagName !== "LI") continue;
      i++;
      const text = [...li.childNodes].filter(c => !(c.nodeType === 1 && /^(UL|OL)$/.test(c.tagName))).map(c => c.nodeType === 1 && c.tagName === "P" ? inl(c) : inlNode(c)).join("").trim();
      s += "  ".repeat(nho) + (ol ? i + ". " : "* ") + text + "\n";
      [...li.children].filter(c => /^(UL|OL)$/.test(c.tagName)).forEach(c => { s += list(c, nho + 1); });
    }
    return s;
  };
  const bang = t => {
    const rows = [...t.querySelectorAll("tr")].map(tr => [...tr.children].map(c => inl(c).trim().replace(/\|/g, "\\|").replace(/\n+/g, "<br>")));
    if (!rows.length) return "";
    const w = Math.max(...rows.map(r => r.length)); rows.forEach(r => { while (r.length < w) r.push(""); });
    const dong = r => "| " + r.join(" | ") + " |";
    return [dong(rows[0]), "|" + " --- |".repeat(w), ...rows.slice(1).map(dong)].join("\n");
  };
  const blk = n => {
    let s = "";
    for (const c of n.childNodes) {
      if (c.nodeType === 3) { if (c.nodeValue.trim()) s += c.nodeValue.replace(/\s+/g, " "); continue; }
      if (c.nodeType !== 1) continue;
      const t = c.tagName;
      if (/^H[1-6]$/.test(t)) s += "\n\n" + "#".repeat(+t[1]) + " " + inl(c).trim() + "\n\n";
      else if (t === "P") s += "\n\n" + inl(c).trim() + "\n\n";
      else if (t === "UL" || t === "OL") s += "\n" + list(c, 0) + "\n";
      else if (t === "TABLE") s += "\n\n" + bang(c) + "\n\n";
      else if (t === "HR") s += "\n\n---\n\n";
      else if (t === "PRE" || t === "CODE-BLOCK") s += "\n\n```\n" + c.innerText.trim() + "\n```\n\n";
      else if (t === "BLOCKQUOTE") s += "\n\n> " + inl(c).trim() + "\n\n";
      else if (INL.test(t) || c.hasAttribute("data-math")) s += inlNode(c);
      else s += blk(c);
    }
    return s;
  };
  return blk(root).replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function docKetQua() {
  const ds = traLois(), cuoi = ds[ds.length - 1];
  const vung = document.querySelector("main") || document.body;
  let than = vung.innerText || "";
  document.querySelectorAll("message-content, user-query").forEach(e => { const t = e.innerText; if (t) than = than.split(t).join(" "); });
  let md = ""; try { md = cuoi ? htmlToMd(cuoi) : ""; } catch (e) { md = ""; }
  return {chu: cuoi ? cuoi.innerText : "", md, than_trang: than.slice(-20000), mo_hinh: nhanModel(), tai_khoan: uHienTai()};
}

async function lamViec(v) {
  dangLam = true; biHuy = false;
  const nhip = setInterval(async () => { if (await gui("nhip", {id: v.id}) === false) biHuy = true; }, 5000);
  const ketQua = du => gui("ket-qua", du.loi && !du.than_trang ? {id: v.id, ...du, than_trang: docKetQua().than_trang} : {id: v.id, ...du});
  try {
    if (v.tai_khoan != null && v.tai_khoan !== "") {
      const muonU = Number(v.tai_khoan);
      if (uHienTai() !== muonU) {
        if ((v.lan_doi_tk || 0) >= 1) return ketQua({khong_co_tai_khoan: true, tai_khoan: muonU});
        sessionStorage.setItem(VIEC_DO, JSON.stringify({...v, lan_doi_tk: (v.lan_doi_tk || 0) + 1}));
        log(`chuyển sang tài khoản /u/${muonU}/`);
        location.assign(goc(muonU) + "app");
        return;
      }
    }
    log("đang mở chat mới…");
    if (!await moChatMoi(v)) return;
    await chonModel(v.model);
    let o = tim(O_NHAP);
    if (!o) return ketQua({loi: "không thấy ô nhập của Gemini"});
    const teps = v.tep || [];
    for (let i = 0; i < teps.length; i++) {
      log(`đang đính kèm tệp ${i + 1}/${teps.length}: ${teps[i].ten}`);
      if (!await danTep(tim(O_NHAP), tepTuB64(teps[i]))) return ketQua({loi: `không đính được tệp “${teps[i].ten}”`});
      await ngu(600);
    }
    await ngu(1200);
    conTroCuoi(tim(O_NHAP));
    document.execCommand("insertText", false, v.cau_lenh);
    await ngu(800);
    if (v.ky_nang && !await ganKyNang(v.ky_nang)) return ketQua({khong_thay_ky_nang: true, ky_nang: v.ky_nang});
    const nut = await cho(() => { const n = tim(NUT_GUI); return n && !n.disabled && n.getAttribute("aria-disabled") !== "true" ? n : null; }, 25000);
    if (!nut) return ketQua({loi: "nút Gửi không sáng (có thể tệp còn đang tải hoặc Gemini chặn)"});
    const soCu = traLois().length;
    if (biHuy) return;
    nut.click();
    log(`đã gửi (${v.model || "model hiện tại"}${v.ky_nang ? ", @" + v.ky_nang : ""}) — đang chờ Gemini trả lời…`);
    await choTraLoi(soCu);
    if (biHuy) return log("việc đã bị hủy — dừng");
    ketQua(docKetQua());
  } catch (e) {
    ketQua({loi: String(e && e.message || e), than_trang: docKetQua().than_trang});
  } finally {
    clearInterval(nhip);
    dangLam = false;
  }
}

(function () {   // làm tiếp việc đang dở trước khi tải lại trang
  const cu = sessionStorage.getItem(VIEC_DO);
  if (!cu) return;
  sessionStorage.removeItem(VIEC_DO);
  const v = JSON.parse(cu);
  setTimeout(async () => { if (await gui("nhip", {id: v.id}) !== false) lamViec(v); }, 3000);
})();

setInterval(async () => {
  if (dangLam) return;
  const v = await gui("lay");
  if (v && v.id) lamViec(v);
}, 2500);
console.log("[giai-de-su] sẵn sàng trên", location.href);
