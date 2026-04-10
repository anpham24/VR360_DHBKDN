# VR360 - Tham Quan Thực Tế Ảo ĐH Bách Khoa Đà Nẵng

## Yêu cầu hệ thống

- **Node.js** >= 18 (đã có: `node --version` để kiểm tra)
- **npm** >= 9 (đã có: `npm --version` để kiểm tra)
- **MySQL** >= 8.0 (cần cài cho Phase 3+)
- Trình duyệt: Chrome, Firefox, Safari, Edge

---

## CÁCH 1: Chạy nhanh (Phase 1-2, chỉ Frontend)

> Không cần backend, không cần MySQL. Dữ liệu dùng JSON mẫu.

### Bước 1: Mở Terminal, vào thư mục project

```bash
cd /Users/anhhao/baitap/HT_DHMT/VR360
```

### Bước 2: Chạy server tĩnh (chọn 1 trong 3 cách)

**Cách A — dùng npx serve (đơn giản nhất):**
```bash
npx serve client -p 5500
```
Mở trình duyệt → http://localhost:5500

**Cách B — dùng Python (nếu có Python):**
```bash
cd client
python3 -m http.server 5500
```
Mở trình duyệt → http://localhost:5500

**Cách C — dùng Live Server (VSCode/Cursor):**
1. Cài extension "Live Server" trong Cursor
2. Chuột phải vào file `client/index.html`
3. Chọn "Open with Live Server"
4. Trình duyệt tự mở

### Bước 3: Sử dụng

- Trang chủ hiện **bản đồ** ĐH Bách khoa với các marker
- Click marker → popup hiện → click **"Tham quan 360°"**
- Kéo chuột để xoay, scroll để zoom
- Click hotspot (mũi tên xanh) để chuyển khu vực
- Click **"← Về bản đồ"** để quay lại

---

## CÁCH 2: Chạy đầy đủ (Phase 3+, Frontend + Backend + Database)

### Bước 1: Cài MySQL

**macOS (dùng Homebrew):**
```bash
brew install mysql
brew services start mysql
```

**Kiểm tra:**
```bash
mysql --version
mysql -u root
```

### Bước 2: Tạo Database

```bash
mysql -u root < database/schema.sql
mysql -u root < database/seed.sql
```

Hoặc mở MySQL và chạy thủ công:
```bash
mysql -u root
```
```sql
SOURCE /Users/anhhao/baitap/HT_DHMT/VR360/database/schema.sql;
SOURCE /Users/anhhao/baitap/HT_DHMT/VR360/database/seed.sql;

-- Kiểm tra:
USE vr360_dut;
SHOW TABLES;
SELECT * FROM locations;
```

### Bước 3: Cài dependencies backend

```bash
cd /Users/anhhao/baitap/HT_DHMT/VR360/server
npm install
```

### Bước 4: Cấu hình .env (nếu cần)

Mở file `server/.env`, sửa nếu MySQL có password:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mat_khau_cua_ban
DB_NAME=vr360_dut
JWT_SECRET=vr360-bk-danang-secret-key-2026
```

### Bước 5: Chạy server

```bash
cd /Users/anhhao/baitap/HT_DHMT/VR360/server
npm start
```

Thấy dòng `VR360 Server running at http://localhost:3000` là thành công.

### Bước 6: Mở trình duyệt

| Trang | URL |
|-------|-----|
| Trang chủ (Viewer) | http://localhost:3000 |
| Trang Admin | http://localhost:3000/admin.html |

### Đăng nhập Admin

```
Tài khoản: admin
Mật khẩu: admin123
```

---

## Chạy chế độ Development (auto-reload)

```bash
cd server
npm run dev
```

> Cần cài nodemon: `npm install -D nodemon` (đã có trong package.json)

---

## Cấu trúc URL

| URL | Mô tả |
|-----|-------|
| `http://localhost:3000` | Trang chủ - Bản đồ campus |
| `http://localhost:3000/admin.html` | Trang quản trị |
| `http://localhost:3000/api/tours` | API danh sách tour |
| `http://localhost:3000/api/scenes/scene-001` | API chi tiết scene |

---

## Xử lý lỗi thường gặp

### "Access to script from origin 'null'" (CORS error)
→ Không mở file HTML trực tiếp bằng cách kéo thả vào trình duyệt.
→ Phải dùng HTTP server (npx serve, python, hoặc Live Server).

### "ER_ACCESS_DENIED_ERROR" (MySQL)
→ Kiểm tra lại DB_USER và DB_PASSWORD trong file `server/.env`

### "ECONNREFUSED" (MySQL)
→ MySQL chưa chạy. Khởi động: `brew services start mysql`

### Ảnh 360 không hiện
→ Phase 1-2: Ảnh mẫu load từ internet, cần có mạng.
→ Phase 3+: Kiểm tra thư mục `server/uploads/panoramas/` có ảnh chưa.
