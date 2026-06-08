# VR360 - Tham Quan Thực Tế Ảo ĐH Bách Khoa Đà Nẵng

Cần cài sẵn **Git** (https://git-scm.com), **Node.js** (https://nodejs.org) và **MySQL** (https://dev.mysql.com/downloads) trước.

---

## 🪟 Windows — mở Command Prompt và gõ lần lượt:

```bat
git clone https://github.com/anpham24/VR360_DHBKDN.git
cd VR360_DHBKDN
mysql -u root -p < database\schema.sql
mysql -u root -p < database\seed.sql
cd server
npm install
npm start
```

## 🍎 macOS — mở Terminal và gõ lần lượt:

```bash
git clone https://github.com/anpham24/VR360_DHBKDN.git
cd VR360_DHBKDN
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
