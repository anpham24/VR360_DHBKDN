# VR360 - Tham Quan Thực Tế Ảo ĐH Bách Khoa Đà Nẵng

Cần cài sẵn **Node.js** (https://nodejs.org) và **MySQL** (https://dev.mysql.com/downloads) trước.

> **Lưu ý:** Ở lệnh `cd` bên dưới, thay `đường/dẫn/tới/VR360` bằng đường dẫn thật tới thư mục VR360 trên máy bạn.
> Mẹo: gõ `cd ` (kèm dấu cách) rồi **kéo–thả thư mục VR360** vào cửa sổ → đường dẫn tự điền.

---

## 🪟 Windows — mở Command Prompt và gõ:

```bat
cd đường\dẫn\tới\VR360
mysql -u root -p < database\schema.sql
mysql -u root -p < database\seed.sql
cd server
npm install
npm start
```

## 🍎 macOS — mở Terminal và gõ:

```bash
cd đường/dẫn/tới/VR360
mysql -u root < database/schema.sql
mysql -u root < database/seed.sql
cd server
npm install
npm start
```

---

Khi thấy dòng `VR360 Server running at http://localhost:3000` → mở trình duyệt:

- **Trang tham quan:** http://localhost:3000
- **Trang quản trị:** http://localhost:3000/admin.html (tài khoản: `admin` / mật khẩu: `admin123`)

> Nếu MySQL có đặt mật khẩu, mở file `server/.env` và điền mật khẩu vào dòng `DB_PASSWORD=`.
</content>
