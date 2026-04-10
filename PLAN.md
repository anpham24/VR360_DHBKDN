# VR360 - Tham Quan Thực Tế Ảo Đại Học Bách Khoa Đà Nẵng

## Mục lục

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Phân tích & bổ sung so với bản gốc](#2-phân-tích--bổ-sung-so-với-bản-gốc)
3. [Kiến trúc hệ thống](#3-kiến-trúc-hệ-thống)
4. [Thiết kế Class & Data Model](#4-thiết-kế-class--data-model)
5. [Thiết kế Database](#5-thiết-kế-database)
6. [Thiết kế API](#6-thiết-kế-api)
7. [Luồng hoạt động chi tiết](#7-luồng-hoạt-động-chi-tiết)
8. [Thiết kế UI/UX](#8-thiết-kế-uiux)
9. [Bố cục thư mục & file code](#9-bố-cục-thư-mục--file-code)
10. [Phân chia Phase phát triển](#10-phân-chia-phase-phát-triển)
11. [Tech Stack](#11-tech-stack)
12. [Prompt gửi AI](#12-prompt-gửi-ai)

---

## 1. Tổng quan dự án

### 1.1 Mục đích

Website cho phép người dùng tham quan Đại học Bách khoa Đà Nẵng qua ảnh VR360, hoạt động tương tự Google Street View:

- **Trang chính**: Hiển thị bản đồ trường với các điểm (marker) đánh dấu khu vực
- **Tương tác**: Click vào marker trên bản đồ → mở ảnh VR360 tại vị trí đó
- **Điều hướng**: Trong VR360, click hotspot để di chuyển sang khu vực lân cận
- **Admin**: Quản lý toàn bộ dữ liệu VR (ảnh, scene, hotspot, khu vực)

### 1.2 Đối tượng sử dụng

| Vai trò | Quyền hạn |
|---------|-----------|
| **Viewer (khách)** | Xem bản đồ, xem VR360, tương tác hotspot |
| **Admin** | Đăng nhập, CRUD tour/scene/hotspot, upload ảnh, xem VR360 |

---

## 2. Phân tích & bổ sung so với bản gốc

### 2.1 Những điểm đã tốt trong bản gốc
- Chia rõ frontend / backend / database
- Xác định flow hoạt động 5 bước
- Chọn đúng thư viện (Pannellum, Three.js)
- Chia phase hợp lý

### 2.2 Những điểm cần BỔ SUNG

#### (a) Trang bản đồ tổng quan (MAP VIEW) — THIẾU QUAN TRỌNG
Bản gốc chưa mô tả trang bản đồ. Theo yêu cầu giống Google Maps:
- Khi vào web → hiện bản đồ trường Bách khoa (dùng ảnh bản đồ campus hoặc tích hợp Leaflet/OpenStreetMap)
- Trên bản đồ có các **marker** đánh dấu từng khu vực (thư viện, giảng đường, sân trường...)
- Click marker → chuyển sang chế độ VR360 tại khu vực đó
- Có nút quay lại bản đồ từ chế độ VR

#### (b) Cấu trúc dữ liệu phân cấp — CẦN LÀM RÕ
```
Tour (toàn bộ trường)
 └── Location (khu vực: thư viện, giảng đường A...)
      └── Scene (1 điểm chụp VR360 cụ thể)
           └── Hotspot (điểm tương tác trên ảnh 360)
                ├── NavHotspot (chuyển sang scene khác)
                └── InfoHotspot (hiển thị thông tin)
```

#### (c) Minimap trong chế độ VR — BỔ SUNG UX
- Khi đang xem VR360, góc dưới hiện minimap nhỏ cho biết vị trí hiện tại
- Giúp user không bị "lạc" khi di chuyển giữa các scene

#### (d) Loading & Transition — BỔ SUNG UX
- Hiệu ứng loading khi chuyển scene (fade in/out)
- Preview thumbnail trước khi load ảnh 360 nặng
- Lazy loading ảnh

#### (e) Responsive & Mobile — BỔ SUNG
- Hỗ trợ touch (swipe để xoay, pinch để zoom)
- Giao diện responsive cho mobile/tablet
- Gyroscope support (xoay điện thoại = xoay góc nhìn)

#### (f) Trang Admin chi tiết hơn — BỔ SUNG
- Dashboard thống kê (số tour, scene, hotspot)
- Visual hotspot editor (click trên ảnh 360 để đặt hotspot, kéo thả)
- Preview VR360 ngay trong trang admin
- Upload ảnh kèm validate (phải là equirectangular, kích thước tối thiểu)

#### (g) Xử lý lỗi & Edge case
- Ảnh 360 load thất bại → hiện placeholder + thông báo
- Scene không có hotspot → vẫn cho xem bình thường
- Admin xóa scene đang được hotspot tham chiếu → cảnh báo

---

## 3. Kiến trúc hệ thống

```
┌─────────────────────────────────────────────────┐
│                   CLIENT                         │
│  ┌───────────┐  ┌───────────┐  ┌──────────────┐ │
│  │  Map View  │  │  VR View  │  │  Admin Panel │ │
│  │ (Leaflet)  │  │(Pannellum)│  │   (CRUD UI)  │ │
│  └─────┬─────┘  └─────┬─────┘  └──────┬───────┘ │
│        └───────────────┴───────────────┘         │
│                       │ HTTP / REST API           │
└───────────────────────┼─────────────────────────┘
                        │
┌───────────────────────┼─────────────────────────┐
│                   SERVER (Node.js + Express)     │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌───────┐ │
│  │  Auth  │  │  Tour  │  │ Scene  │  │Hotspot│ │
│  │ Routes │  │ Routes │  │ Routes │  │Routes │ │
│  └────────┘  └────────┘  └────────┘  └───────┘ │
│                       │                          │
│              ┌────────┴────────┐                 │
│              │   MySQL / JSON  │                 │
│              │    Database     │                 │
│              └─────────────────┘                 │
│                                                  │
│  /uploads/panoramas/   ← thư mục lưu ảnh 360    │
└──────────────────────────────────────────────────┘
```

---

## 4. Thiết kế Class & Data Model

### 4.1 Class Tour
```
Tour {
  tourId: string          // ID duy nhất (uuid hoặc slug)
  name: string            // "Đại học Bách khoa Đà Nẵng"
  description: string     // Mô tả tour
  mapImage: string        // Ảnh bản đồ campus (hoặc tọa độ center cho Leaflet)
  mapCenter: {lat, lng}   // Tọa độ trung tâm bản đồ
  mapZoom: number         // Mức zoom mặc định
  defaultSceneId: string  // Scene hiện đầu tiên khi vào tour
  createdAt: Date
  updatedAt: Date
}
```

### 4.2 Class Location
```
Location {
  locationId: string      // ID duy nhất
  tourId: string          // Thuộc tour nào (FK → Tour)
  name: string            // "Thư viện", "Giảng đường A"
  description: string     // Mô tả khu vực
  thumbnail: string       // Ảnh thumbnail
  markerLat: number       // Vị trí marker trên bản đồ (latitude)
  markerLng: number       // Vị trí marker trên bản đồ (longitude)
  markerIcon: string      // Icon riêng cho marker (optional)
  scenes: Scene[]         // Danh sách scene thuộc location này
  createdAt: Date
}
```

### 4.3 Class Scene
```
Scene {
  sceneId: string         // ID duy nhất
  locationId: string      // Thuộc location nào (FK → Location)
  title: string           // "Tầng 1 - Sảnh chính"
  imageUrl: string        // Đường dẫn ảnh equirectangular 360
  thumbnail: string       // Ảnh preview nhỏ
  defaultYaw: number      // Góc nhìn ngang mặc định (0-360)
  defaultPitch: number    // Góc nhìn dọc mặc định (-90 đến 90)
  defaultHfov: number     // Góc nhìn rộng mặc định (field of view)
  hotspots: Hotspot[]     // Danh sách hotspot trong scene
  createdAt: Date
}
```

### 4.4 Class Hotspot (Abstract / Base)
```
Hotspot {
  hotspotId: string       // ID duy nhất
  sceneId: string         // Thuộc scene nào (FK → Scene)
  type: "nav" | "info"    // Loại hotspot
  yaw: number             // Tọa độ ngang trên ảnh 360 (góc)
  pitch: number           // Tọa độ dọc trên ảnh 360 (góc)
  label: string           // Text hiển thị khi hover
  icon: string            // Icon tùy chỉnh (optional)
}
```

### 4.5 Class NavHotspot (kế thừa Hotspot)
```
NavHotspot extends Hotspot {
  type: "nav"
  targetSceneId: string   // Scene đích khi click (FK → Scene)
  targetYaw: number       // Góc nhìn khi đến scene đích (optional)
  targetPitch: number     // Góc nhìn khi đến scene đích (optional)
}
```

### 4.6 Class InfoHotspot (kế thừa Hotspot)
```
InfoHotspot extends Hotspot {
  type: "info"
  infoTitle: string       // Tiêu đề popup
  infoContent: string     // Nội dung (HTML hoặc text)
  infoImage: string       // Ảnh minh họa (optional)
  infoUrl: string         // Link tham khảo (optional)
}
```

### 4.7 Class Admin (User)
```
Admin {
  adminId: string
  username: string
  passwordHash: string    // Bcrypt hash
  displayName: string
  role: "admin"
  createdAt: Date
  lastLogin: Date
}
```

### 4.8 Sơ đồ quan hệ
```
Admin (quản lý toàn bộ)
  │
  ▼
Tour (1)
  │
  ├── Location (n) ← có tọa độ marker trên bản đồ
  │     │
  │     ├── Scene (n) ← ảnh 360 cụ thể
  │     │     │
  │     │     ├── NavHotspot (n) ── targetSceneId ──→ Scene
  │     │     └── InfoHotspot (n)
  │     │
  │     └── Scene ...
  │
  └── Location ...
```

---

## 5. Thiết kế Database

### 5.1 Bảng `tours`
| Cột | Kiểu | Mô tả |
|-----|------|-------|
| tour_id | VARCHAR(36) PK | UUID |
| name | VARCHAR(255) | Tên tour |
| description | TEXT | Mô tả |
| map_image | VARCHAR(500) | Ảnh bản đồ (nếu dùng ảnh tĩnh) |
| map_center_lat | DECIMAL(10,7) | Latitude trung tâm |
| map_center_lng | DECIMAL(10,7) | Longitude trung tâm |
| map_zoom | INT | Mức zoom |
| default_scene_id | VARCHAR(36) | Scene mặc định |
| created_at | DATETIME | |
| updated_at | DATETIME | |

### 5.2 Bảng `locations`
| Cột | Kiểu | Mô tả |
|-----|------|-------|
| location_id | VARCHAR(36) PK | UUID |
| tour_id | VARCHAR(36) FK | → tours |
| name | VARCHAR(255) | Tên khu vực |
| description | TEXT | |
| thumbnail | VARCHAR(500) | Ảnh đại diện |
| marker_lat | DECIMAL(10,7) | Vĩ độ trên bản đồ |
| marker_lng | DECIMAL(10,7) | Kinh độ trên bản đồ |
| marker_icon | VARCHAR(255) | Icon marker |
| order_index | INT | Thứ tự hiển thị |
| created_at | DATETIME | |

### 5.3 Bảng `scenes`
| Cột | Kiểu | Mô tả |
|-----|------|-------|
| scene_id | VARCHAR(36) PK | UUID |
| location_id | VARCHAR(36) FK | → locations |
| title | VARCHAR(255) | |
| image_url | VARCHAR(500) | Đường dẫn ảnh 360 |
| thumbnail | VARCHAR(500) | |
| default_yaw | DECIMAL(6,2) | Góc nhìn ngang mặc định |
| default_pitch | DECIMAL(6,2) | Góc nhìn dọc mặc định |
| default_hfov | DECIMAL(6,2) | Field of view mặc định |
| order_index | INT | Thứ tự |
| created_at | DATETIME | |

### 5.4 Bảng `hotspots`
| Cột | Kiểu | Mô tả |
|-----|------|-------|
| hotspot_id | VARCHAR(36) PK | UUID |
| scene_id | VARCHAR(36) FK | → scenes |
| type | ENUM('nav','info') | Loại hotspot |
| yaw | DECIMAL(6,2) | Tọa độ ngang |
| pitch | DECIMAL(6,2) | Tọa độ dọc |
| label | VARCHAR(255) | Text khi hover |
| icon | VARCHAR(255) | Icon tùy chỉnh |
| target_scene_id | VARCHAR(36) FK | → scenes (chỉ khi type=nav) |
| target_yaw | DECIMAL(6,2) | (chỉ khi type=nav) |
| target_pitch | DECIMAL(6,2) | (chỉ khi type=nav) |
| info_title | VARCHAR(255) | (chỉ khi type=info) |
| info_content | TEXT | (chỉ khi type=info) |
| info_image | VARCHAR(500) | (chỉ khi type=info) |
| info_url | VARCHAR(500) | (chỉ khi type=info) |
| created_at | DATETIME | |

### 5.5 Bảng `admins`
| Cột | Kiểu | Mô tả |
|-----|------|-------|
| admin_id | VARCHAR(36) PK | UUID |
| username | VARCHAR(100) UNIQUE | |
| password_hash | VARCHAR(255) | Bcrypt |
| display_name | VARCHAR(255) | |
| created_at | DATETIME | |
| last_login | DATETIME | |

---

## 6. Thiết kế API

### 6.1 Public API (không cần auth)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/tours` | Lấy danh sách tour |
| GET | `/api/tours/:tourId` | Lấy chi tiết 1 tour + locations |
| GET | `/api/locations/:locationId` | Lấy chi tiết location + scenes |
| GET | `/api/scenes/:sceneId` | Lấy chi tiết scene + hotspots |

### 6.2 Admin API (cần auth - JWT token)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/admin/login` | Đăng nhập → trả JWT |
| GET | `/api/admin/dashboard` | Thống kê tổng quan |
| **Tour** | | |
| POST | `/api/admin/tours` | Tạo tour mới |
| PUT | `/api/admin/tours/:id` | Cập nhật tour |
| DELETE | `/api/admin/tours/:id` | Xóa tour |
| **Location** | | |
| POST | `/api/admin/locations` | Tạo location |
| PUT | `/api/admin/locations/:id` | Cập nhật location |
| DELETE | `/api/admin/locations/:id` | Xóa location |
| **Scene** | | |
| POST | `/api/admin/scenes` | Tạo scene (kèm upload ảnh 360) |
| PUT | `/api/admin/scenes/:id` | Cập nhật scene |
| DELETE | `/api/admin/scenes/:id` | Xóa scene |
| **Hotspot** | | |
| POST | `/api/admin/hotspots` | Tạo hotspot |
| PUT | `/api/admin/hotspots/:id` | Cập nhật hotspot |
| DELETE | `/api/admin/hotspots/:id` | Xóa hotspot |
| **Upload** | | |
| POST | `/api/admin/upload/panorama` | Upload ảnh 360 |
| POST | `/api/admin/upload/image` | Upload ảnh thường (thumbnail, info) |

### 6.3 Ví dụ Response

**GET /api/scenes/scene-001**
```json
{
  "sceneId": "scene-001",
  "locationId": "loc-001",
  "title": "Sảnh chính - Tầng 1",
  "imageUrl": "/uploads/panoramas/sanh-chinh-t1.jpg",
  "thumbnail": "/uploads/thumbnails/sanh-chinh-t1-thumb.jpg",
  "defaultYaw": 0,
  "defaultPitch": 0,
  "defaultHfov": 100,
  "hotspots": [
    {
      "hotspotId": "hs-001",
      "type": "nav",
      "yaw": 120.5,
      "pitch": -10.2,
      "label": "Đi đến Thư viện",
      "icon": "arrow",
      "targetSceneId": "scene-002",
      "targetYaw": 180,
      "targetPitch": 0
    },
    {
      "hotspotId": "hs-002",
      "type": "info",
      "yaw": -45.0,
      "pitch": 5.0,
      "label": "Phòng A101",
      "infoTitle": "Phòng học A101",
      "infoContent": "Phòng học lớn, sức chứa 120 sinh viên",
      "infoImage": "/uploads/images/a101.jpg"
    }
  ]
}
```

---

## 7. Luồng hoạt động chi tiết

### 7.1 Luồng Viewer (người xem)

```
[Vào website]
     │
     ▼
[Trang chủ: Bản đồ campus]
     │  Hiển thị bản đồ trường + markers cho từng khu vực
     │  Sidebar: danh sách khu vực kèm thumbnail
     │
     │── Click marker trên bản đồ
     │   HOẶC click khu vực trên sidebar
     │
     ▼
[Chuyển sang chế độ VR360]
     │  Gọi API: GET /api/scenes/:firstSceneOfLocation
     │  Load ảnh panorama 360
     │  Render hotspot lên ảnh
     │
     │── Kéo chuột / Touch   → xoay góc nhìn
     │── Scroll / Pinch      → zoom in/out
     │── Click NavHotspot    → chuyển scene (load scene mới)
     │── Click InfoHotspot   → hiện popup thông tin
     │── Click nút Minimap   → hiện bản đồ nhỏ, biết vị trí hiện tại
     │── Click nút "Về bản đồ" → quay lại trang bản đồ
     │
     ▼
[Tiếp tục tham quan hoặc thoát]
```

### 7.2 Luồng Admin

```
[Đăng nhập]
     │  POST /api/admin/login
     │  Nhận JWT token
     │
     ▼
[Dashboard]
     │  Thống kê: số tour, location, scene, hotspot
     │
     ├── [Quản lý Tour]
     │    Xem / Thêm / Sửa / Xóa tour
     │
     ├── [Quản lý Location]
     │    Xem / Thêm / Sửa / Xóa khu vực
     │    Đặt marker trên bản đồ
     │
     ├── [Quản lý Scene]
     │    Upload ảnh 360
     │    Xem preview VR360 ngay trong admin
     │    Sửa góc nhìn mặc định
     │
     ├── [Quản lý Hotspot]  ★ QUAN TRỌNG
     │    Mở scene trong VR360 preview
     │    Click lên ảnh 360 → lấy tọa độ yaw/pitch
     │    Chọn loại: nav hoặc info
     │    Nếu nav: chọn scene đích
     │    Nếu info: nhập nội dung
     │    Lưu hotspot
     │
     └── [Xem VR360 như viewer]
          Admin có thể preview tour hoàn chỉnh
```

---

## 8. Thiết kế UI/UX

### 8.1 Trang chủ (Map View)

```
┌──────────────────────────────────────────────┐
│  LOGO  │  ĐH BÁCH KHOA ĐÀ NẴNG - VR360     │
│─────────────────────────────────────────────-│
│         │                                    │
│ sidebar │        BẢN ĐỒ CAMPUS              │
│         │                                    │
│ ▸ Thư   │     📍 Thư viện                    │
│   viện  │              📍 Giảng đường A      │
│ ▸ Giảng │                                    │
│   đường │  📍 Sân                             │
│   A     │    trường        📍 Ký túc xá      │
│ ▸ Sân   │                                    │
│   trường│         📍 Nhà ăn                   │
│ ▸ KTX   │                                    │
│ ▸ Nhà ăn│                                    │
│         │                                    │
└──────────────────────────────────────────────┘
```

### 8.2 Trang VR360 (Viewer)

```
┌──────────────────────────────────────────────┐
│  ← Về bản đồ   │  Thư viện - Tầng 1   │ ☰  │
│─────────────────────────────────────────────-│
│                                              │
│           ẢNH VR 360 TOÀN MÀN HÌNH          │
│                                              │
│        [→ Đi đến Phòng đọc]    ← NavHotspot │
│                                              │
│     [ℹ Phòng mượn sách]      ← InfoHotspot  │
│                                              │
│                                              │
│  ┌──────────┐                                │
│  │ MINIMAP  │   ← góc dưới trái             │
│  │  📍 (bạn) │                                │
│  └──────────┘                                │
│                           [+] [-]  ← zoom   │
└──────────────────────────────────────────────┘
```

### 8.3 Trang Admin

```
┌──────────────────────────────────────────────┐
│  VR360 Admin  │  Xin chào, Admin  │ Đăng xuất│
│─────────────────────────────────────────────-│
│         │                                    │
│  MENU   │   DASHBOARD                        │
│         │                                    │
│ ▸ Dashboard │  ┌────┐  ┌────┐  ┌────┐       │
│ ▸ Tours     │  │ 1  │  │ 5  │  │ 12 │       │
│ ▸ Locations │  │Tour│  │ Kv │  │Scene│      │
│ ▸ Scenes    │  └────┘  └────┘  └────┘       │
│ ▸ Hotspots  │                                │
│ ▸ Preview   │  Hoạt động gần đây:            │
│             │  - Thêm scene "Sảnh A5"        │
│             │  - Sửa hotspot tại Thư viện    │
│             │                                │
└──────────────────────────────────────────────┘
```

---

## 9. Bố cục thư mục & file code

```
VR360/
├── README.md                    # Hướng dẫn cài đặt & chạy
├── PLAN.md                      # File này
│
├── client/                      # ===== FRONTEND =====
│   ├── index.html               # Entry point
│   ├── css/
│   │   ├── main.css             # Styles chung
│   │   ├── map.css              # Styles trang bản đồ
│   │   ├── viewer.css           # Styles trang VR360
│   │   └── admin.css            # Styles trang admin
│   │
│   ├── js/
│   │   ├── app.js               # Khởi tạo app, routing
│   │   ├── api.js               # Gọi API (fetch wrapper)
│   │   ├── auth.js              # Xử lý đăng nhập admin (JWT)
│   │   │
│   │   ├── map/
│   │   │   ├── MapView.js       # Render bản đồ + markers
│   │   │   └── MapMarker.js     # Xử lý marker click
│   │   │
│   │   ├── viewer/
│   │   │   ├── VRViewer.js      # Khởi tạo & điều khiển Pannellum
│   │   │   ├── HotspotManager.js # Quản lý hotspot trên VR
│   │   │   ├── SceneLoader.js   # Load & chuyển scene
│   │   │   └── Minimap.js       # Minimap overlay
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminApp.js      # Layout admin
│   │   │   ├── Dashboard.js     # Trang dashboard
│   │   │   ├── TourManager.js   # CRUD tour
│   │   │   ├── LocationManager.js # CRUD location
│   │   │   ├── SceneManager.js  # CRUD scene + upload
│   │   │   ├── HotspotEditor.js # Tạo/sửa hotspot trên VR preview
│   │   │   └── VRPreview.js     # Preview VR trong admin
│   │   │
│   │   └── utils/
│   │       ├── constants.js     # Hằng số
│   │       └── helpers.js       # Hàm tiện ích
│   │
│   ├── assets/
│   │   ├── icons/               # Icon hotspot, marker
│   │   ├── images/              # Ảnh UI (logo, placeholder)
│   │   └── map/                 # Ảnh bản đồ campus (nếu dùng ảnh tĩnh)
│   │
│   └── lib/                     # Thư viện bên thứ 3
│       ├── pannellum/           # Pannellum.js (VR360 engine)
│       └── leaflet/             # Leaflet.js (Map engine)
│
├── server/                      # ===== BACKEND =====
│   ├── package.json             # Dependencies
│   ├── server.js                # Entry point - Express server
│   ├── .env                     # Biến môi trường (PORT, DB, JWT_SECRET)
│   │
│   ├── config/
│   │   └── db.js                # Kết nối database
│   │
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   └── upload.js            # Multer config (upload ảnh)
│   │
│   ├── models/                  # Data models
│   │   ├── Tour.js
│   │   ├── Location.js
│   │   ├── Scene.js
│   │   ├── Hotspot.js
│   │   └── Admin.js
│   │
│   ├── routes/                  # API routes
│   │   ├── publicRoutes.js      # GET tours, scenes, hotspots
│   │   ├── adminRoutes.js       # CRUD (auth required)
│   │   └── authRoutes.js        # Login
│   │
│   ├── controllers/             # Business logic
│   │   ├── tourController.js
│   │   ├── locationController.js
│   │   ├── sceneController.js
│   │   ├── hotspotController.js
│   │   └── authController.js
│   │
│   └── uploads/                 # Thư mục lưu ảnh upload
│       ├── panoramas/           # Ảnh 360
│       ├── thumbnails/          # Thumbnail
│       └── images/              # Ảnh thường
│
├── database/                    # ===== DATABASE =====
│   ├── schema.sql               # SQL tạo bảng
│   └── seed.sql                 # Dữ liệu mẫu
│
└── docs/                        # ===== TÀI LIỆU =====
    └── api.md                   # Tài liệu API chi tiết
```

---

## 10. Phân chia Phase phát triển

### Phase 1: Nền tảng & Hiển thị VR360 (Quan trọng nhất)
**Mục tiêu**: Hiển thị được 1 ảnh 360 và xoay được

- [ ] Setup project (thư mục, npm init)
- [ ] Tích hợp Pannellum
- [ ] Hiển thị 1 ảnh 360 mẫu toàn màn hình
- [ ] Xoay bằng chuột, zoom bằng scroll
- [ ] CSS cơ bản

### Phase 2: Bản đồ + Chuyển cảnh
**Mục tiêu**: Có bản đồ, click marker → xem VR360, có hotspot chuyển scene

- [ ] Tạo trang bản đồ (Leaflet hoặc ảnh tĩnh + markers)
- [ ] Dữ liệu mẫu (JSON tĩnh) cho 3-5 scene
- [ ] Click marker → load VR360 tương ứng
- [ ] Thêm NavHotspot chuyển giữa các scene
- [ ] Thêm InfoHotspot hiển thị popup
- [ ] Nút quay lại bản đồ
- [ ] Minimap

### Phase 3: Backend + Database
**Mục tiêu**: API server hoạt động, dữ liệu từ DB thay vì JSON tĩnh

- [ ] Setup Express server
- [ ] Tạo database schema (MySQL)
- [ ] Models (Tour, Location, Scene, Hotspot)
- [ ] Public API (GET)
- [ ] Frontend gọi API thay vì dùng JSON tĩnh
- [ ] Upload ảnh 360 (Multer)

### Phase 4: Admin Panel
**Mục tiêu**: Admin đăng nhập, CRUD đầy đủ

- [ ] Trang login + JWT auth
- [ ] Dashboard thống kê
- [ ] CRUD Tour
- [ ] CRUD Location (đặt marker trên bản đồ)
- [ ] CRUD Scene (upload ảnh 360, preview)
- [ ] CRUD Hotspot (click trên VR preview để lấy tọa độ)
- [ ] Admin preview tour hoàn chỉnh

### Phase 5: Hoàn thiện & Polish
**Mục tiêu**: UX mượt, xử lý lỗi, responsive

- [ ] Loading animation khi chuyển scene
- [ ] Responsive mobile + touch support
- [ ] Xử lý lỗi (ảnh lỗi, API lỗi)
- [ ] Tối ưu performance (lazy load, nén ảnh)
- [ ] Seed data thực tế (ảnh 360 thật của trường)

---

## 11. Tech Stack

| Thành phần | Công nghệ | Lý do |
|-----------|-----------|-------|
| **VR360 Engine** | Pannellum.js | Nhẹ, dễ dùng, nhiều tài liệu, chuyên cho ảnh 360 |
| **Bản đồ** | Leaflet.js + OpenStreetMap | Miễn phí, nhẹ, dễ tích hợp marker |
| **Frontend** | Vanilla JS (HTML/CSS/JS) | Đơn giản, không cần build tool, phù hợp đồ án |
| **Backend** | Node.js + Express | Phổ biến, dễ học, ecosystem lớn |
| **Database** | MySQL | Quen thuộc, phù hợp dữ liệu quan hệ |
| **Auth** | JWT (jsonwebtoken) | Stateless, đơn giản |
| **Upload** | Multer | Middleware upload file cho Express |
| **Password** | bcrypt | Hash mật khẩu an toàn |

---

## 12. Prompt gửi AI

> **Hướng dẫn sử dụng**: Copy toàn bộ prompt bên dưới và gửi cho AI. Mỗi phase gửi 1 prompt riêng, hoàn thành phase trước rồi mới gửi phase sau.

---

### PROMPT - PHASE 1: Hiển thị VR360 cơ bản

```
Tôi đang làm đồ án website VR360 tham quan Đại học Bách khoa Đà Nẵng.

Hãy giúp tôi tạo Phase 1: Hiển thị ảnh VR360 cơ bản.

Yêu cầu:
1. Tạo file client/index.html là trang chính
2. Tích hợp Pannellum.js (dùng CDN)
3. Hiển thị 1 ảnh 360 mẫu toàn màn hình (dùng ảnh mẫu từ internet hoặc placeholder)
4. Người dùng có thể: kéo chuột để xoay, scroll để zoom
5. Có nút fullscreen
6. CSS đẹp, hiện đại

Cấu trúc file:
- client/index.html
- client/css/main.css
- client/css/viewer.css
- client/js/app.js
- client/js/viewer/VRViewer.js

Dùng Pannellum CDN:
- CSS: https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.css
- JS: https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.js

Lưu ý: code sạch, có comment tiếng Việt, dễ hiểu.
```

---

### PROMPT - PHASE 2: Bản đồ + Chuyển cảnh

```
Tiếp tục đồ án VR360 Đại học Bách khoa Đà Nẵng.

Đã hoàn thành Phase 1 (hiển thị VR360 cơ bản). Giờ làm Phase 2: Bản đồ + Chuyển cảnh.

Yêu cầu:
1. Tạo trang bản đồ (Map View) làm trang chủ
   - Dùng Leaflet.js + OpenStreetMap
   - Hiển thị bản đồ khu vực ĐH Bách khoa Đà Nẵng (tọa độ: 16.0748, 108.1510)
   - Có markers đánh dấu các khu vực: Thư viện, Giảng đường A, Sân trường, Nhà ăn (dữ liệu mẫu)
   - Sidebar bên trái liệt kê danh sách khu vực + thumbnail

2. Click marker hoặc item sidebar → chuyển sang chế độ VR360
   - Load ảnh 360 tương ứng với khu vực đó
   - Có nút "← Về bản đồ" để quay lại

3. Thêm Hotspot trong VR360
   - NavHotspot: click → chuyển sang scene khác (có icon mũi tên)
   - InfoHotspot: click → hiện popup thông tin (có icon "i")

4. Dữ liệu mẫu dạng JSON tĩnh (chưa cần backend)
   - Tạo file client/js/data/sampleData.js chứa 3-5 scene mẫu
   - Mỗi scene có: id, title, imageUrl, hotspots[]

5. Minimap ở góc dưới trái khi đang xem VR360

Cấu trúc file mới cần tạo:
- client/js/map/MapView.js
- client/js/map/MapMarker.js
- client/js/viewer/HotspotManager.js
- client/js/viewer/SceneLoader.js
- client/js/viewer/Minimap.js
- client/js/data/sampleData.js
- client/css/map.css

Sửa file cũ:
- client/index.html (thêm map view)
- client/js/app.js (thêm routing giữa map và viewer)

Leaflet CDN:
- CSS: https://unpkg.com/leaflet/dist/leaflet.css
- JS: https://unpkg.com/leaflet/dist/leaflet.js

Class cần dùng:
- Tour { tourId, name, mapCenter, defaultSceneId }
- Location { locationId, tourId, name, markerLat, markerLng, scenes[] }
- Scene { sceneId, locationId, title, imageUrl, defaultYaw, defaultPitch, hotspots[] }
- Hotspot { hotspotId, sceneId, type:"nav"|"info", yaw, pitch, label, targetSceneId?, infoContent? }
```

---

### PROMPT - PHASE 3: Backend + Database

```
Tiếp tục đồ án VR360. Đã hoàn thành Phase 1 + 2.

Giờ làm Phase 3: Backend + Database.

Yêu cầu:
1. Setup Express server (server/server.js)
   - Port 3000
   - CORS cho phép frontend gọi
   - Serve static files (uploads)
   - Body parser JSON

2. Database MySQL
   - Tạo file database/schema.sql với 5 bảng: tours, locations, scenes, hotspots, admins
   - Tạo file database/seed.sql với dữ liệu mẫu (dùng lại data từ Phase 2)
   - Kết nối DB: server/config/db.js (dùng mysql2)

3. Models (server/models/)
   - Tour.js, Location.js, Scene.js, Hotspot.js, Admin.js
   - Mỗi model có: getAll, getById, create, update, delete

4. Public API Routes (server/routes/publicRoutes.js)
   - GET /api/tours
   - GET /api/tours/:tourId (kèm locations)
   - GET /api/locations/:locationId (kèm scenes)
   - GET /api/scenes/:sceneId (kèm hotspots)

5. Upload ảnh (Multer)
   - server/middleware/upload.js
   - Lưu vào server/uploads/panoramas/ và server/uploads/thumbnails/

6. Sửa frontend để gọi API thay vì dùng JSON tĩnh
   - Sửa client/js/api.js

Package cần: express, cors, mysql2, dotenv, multer, uuid

File .env:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=vr360_dut
JWT_SECRET=vr360-secret-key
```

---

### PROMPT - PHASE 4: Admin Panel

```
Tiếp tục đồ án VR360. Đã hoàn thành Phase 1 + 2 + 3.

Giờ làm Phase 4: Admin Panel.

Yêu cầu:
1. Authentication
   - Trang login: client/admin.html
   - API POST /api/admin/login → trả JWT
   - Middleware auth kiểm tra JWT cho các admin route
   - server/middleware/auth.js
   - server/routes/authRoutes.js
   - server/controllers/authController.js
   - Dùng bcrypt hash password

2. Admin Dashboard
   - Thống kê: số tour, location, scene, hotspot
   - Hoạt động gần đây

3. CRUD Admin Routes (server/routes/adminRoutes.js)
   - CRUD Tour, Location, Scene, Hotspot
   - Upload ảnh khi tạo/sửa scene

4. Admin Frontend (client/js/admin/)
   - AdminApp.js - Layout + menu sidebar
   - Dashboard.js - Trang thống kê
   - TourManager.js - Quản lý tour
   - LocationManager.js - Quản lý khu vực (có bản đồ để đặt marker)
   - SceneManager.js - Quản lý scene (upload ảnh 360, preview)
   - HotspotEditor.js - Tạo/sửa hotspot bằng cách click lên VR360 preview
   - VRPreview.js - Xem tour hoàn chỉnh trong admin

5. Hotspot Editor (quan trọng):
   - Mở VR360 preview của 1 scene
   - Admin click lên ảnh → lấy tọa độ yaw/pitch tự động
   - Form nhập thông tin hotspot (loại, label, target scene hoặc info content)
   - Lưu hotspot

6. Giao diện admin: dùng CSS, sidebar + content layout
   - client/css/admin.css

Account admin mặc định trong seed.sql:
- username: admin
- password: admin123 (hash bằng bcrypt)
```

---

### PROMPT - PHASE 5: Hoàn thiện

```
Tiếp tục đồ án VR360. Đã hoàn thành Phase 1-4.

Giờ làm Phase 5: Hoàn thiện & Polish.

Yêu cầu:
1. Loading & Transition
   - Loading spinner khi đang load ảnh 360
   - Fade transition khi chuyển scene
   - Thumbnail preview trước khi load ảnh nặng

2. Responsive
   - Mobile responsive (touch swipe để xoay, pinch zoom)
   - Sidebar ẩn trên mobile, có nút hamburger
   - Font size, spacing phù hợp mobile

3. Error Handling
   - Ảnh 360 load lỗi → hiện placeholder + thông báo
   - API lỗi → thông báo thân thiện
   - Admin xóa scene đang được hotspot tham chiếu → cảnh báo

4. Performance
   - Lazy load ảnh panorama
   - Nén thumbnail
   - Cache API response

5. UI Polish
   - Hover effects trên markers, hotspots
   - Tooltips
   - Smooth animations
   - Consistent color scheme + typography
```

---

## 13. Phân công nhóm 3 thành viên — Lịch trình 14 NGÀY

### Tổng quan phân công

| Thành viên | Vai trò chính | Phụ trách |
|-----------|---------------|-----------|
| **A** | Frontend Viewer | Bản đồ + VR360 + Tương tác người dùng |
| **B** | Backend + Database | API + DB + Upload + Auth |
| **C** | Frontend Admin + Tài liệu | Giao diện Admin + Thu thập tài nguyên |

### Công việc thu thập tài liệu & hình ảnh

> Đây là phần **cả 3 người cùng làm** song song với code, đặc biệt ngày 1-3.

#### Hình ảnh cần thu thập
| # | Loại | Nội dung | Số lượng | Ai lo |
|---|------|----------|----------|-------|
| 1 | Ảnh 360 panorama | Các khu vực trong trường (sảnh, thư viện, sân, giảng đường...) | 5-10 ảnh | **C** chính, A+B hỗ trợ chụp |
| 2 | Ảnh thumbnail | Ảnh nhỏ đại diện mỗi khu vực (cắt từ ảnh 360 hoặc chụp riêng) | 5-10 ảnh | **C** |
| 3 | Ảnh bản đồ campus | Bản đồ trường nhìn từ trên hoặc bản đồ vẽ tay | 1 ảnh | **C** |
| 4 | Icon / Logo | Logo trường, icon hotspot, icon marker | 5-8 file | **C** |

#### Nguồn lấy ảnh 360
- **Tự chụp**: Dùng điện thoại có chế độ Photo Sphere (Google Camera) hoặc app Panorama 360
- **Google Street View**: Lấy ảnh 360 có sẵn quanh khu vực trường (nếu có)
- **Ảnh mẫu online**: Dùng tạm ảnh 360 miễn phí từ Flickr, Pixabay (giai đoạn dev)
- **Phần mềm ghép ảnh**: Hugin (miễn phí) hoặc PTGui để ghép ảnh thường thành 360

#### Tài liệu cần chuẩn bị
| # | Tài liệu | Ai lo |
|---|----------|-------|
| 1 | Danh sách khu vực + mô tả (tên, vị trí, thông tin) | **C** |
| 2 | Tọa độ GPS từng khu vực (dùng Google Maps lấy lat/lng) | **C** |
| 3 | Sơ đồ liên kết giữa các scene (scene nào nối với scene nào) | **A** + **C** |
| 4 | Nội dung InfoHotspot (thông tin phòng học, thư viện...) | **C** |

---

### LỊCH TRÌNH CHI TIẾT 14 NGÀY

---

#### NGÀY 1 — Setup + Thu thập tài nguyên

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | Setup project, tạo cấu trúc thư mục, `client/index.html` cơ bản | Thư mục project sẵn sàng |
| **B** | Cài Node.js, MySQL, `npm init`, tạo `server/server.js` khung, `database/schema.sql` | Server chạy được (trống), DB tạo xong |
| **C** | Đi chụp/thu thập ảnh 360 (ít nhất 3 ảnh). Lập danh sách khu vực + tọa độ GPS | 3+ ảnh 360, file danh sách khu vực |
| **Cả 3** | Họp 30 phút: thống nhất danh sách khu vực, đặt tên file, format JSON | Bản thống nhất chung |

---

#### NGÀY 2 — VR360 cơ bản + Database

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | Tích hợp Pannellum CDN, hiển thị 1 ảnh 360, xoay + zoom | Trang web hiện ảnh 360 xoay được |
| **B** | Hoàn thiện `schema.sql` (5 bảng), viết `seed.sql` dữ liệu mẫu, setup MySQL | DB có dữ liệu mẫu |
| **C** | Tiếp tục thu thập ảnh 360 (đủ 5+ ảnh). Cắt thumbnail. Lấy tọa độ GPS từ Google Maps | 5+ ảnh 360, 5+ thumbnail, danh sách tọa độ |

---

#### NGÀY 3 — VR Viewer hoàn chỉnh + Backend khung

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | `VRViewer.js` (class), `viewer.css`, nút fullscreen, giao diện đẹp | VR Viewer hoàn chỉnh 1 scene |
| **B** | `server.js` (Express + CORS), `config/db.js`, `models/Tour.js`, `models/Location.js` | Server kết nối DB, 2 models xong |
| **C** | Tạo `sampleData.js` — JSON tĩnh chứa toàn bộ tour/location/scene/hotspot mẫu. Viết mô tả InfoHotspot cho từng khu vực | File JSON data hoàn chỉnh |

---

#### NGÀY 4 — Bản đồ + Thêm Models

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | `MapView.js` — tích hợp Leaflet, hiện bản đồ ĐH Bách khoa (16.0748, 108.1510), `map.css` | Bản đồ hiện lên web |
| **B** | `models/Scene.js`, `models/Hotspot.js`, `models/Admin.js` — hoàn thành 5 models | 5 models CRUD xong |
| **C** | `MapMarker.js` — tạo markers từ dữ liệu, gắn popup + thumbnail lên marker. Chuẩn bị icon marker | Markers hiện trên bản đồ |

---

#### NGÀY 5 — Kết nối Map ↔ VR + Public API

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | `app.js` — routing Map ↔ VR. Click marker → chuyển sang VR360. Nút "← Về bản đồ" | Luồng: Bản đồ → click → VR360 → quay lại |
| **B** | `publicRoutes.js` + controllers (tour, location, scene, hotspot) — 4 GET endpoints | API Public hoạt động |
| **C** | Sidebar danh sách khu vực (bên trái bản đồ) + thumbnail. Click sidebar = click marker | Sidebar hoạt động |

---

#### NGÀY 6 — Hotspot + Upload API

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | `HotspotManager.js` — render NavHotspot (mũi tên) + InfoHotspot (icon i) trên VR360 | Hotspot hiện trên ảnh 360 |
| **B** | `middleware/upload.js` (Multer), endpoint upload ảnh 360 + thumbnail | Upload ảnh qua API được |
| **C** | `SceneLoader.js` — click NavHotspot → load scene mới, fade transition | Chuyển scene mượt |

---

#### NGÀY 7 — Kết nối Frontend ↔ Backend + Minimap

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | `api.js` — fetch wrapper. Thay `sampleData.js` → gọi API thật | Frontend dùng data từ backend |
| **B** | Test toàn bộ API, fix bug. Thêm error handling cơ bản | API ổn định |
| **C** | `Minimap.js` — minimap góc dưới trái khi xem VR360, đánh dấu vị trí hiện tại | Minimap hoạt động |
| **Cả 3** | **Checkpoint**: Test tích hợp frontend + backend. Fix bug nếu có | Hệ thống viewer chạy end-to-end |

---

#### NGÀY 8 — Auth + Bắt đầu Admin

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | Loading spinner khi load ảnh 360, xử lý lỗi ảnh (placeholder), fade transition | UX mượt hơn |
| **B** | `authRoutes.js`, `authController.js` (bcrypt + JWT), `middleware/auth.js` | Login API + JWT hoạt động |
| **C** | `admin.html`, `admin.css` — layout admin (sidebar menu + content area), trang login | Giao diện admin khung |

---

#### NGÀY 9 — Admin CRUD cơ bản

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | Responsive: mobile layout, touch swipe xoay, pinch zoom. Hamburger menu | Mobile hoạt động |
| **B** | `adminRoutes.js` — CRUD endpoints cho tour, location, scene, hotspot (protected) | Admin API đầy đủ |
| **C** | `auth.js` (login, JWT storage, logout). `Dashboard.js` — thống kê. `TourManager.js` — CRUD tour | Admin login + dashboard + quản lý tour |

---

#### NGÀY 10 — Admin CRUD nâng cao

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | Hover effects, tooltips trên hotspot + marker. Polish UI trang viewer | UI đẹp hơn |
| **B** | Validate upload (file type, size). Cascade delete (xóa location → xóa scenes con) | Backend bền vững |
| **C** | `LocationManager.js` — CRUD location + bản đồ Leaflet nhỏ để đặt marker. `SceneManager.js` — CRUD scene + upload ảnh 360 | Admin quản lý location + scene |

---

#### NGÀY 11 — Hotspot Editor (tính năng quan trọng nhất của Admin)

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | Hỗ trợ C: chia sẻ `VRViewer.js` cho admin, hướng dẫn Pannellum API lấy yaw/pitch | C làm hotspot editor nhanh hơn |
| **B** | API lấy dashboard stats, error response thống nhất, test tất cả admin routes | API admin ổn định |
| **C** | `HotspotEditor.js` — mở VR360 preview, click lên ảnh → lấy tọa độ yaw/pitch, form tạo hotspot (chọn type nav/info, target scene, nội dung) | Admin tạo hotspot bằng click |

---

#### NGÀY 12 — VR Preview Admin + Polish

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | Test toàn bộ luồng viewer trên nhiều trình duyệt (Chrome, Firefox, Safari). Fix bug | Viewer ổn định |
| **B** | Seed data thật (ảnh 360 thật, tọa độ thật, hotspot thật của trường Bách khoa) | Dữ liệu thật trong DB |
| **C** | `VRPreview.js` — admin xem tour hoàn chỉnh. Form validation, confirm dialog khi xóa | Admin preview tour + UX tốt |

---

#### NGÀY 13 — Tích hợp + Test + Fix bug

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | Test luồng: Bản đồ → VR → hotspot chuyển scene → quay lại bản đồ. Fix bug UI | Luồng viewer hoàn chỉnh |
| **B** | Test luồng: Login → CRUD tour/location/scene/hotspot → upload ảnh. Fix bug API | Luồng admin API hoàn chỉnh |
| **C** | Test luồng admin UI: Login → dashboard → CRUD → hotspot editor → preview. Fix bug | Luồng admin UI hoàn chỉnh |
| **Cả 3** | **Họp tổng**: Test cross-team, liệt kê bug còn lại, chia nhau fix | Danh sách bug cuối |

---

#### NGÀY 14 — Fix bug cuối + Hoàn thiện + Demo

| Người | Công việc | Output |
|-------|-----------|--------|
| **A** | Fix bug còn lại phía viewer. Thêm ảnh 360 thật nếu còn thiếu | Viewer sẵn sàng demo |
| **B** | Fix bug còn lại phía server. Đảm bảo seed data đầy đủ. Clean code | Server sẵn sàng demo |
| **C** | Fix bug còn lại phía admin. Viết hướng dẫn sử dụng ngắn (README) | Admin sẵn sàng demo |
| **Cả 3** | **Demo thử**: Chạy full hệ thống, quay video demo nếu cần | DỰ ÁN HOÀN THÀNH |

---

### Bảng tổng hợp theo ngày (nhìn nhanh)

```
NGÀY    A (Frontend Viewer)          B (Backend + DB)              C (Admin + Tài liệu)
─────   ──────────────────────────   ───────────────────────────   ──────────────────────────────
  1     Setup project, thư mục       Node, MySQL, schema.sql       Chụp ảnh 360, lập danh sách
  2     Pannellum: hiện ảnh 360      seed.sql, setup DB            Thu thập ảnh 360, thumbnail, GPS
  3     VRViewer.js hoàn chỉnh       Express server, 2 models      sampleData.js, mô tả khu vực
  4     MapView.js (Leaflet)         3 models còn lại              MapMarker.js, icon marker
  5     Routing Map↔VR               Public API (4 GET)            Sidebar khu vực
  6     HotspotManager.js            Upload API (Multer)           SceneLoader.js (chuyển scene)
  7     api.js (gọi API thật)        Test API, fix bug             Minimap.js
  ─── CHECKPOINT: Test tích hợp lần 1 ─────────────────────────────────────────────────────────
  8     Loading, error handling       Auth API (JWT + bcrypt)       admin.html, admin.css, login UI
  9     Responsive mobile             Admin CRUD API                Dashboard, TourManager
 10     UI polish (hover, tooltip)    Validate, cascade delete     LocationManager, SceneManager
 11     Hỗ trợ C (Pannellum API)     Dashboard stats API           HotspotEditor.js ★
 12     Test cross-browser            Seed data thật                VRPreview.js, form validation
  ─── CHECKPOINT: Test tích hợp lần 2 ─────────────────────────────────────────────────────────
 13     Test + Fix bug viewer         Test + Fix bug API            Test + Fix bug admin
 14     Fix bug + Hoàn thiện          Fix bug + Clean code          Fix bug + README
  ─── HOÀN THÀNH ── DEMO ─────────────────────────────────────────────────────────────────────
```

### Checklist thu thập tài nguyên (C chịu trách nhiệm chính)

**Trước ngày 3 phải có:**
- [ ] Ít nhất 5 ảnh 360 equirectangular (có thể ảnh mẫu online)
- [ ] Danh sách khu vực + mô tả ngắn
- [ ] Tọa độ GPS từng khu vực (từ Google Maps)

**Trước ngày 7 phải có:**
- [ ] Ít nhất 8 ảnh 360 (ưu tiên ảnh thật của trường)
- [ ] Thumbnail cho mỗi khu vực
- [ ] Icon marker + icon hotspot
- [ ] Sơ đồ liên kết scene (scene nào nối scene nào)
- [ ] Nội dung InfoHotspot (thông tin phòng học, thư viện...)
- [ ] Logo trường + favicon

**Trước ngày 12 phải có:**
- [ ] Toàn bộ ảnh 360 chính thức (ảnh thật của trường)
- [ ] Ảnh minh họa cho InfoHotspot
- [ ] Bản đồ campus chất lượng cao

### Quy tắc làm việc nhóm

1. **Mỗi tối báo cáo ngắn** — Gửi 3 dòng vào group chat: Hôm nay làm gì / Xong chưa / Ngày mai làm gì
2. **2 lần checkpoint** — Ngày 7 và ngày 12 họp test tích hợp
3. **C ưu tiên tài nguyên trước** — 3 ngày đầu C tập trung thu thập ảnh, từ ngày 4 mới code nhiều
4. **Dùng JSON tĩnh trước** — A và C không chờ B, code với `sampleData.js` trước
5. **Git**: Mỗi người 1 branch (`feature/viewer`, `feature/backend`, `feature/admin`), merge vào `main` tại 2 checkpoint

---

*Kế hoạch này được tạo ngày 10/04/2026*
*Dự án: VR360 - Tham quan thực tế ảo Đại học Bách khoa Đà Nẵng*
