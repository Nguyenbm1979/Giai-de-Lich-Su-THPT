# Hướng dẫn đưa web lên GitHub Pages (không cần biết lập trình)

Bạn chỉ cần trình duyệt và tài khoản GitHub. Làm 1 lần, sau đó có link dùng mãi trên mọi máy.

---

## A. Tạo kho chứa (repository)

1. Đăng nhập https://github.com → góc trên phải bấm dấu **➕** → **New repository**.
2. **Repository name:** gõ `giai-de-su` (hoặc tên bạn thích, không dấu, không khoảng trắng).
3. Chọn **Public**.
4. Bấm **Create repository**.

## B. Tải file lên

1. Trong kho vừa tạo, bấm **Add file → Upload files**.
2. Kéo–thả **3 file** này vào:
   - `index.html`  ← file quan trọng nhất (chính là ứng dụng)
   - `README.md`
   - `HUONG-DAN-DAY-LEN-GITHUB.md`
3. Kéo xuống dưới bấm **Commit changes**.

> ⚠️ KHÔNG tải các file PDF sách giáo khoa lên đây. Sách sẽ tải trực tiếp trong web (xem README).

## C. Bật GitHub Pages

1. Trong kho, vào tab **Settings** (bánh răng).
2. Menu trái chọn **Pages**.
3. Mục **Source**: chọn **Deploy from a branch**.
4. **Branch**: chọn **main**, thư mục để **/ (root)** → bấm **Save**.
5. Đợi khoảng 1 phút, tải lại trang. GitHub sẽ hiện dòng:
   **"Your site is live at https://<tên-tài-khoản>.github.io/giai-de-su/"**

## D. Dùng

- Mở link đó trên máy tính hoặc điện thoại.
- Lần đầu: dán API key (mục 1), tải sách PDF (mục 2), tải đề (mục 3), bấm **Giải đề**, rồi **Tải Word**.
- Nên **lưu (bookmark)** link này lại để lần sau mở nhanh.

---

## Cập nhật web sau này

Khi có bản `index.html` mới: vào kho → mở file `index.html` → bấm biểu tượng **cây bút (Edit)**
→ dán nội dung mới → **Commit changes**. Web tự cập nhật sau ~1 phút.

## Cách dùng bằng Git (nếu bạn quen dòng lệnh)

```bash
git init
git add index.html README.md HUONG-DAN-DAY-LEN-GITHUB.md
git commit -m "Web giai de Lich su"
git branch -M main
git remote add origin https://github.com/<tên-tài-khoản>/giai-de-su.git
git push -u origin main
```

Sau đó bật Pages như bước C.
