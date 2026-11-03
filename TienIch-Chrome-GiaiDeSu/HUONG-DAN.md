# Tiện ích Chrome "Giải đề Sử – cầu nối Gemini"

Cho phép trang **Giải đề Lịch sử THPT** tự gửi đề sang **gemini.google.com** (gói Gemini Pro của bạn) rồi nhận lời giải về.

## Cài đặt (1 lần)
1. Tải thư mục `TienIch-Chrome-GiaiDeSu` này về máy (hoặc tải ZIP cả repo rồi giải nén).
2. Chrome → gõ `chrome://extensions` → bật **Chế độ nhà phát triển** (góc trên phải).
3. Bấm **Tải tiện ích đã giải nén** → chọn thư mục `TienIch-Chrome-GiaiDeSu`.
4. Mở https://gemini.google.com và đăng nhập tài khoản có gói Pro. Mở lại trang Giải đề, mục 4 sẽ hiện nút **🚀 Gửi sang Gemini Pro**.

## Lưu ý
- Giữ Chrome mở. Nếu chưa có tab Gemini, tiện ích tự mở một tab (đưa lên trước để Gemini chạy ổn định).
- Tiện ích chỉ chạy trên `gemini.google.com` và trang Giải đề, không đọc mật khẩu hay trang khác.
- Để Gemini bám SGK và trả đúng định dạng, nên tạo Kỹ năng (Skill) theo `Gem-GiaiDeSu/HUONG-DAN-GEM.md` rồi điền đúng tên kỹ năng (`giaidesu`) vào ô “Gắn thẻ @”.
- Nếu Gemini tự xóa câu trả lời lúc cuối (thay bằng lời báo lỗi), tiện ích giữ lại bản dài nhất đã viết xong và trang sẽ cảnh báo để bạn soát kỹ.
- Phụ thuộc giao diện Gemini: Google đổi giao diện có thể phải sửa các bộ chọn đầu file `trang.js`.

## Gửi từng ảnh / từng trang
Ô **Gửi từng ảnh / từng trang PDF một** (mặc định bật): mỗi ảnh, mỗi trang PDF (trang tự dựng thành ảnh) là một lượt gửi, một chat mới; kết quả nối dần vào trang. Nếu một phần lỗi, bấm **↻ Thử lại phần i/N**; các phần đã giải vẫn được giữ. Câu bị cắt ở mép ảnh sẽ được Gemini ghi chú để bạn xem ảnh kế tiếp.

## Lưu kỹ năng
Bấm **💾 Lưu kỹ năng** để trang nhớ tên thẻ `@kỹ năng`, model, tài khoản và tùy chọn gửi từng phần trong trình duyệt này; lần sau mở trang tự điền lại.
