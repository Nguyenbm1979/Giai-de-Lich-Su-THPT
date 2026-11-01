# Trợ lý giải đề Lịch sử THPT

Web tĩnh giúp giáo viên Lịch sử tạo file lời giải đề thi (Word .docx) từ ảnh/PDF đề thi,
dùng Google Gemini (AI Studio). Bám sát SGK Kết nối tri thức & Chương trình GDPT 2018.

- Chạy hoàn toàn trong trình duyệt, không cần server, dùng được trên Windows/macOS/điện thoại.
- Chép **đầy đủ đề bài** (cả phương án A/B/C/D, đoạn tư liệu) rồi mới đến **lời giải chi tiết**.
- Xử lý 3 dạng: trắc nghiệm nhiều lựa chọn, trắc nghiệm đúng/sai, tự luận.
- **Tự cắt hình minh họa** (bản đồ, tranh ảnh, biểu đồ, lược đồ…) trong ảnh/PDF đề, hiển thị ngay dưới câu hỏi và chèn vào file Word. Bật/tắt bằng ô tích ở mục 3. Nếu AI cắt lệch, bấm **✂ Chỉnh khung** dưới hình rồi kéo chuột/ngón tay vẽ lại khung (hoặc bỏ hình).
- `Temperature = 0` và **không dùng Google Search** để khóa nguồn, tránh AI bịa kiến thức.

## 1. Lấy API key (miễn phí)

1. Vào https://aistudio.google.com/apikey
2. Bấm **Create API key** → copy key (bắt đầu bằng `AIza…`).

## 2. Dùng thử ngay (không cần triển khai)

Mở trực tiếp file `index.html` bằng trình duyệt (nhấp đúp). Dán API key vào mục 1.

> Lưu ý: nếu tải SGK dung lượng lớn qua File API mà gặp trục trặc CORS khi mở bằng
> `file://`, hãy dùng cách triển khai GitHub Pages bên dưới (khuyên dùng để ổn định).

## 3. Đưa lên GitHub Pages (link dùng chung, mọi máy)

1. Tạo repo mới trên GitHub, ví dụ `giai-de-su`.
2. Tải file `index.html` (và `README.md`) lên repo (Add file → Upload files → Commit).
3. Vào **Settings → Pages** → mục **Source** chọn **Deploy from a branch** →
   Branch **main** / thư mục **/(root)** → **Save**.
4. Đợi ~1 phút, GitHub cấp link dạng:
   `https://<tên-tài-khoản>.github.io/giai-de-su/`
5. Mở link đó trên bất kỳ máy nào (kể cả điện thoại) để dùng.

## 4. Cách sử dụng

1. **Mục 1 – Cài đặt:** dán API key → bấm **💾 Lưu key**. Trang tự thử các mô hình và chọn bản mạnh nhất mà key của bạn dùng được (Pro > Flash, mới > cũ, ổn định > preview). Có thể bấm **🤖 Tự chọn mô hình** để chọn lại, hoặc **Tải danh sách** để chọn tay.
2. **Mục 2 – SGK (nên có):** tải PDF SGK Lịch sử 10/11/12 + GDPT 2018 **một lần**. Trang
   ghi nhớ sách ngay trong trình duyệt máy này; các lần sau **tự nạp lại** khi bấm Giải đề —
   không phải chọn lại file. (Mẹo: chỉ nạp sách lớp liên quan đề để chạy nhanh hơn.)
3. **Mục 3 – Đề thi:** tải ảnh chụp hoặc PDF đề thi.
4. **Mục 4:** bấm **▶ Giải đề**. Xong bấm **⬇ Tải Word (.docx)**.
   - Nếu đề dài, AI ngắt giữa chừng → bấm **↻ Giải tiếp**.

## Bảo mật

- API key chỉ lưu trong `localStorage` của trình duyệt trên máy người dùng.
- Mỗi giáo viên dùng key riêng của mình. Dữ liệu đề thi gửi thẳng tới Google Gemini, không qua máy chủ trung gian nào.
