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
- Để Gemini bám SGK và trả đúng định dạng, nên tạo Gem theo `Gem-GiaiDeSu/HUONG-DAN-GEM.md` rồi điền tên Gem vào ô “Gắn thẻ @”.
- Phụ thuộc giao diện Gemini: Google đổi giao diện có thể phải sửa các bộ chọn đầu file `trang.js`.
