/**
 * Hằng số dùng chung toàn project
 */
const CONFIG = {
  API_BASE_URL: 'http://localhost:3000/api',

  MAP_CENTER: [16.0748, 108.1510],
  MAP_ZOOM: 17,

  DEFAULT_HFOV: 100,
  DEFAULT_YAW: 0,
  DEFAULT_PITCH: 0,
  MIN_HFOV: 50,
  MAX_HFOV: 120,

  // Góc phủ của ảnh panorama (ảnh 360° ngang, giới hạn dọc ~64° do tỉ lệ ~5.6:1)
  DEFAULT_HAOV: 360,
  DEFAULT_VAOV: 64,

  PANNELLUM_AUTO_ROTATE: -2,
  PANNELLUM_AUTO_LOAD: true,

  HOTSPOT_TYPE: {
    NAV: 'nav',
    INFO: 'info'
  }
};
