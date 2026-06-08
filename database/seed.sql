-- =============================================
-- VR360 - Dữ liệu khởi tạo
-- Tài khoản admin: admin / admin123 (bcrypt hash)
--
-- LƯU Ý: Dữ liệu tour/khu vực/scene/hotspot được server TỰ ĐỘNG nạp từ
-- client/js/data/sampleData.js khi khởi động lần đầu (xem server/config/initDb.js).
-- File này chỉ tạo sẵn tài khoản admin (server cũng tự tạo nếu chưa có).
-- =============================================

USE vr360_dut;

INSERT IGNORE INTO admins (admin_id, username, password_hash, display_name) VALUES
('admin-001', 'admin', '$2b$10$ufIpmmThizMOsmS2eJqiSOqxNCcDDL4B.yarNCca5kSfet1R1vcuC', 'Quản trị viên');
