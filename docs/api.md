# VR360 API Documentation

## Base URL
```
http://localhost:3000/api
```

## Public Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/tours` | Danh sách tours |
| GET | `/tours/:id` | Chi tiết tour + locations |
| GET | `/locations/:id` | Chi tiết location + scenes |
| GET | `/scenes/:id` | Chi tiết scene + hotspots |

## Admin Endpoints (Bearer Token required)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/admin/login` | Đăng nhập |
| GET | `/admin/dashboard` | Thống kê |
| POST/PUT/DELETE | `/admin/tours/:id` | CRUD Tour |
| POST/PUT/DELETE | `/admin/locations/:id` | CRUD Location |
| POST/PUT/DELETE | `/admin/scenes/:id` | CRUD Scene |
| POST/PUT/DELETE | `/admin/hotspots/:id` | CRUD Hotspot |
| POST | `/admin/upload/panorama` | Upload ảnh 360 |
| POST | `/admin/upload/image` | Upload ảnh thường |
