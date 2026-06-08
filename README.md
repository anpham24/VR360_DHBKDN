# VR360 - Tham Quan Thực Tế Ảo ĐH Bách Khoa Đà Nẵng

Website tham quan 360° khuôn viên trường + trang quản trị (Admin) để thêm/sửa/xóa
khu vực, ảnh 360° và hotspot. Dữ liệu lưu trong **MySQL**; server **tự động tạo
database và nạp dữ liệu** khi chạy lần đầu — không cần gõ lệnh `mysql` thủ công.

## Cần cài sẵn

- **Git** — https://git-scm.com
- **Node.js** (>= 18) — https://nodejs.org
- **MySQL** (>= 8) — https://dev.mysql.com/downloads
  - macOS có thể cài nhanh bằng Homebrew: `brew install mysql && brew services start mysql`
  - Windows: tải **MySQL Installer**, cài "MySQL Server", **nhớ mật khẩu root** đã đặt.

---

## 🍎 macOS — mở Terminal và gõ lần lượt:

```bash
git clone https://github.com/anpham24/VR360_DHBKDN.git
cd VR360_DHBKDN/server
npm install
npm start
```

## 🪟 Windows — mở Command Prompt và gõ lần lượt:

```bat
git clone https://github.com/anpham24/VR360_DHBKDN.git
cd VR360_DHBKDN\server
npm install
npm start
```

---

## ⚠️ Nếu MySQL của bạn có mật khẩu root

Server đọc thông tin kết nối từ file `server/.env`. Nếu MySQL root của bạn **có mật
khẩu**, hãy mở file `server/.env` và điền mật khẩu vào dòng `DB_PASSWORD=` **trước khi**
chạy `npm start`:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mat_khau_mysql_cua_ban   ← điền mật khẩu vào đây
DB_NAME=vr360_dut
JWT_SECRET=vr360-bk-danang-secret-key-2026
```

> Nếu MySQL root **không có mật khẩu** thì để trống như mặc định, không cần sửa gì.

---

## Mở trình duyệt

Khi thấy dòng `✅ VR360 SERVER ĐANG CHẠY!` → mở:

- **Trang tham quan:** http://localhost:3000
- **Trang quản trị:** http://localhost:3000/admin.html
  - Tài khoản: `admin` — Mật khẩu: `admin123`

Vào trang quản trị có thể thêm/sửa/xóa **Khu vực, Scene (ảnh 360°), Hotspot**;
mọi thay đổi sẽ hiển thị ngay trên trang tham quan (sau khi tải lại trang).

---

## Xử lý lỗi thường gặp

| Báo lỗi | Cách khắc phục |
|---------|----------------|
| `KHÔNG KẾT NỐI ĐƯỢC MYSQL` / `ER_ACCESS_DENIED_ERROR` | Sai mật khẩu — sửa `DB_PASSWORD` trong `server/.env`. |
| `ECONNREFUSED` | MySQL chưa chạy. macOS: `brew services start mysql`. Windows: bật service "MySQL". |
| `EADDRINUSE` (cổng 3000 bận) | macOS: `lsof -ti :3000 \| xargs kill -9` rồi chạy lại. Windows: đổi `PORT` trong `.env`. |
| Trang tham quan trống / ảnh không hiện | Mở `http://localhost:3000` (không mở thẳng file HTML); kiểm tra MySQL đã kết nối. |
</content>
