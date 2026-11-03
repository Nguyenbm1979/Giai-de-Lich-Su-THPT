# Trợ lý giải đề Lịch sử THPT

Web tĩnh giúp giáo viên Lịch sử tạo file lời giải đề thi (Word .docx) từ ảnh/PDF đề thi,
dùng Google Gemini (AI Studio). Bám sát SGK Kết nối tri thức & Chương trình GDPT 2018.

- Chạy hoàn toàn trong trình duyệt, không cần server, dùng được trên Windows/macOS/điện thoại.
- Chép **đầy đủ đề bài** (cả phương án A/B/C/D, đoạn tư liệu) rồi mới đến **lời giải chi tiết**.
- Xử lý 3 dạng: trắc nghiệm nhiều lựa chọn, trắc nghiệm đúng/sai, tự luận.
- **Tự cắt hình minh họa** (bản đồ, tranh ảnh, biểu đồ, lược đồ…) trong ảnh/PDF đề, hiển thị ngay dưới câu hỏi và chèn vào file Word. Bật/tắt bằng ô tích ở mục 3. Nếu AI cắt lệch, bấm **✂ Chỉnh khung** dưới hình rồi kéo chuột/ngón tay vẽ lại khung (hoặc bỏ hình).
- Xuất Word có **bảng** (Markdown → bảng Word), **bảng đáp án tóm tắt**, tùy chọn tên trường/đề/năm học, cỡ chữ, ẩn dòng nguồn.
- **Đối chiếu đáp án chuẩn** (dán “1A 2B … 21 ĐSĐS”) để thấy câu AI giải lệch; **giải theo nhóm câu** (VD 1-20, 25).
- **Lịch sử 20 lần giải gần nhất** lưu trong trình duyệt (kèm ảnh/PDF đề), mở lại để tải Word hoặc chỉnh hình.
- Chỉnh khung hình: kéo để di chuyển, kéo cạnh/góc để đổi cỡ, kéo ngoài khung để vẽ mới.
- Nhận đề dạng **ảnh, PDF hoặc Word (.docx)** (hình trong file Word được chèn lại nguyên vẹn).
- **📊 Ước tính token** trước khi giải, hiện tiến độ số câu khi AI đang viết và số token đã dùng khi xong.
- Giao diện **sáng/tối** (nút ở góc trên phải) và bố cục thân thiện điện thoại.
- **Dùng gói Gemini Pro (không cần API):** cài tiện ích Chrome trong thư mục `TienIch-Chrome-GiaiDeSu` (xem `HUONG-DAN.md` trong đó), rồi bấm **🚀 Gửi sang Gemini Pro** ở mục 4: trang tự gửi đề + prompt vào tab Gemini và nhận lời giải về. Không có tiện ích thì dùng cách sao chép/dán thủ công.
- **Word ngân hàng đề** (nút ⬇ Word ngân hàng đề): bố cục giống file mẫu KIỂM TRA GIỮA HỌC KÌ – SỬ 12 (A4, Times New Roman 12, câu tự đánh số “Câu 1:” màu xanh, phương án đúng chữ đỏ + gạch chân, ý đúng của câu đúng/sai tô đỏ), phương án canh đều theo **chuẩn BTN** (đo độ dài rồi xếp 4 / 2×2 / 1 cột đều nhau bằng điểm dừng tab; có thể đổi sang “Theo file mẫu” trong Tùy chọn file Word), kèm mục **Lời giải** căn giữa cuối mỗi câu giải thích vì sao chọn đáp án / vì sao từng ý đúng hoặc sai. Tắt/bật lời giải trong “Tùy chọn file Word”.
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

Trang chia theo thứ tự dùng thường xuyên nhất:

1. **Mục 1 – Đề thi:** tải ảnh, PDF hoặc Word đề thi. Các tùy chọn hiếm dùng (chỉ giải một số câu, đáp án chuẩn, yêu cầu riêng) nằm trong khối “Tùy chọn thêm”.
2. **Mục 2 – Giải bằng Gemini Pro:** cài tiện ích Chrome (xem `TienIch-Chrome-GiaiDeSu/HUONG-DAN.md`), gắn thẻ `@giaidesu` (Kỹ năng chứa SGK đã tạo trong Gemini), bấm **🚀 Gửi sang Gemini Pro**. Không có tiện ích thì dùng cách thủ công ngay bên dưới (sao chép prompt, dán kết quả).
3. **Mục 3 – Kết quả & Xuất file:** xem lời giải, **⬇ Tải Word** (lời giải) hoặc **⬇ Word ngân hàng đề** (theo file mẫu), đối chiếu đáp án.
4. **Mục 4 – Lịch sử:** mở lại các lần giải gần nhất.
5. **Cuối trang – ⚙️ Giải bằng API key (ít dùng):** nhập API key, chọn model, nạp SGK, rồi bấm **▶ Giải đề**. Nếu SGK đã nằm trong Kỹ năng của Gemini thì không cần nạp ở đây. Nếu AI ngắt giữa chừng, bấm **↻ Giải tiếp**.

## Bảo mật

- API key chỉ lưu trong `localStorage` của trình duyệt trên máy người dùng.
- Mỗi giáo viên dùng key riêng của mình. Dữ liệu đề thi gửi thẳng tới Google Gemini, không qua máy chủ trung gian nào.
