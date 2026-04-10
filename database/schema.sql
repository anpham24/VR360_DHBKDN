-- =============================================
-- VR360 - ĐH Bách Khoa Đà Nẵng
-- Database Schema
-- =============================================

CREATE DATABASE IF NOT EXISTS vr360_dut CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vr360_dut;

-- Bảng Tours
CREATE TABLE IF NOT EXISTS tours (
  tour_id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  map_image VARCHAR(500),
  map_center_lat DECIMAL(10,7) DEFAULT 16.0748000,
  map_center_lng DECIMAL(10,7) DEFAULT 108.1510000,
  map_zoom INT DEFAULT 17,
  default_scene_id VARCHAR(36),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng Locations (Khu vực)
CREATE TABLE IF NOT EXISTS locations (
  location_id VARCHAR(36) PRIMARY KEY,
  tour_id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail VARCHAR(500),
  marker_lat DECIMAL(10,7) NOT NULL,
  marker_lng DECIMAL(10,7) NOT NULL,
  marker_icon VARCHAR(255),
  order_index INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tour_id) REFERENCES tours(tour_id) ON DELETE CASCADE
);

-- Bảng Scenes (Ảnh 360)
CREATE TABLE IF NOT EXISTS scenes (
  scene_id VARCHAR(36) PRIMARY KEY,
  location_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  thumbnail VARCHAR(500),
  default_yaw DECIMAL(6,2) DEFAULT 0,
  default_pitch DECIMAL(6,2) DEFAULT 0,
  default_hfov DECIMAL(6,2) DEFAULT 100,
  order_index INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
);

-- Bảng Hotspots (Điểm tương tác)
CREATE TABLE IF NOT EXISTS hotspots (
  hotspot_id VARCHAR(36) PRIMARY KEY,
  scene_id VARCHAR(36) NOT NULL,
  type ENUM('nav', 'info') NOT NULL,
  yaw DECIMAL(6,2) NOT NULL,
  pitch DECIMAL(6,2) NOT NULL,
  label VARCHAR(255),
  icon VARCHAR(255),
  -- Nav hotspot fields
  target_scene_id VARCHAR(36),
  target_yaw DECIMAL(6,2),
  target_pitch DECIMAL(6,2),
  -- Info hotspot fields
  info_title VARCHAR(255),
  info_content TEXT,
  info_image VARCHAR(500),
  info_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (scene_id) REFERENCES scenes(scene_id) ON DELETE CASCADE,
  FOREIGN KEY (target_scene_id) REFERENCES scenes(scene_id) ON DELETE SET NULL
);

-- Bảng Admins
CREATE TABLE IF NOT EXISTS admins (
  admin_id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);
