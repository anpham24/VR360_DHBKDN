-- =============================================
-- VR360 - Dữ liệu mẫu
-- Password admin: admin123 (bcrypt hash)
-- =============================================

USE vr360_dut;

-- Admin mặc định
INSERT INTO admins (admin_id, username, password_hash, display_name) VALUES
('admin-001', 'admin', '$2b$10$8KzaNdKIMyOkASCBkeJsKOkDlPHCzMbxOeFKETk5JykxWMwvRGmS6', 'Quản trị viên');

-- Tour chính
INSERT INTO tours (tour_id, name, description, map_center_lat, map_center_lng, map_zoom, default_scene_id) VALUES
('tour-001', 'Đại học Bách khoa - Đại học Đà Nẵng', 'Tham quan thực tế ảo khuôn viên Đại học Bách khoa Đà Nẵng', 16.0748000, 108.1510000, 17, 'scene-001');

-- Khu vực
INSERT INTO locations (location_id, tour_id, name, description, marker_lat, marker_lng, order_index) VALUES
('loc-001', 'tour-001', 'Cổng chính',         'Cổng chính ĐH Bách khoa - 54 Nguyễn Lương Bằng',      16.0740000, 108.1498000, 1),
('loc-002', 'tour-001', 'Thư viện',            'Thư viện trung tâm - nơi học tập và nghiên cứu',      16.0755000, 108.1515000, 2),
('loc-003', 'tour-001', 'Giảng đường A',       'Tòa nhà giảng đường chính',                           16.0752000, 108.1505000, 3),
('loc-004', 'tour-001', 'Sân trường',          'Khuôn viên trung tâm',                                16.0748000, 108.1510000, 4),
('loc-005', 'tour-001', 'Nhà ăn sinh viên',    'Căn tin phục vụ sinh viên và giảng viên',              16.0742000, 108.1520000, 5);

-- Scenes (ảnh 360 mẫu — thay bằng ảnh thật sau)
INSERT INTO scenes (scene_id, location_id, title, image_url, default_yaw, default_pitch, default_hfov, order_index) VALUES
('scene-001', 'loc-001', 'Cổng chính - Nhìn vào trường',    '/uploads/panoramas/sample1.jpg', 0, 0, 100, 1),
('scene-002', 'loc-002', 'Thư viện - Tầng 1',               '/uploads/panoramas/sample2.jpg', 0, 0, 100, 1),
('scene-003', 'loc-003', 'Giảng đường A - Sảnh',            '/uploads/panoramas/sample3.jpg', 90, 0, 100, 1),
('scene-004', 'loc-004', 'Sân trường - Trung tâm',          '/uploads/panoramas/sample4.jpg', 0, 0, 110, 1),
('scene-005', 'loc-005', 'Nhà ăn sinh viên',                '/uploads/panoramas/sample5.jpg', 0, 0, 100, 1);

-- Hotspots
INSERT INTO hotspots (hotspot_id, scene_id, type, yaw, pitch, label, target_scene_id, target_yaw, target_pitch) VALUES
('hs-001', 'scene-001', 'nav',  50.00,  -5.00, 'Đi đến Sân trường',      'scene-004', 180.00, 0.00),
('hs-005', 'scene-003', 'nav', -90.00,  -5.00, 'Ra Sân trường',           'scene-004',  90.00, 0.00),
('hs-006', 'scene-004', 'nav',   0.00,  -5.00, 'Đi đến Cổng chính',      'scene-001',   0.00, 0.00),
('hs-007', 'scene-004', 'nav',  90.00,  -5.00, 'Đi đến Thư viện',        'scene-002',   0.00, 0.00),
('hs-008', 'scene-004', 'nav', -90.00,  -5.00, 'Đi đến Giảng đường A',   'scene-003',   0.00, 0.00),
('hs-009', 'scene-004', 'nav', 180.00,  -5.00, 'Đi đến Nhà ăn',          'scene-005',   0.00, 0.00),
('hs-010', 'scene-005', 'nav',   0.00,  -5.00, 'Ra Sân trường',           'scene-004', 180.00, 0.00);

INSERT INTO hotspots (hotspot_id, scene_id, type, yaw, pitch, label, info_title, info_content) VALUES
('hs-002', 'scene-001', 'info', -30.00,  0.00, 'Bảng tên trường',  'ĐH Bách khoa - ĐH Đà Nẵng', 'Thành lập năm 1975, trường đào tạo kỹ thuật hàng đầu miền Trung.'),
('hs-003', 'scene-002', 'info', -60.00,  5.00, 'Phòng đọc',        'Phòng đọc tự do',            'Mở cửa từ 7:00 - 21:00 hàng ngày. Sức chứa 200 chỗ ngồi.'),
('hs-004', 'scene-005', 'info',  90.00,  0.00, 'Thực đơn',         'Nhà ăn sinh viên',            'Phục vụ bữa sáng, trưa, tối. Giá từ 15.000 - 30.000 VNĐ.');
