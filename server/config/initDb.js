/**
 * initDb — Tự động tạo cơ sở dữ liệu, bảng và nạp dữ liệu khi khởi động.
 *
 * Người dùng KHÔNG cần chạy thủ công các lệnh `mysql < schema.sql / seed.sql`.
 * Chỉ cần cài MySQL + điền mật khẩu vào server/.env là server tự lo phần còn lại.
 *
 * Quy trình:
 *   1. Kết nối MySQL (chưa chọn database).
 *   2. Chạy database/schema.sql để tạo database + các bảng (nếu chưa có).
 *   3. Tạo tài khoản admin mặc định (nếu chưa có).
 *   4. Nếu bảng locations trống → nạp toàn bộ dữ liệu tour từ
 *      client/js/data/sampleData.js (nguồn dữ liệu thật của trang web).
 */
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const SampleData = require('../../client/js/data/sampleData.js');

// Hash bcrypt của mật khẩu "admin123"
const ADMIN_HASH = '$2b$10$ufIpmmThizMOsmS2eJqiSOqxNCcDDL4B.yarNCca5kSfet1R1vcuC';

async function initDb() {
  let conn;
  try {
    conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true
    });
  } catch (err) {
    console.error('\n========================================================');
    console.error('   ⚠️  KHÔNG KẾT NỐI ĐƯỢC MYSQL.');
    console.error('   → Hãy chắc chắn MySQL đang chạy và mật khẩu trong');
    console.error('     file server/.env (DB_PASSWORD) là đúng.');
    console.error(`   Chi tiết: ${err.code || err.message}`);
    console.error('========================================================\n');
    return false;
  }

  try {
    // 1. Tạo database + bảng từ schema.sql
    const schema = fs.readFileSync(path.join(__dirname, '..', '..', 'database', 'schema.sql'), 'utf8');
    await conn.query(schema);

    const dbName = process.env.DB_NAME || 'vr360_dut';
    await conn.query(`USE \`${dbName}\``);

    // 2. Tài khoản admin mặc định
    await conn.query(
      `INSERT IGNORE INTO admins (admin_id, username, password_hash, display_name)
       VALUES ('admin-001', 'admin', ?, 'Quản trị viên')`,
      [ADMIN_HASH]
    );

    // 3. Nạp dữ liệu tour nếu chưa có
    const [[{ count }]] = await conn.query('SELECT COUNT(*) AS count FROM locations');
    if (count === 0) {
      await seedFromSampleData(conn);
      console.log('   ✅ Đã nạp dữ liệu tour mẫu vào database.');
    }

    await conn.end();
    return true;
  } catch (err) {
    console.error('\n========================================================');
    console.error('   ⚠️  Lỗi khi khởi tạo database:', err.message);
    console.error('========================================================\n');
    try { await conn.end(); } catch { /* ignore */ }
    return false;
  }
}

async function seedFromSampleData(conn) {
  const { tour, locations, scenes } = SampleData;
  const firstSceneId = scenes.length ? scenes[0].sceneId : null;

  // Tour
  await conn.query(
    `INSERT INTO tours (tour_id, name, description, campus_image, default_scene_id)
     VALUES (?, ?, ?, ?, ?)`,
    [tour.tourId, tour.name, tour.description || null, tour.campusImage || null, firstSceneId]
  );

  // Locations
  for (let i = 0; i < locations.length; i++) {
    const l = locations[i];
    await conn.query(
      `INSERT INTO locations (location_id, tour_id, name, description, pos_x, pos_y, start_scene_index, order_index)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [l.locationId, tour.tourId, l.name, l.description || null,
       l.posX ?? 50, l.posY ?? 50, l.startSceneIndex ?? 0, i]
    );
  }

  // Scenes
  for (let i = 0; i < scenes.length; i++) {
    const s = scenes[i];
    await conn.query(
      `INSERT INTO scenes (scene_id, location_id, title, image_url, default_yaw, default_pitch, default_hfov, haov, vaov, v_offset, order_index)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [s.sceneId, s.locationId, s.title, s.imageUrl,
       s.defaultYaw ?? 0, s.defaultPitch ?? 0, s.defaultHfov ?? 100,
       s.haov ?? null, s.vaov ?? null, s.vOffset ?? null, i]
    );
  }

  // Hotspots (chèn sau khi đã có đủ scene để target_scene_id hợp lệ)
  for (const s of scenes) {
    for (const h of (s.hotspots || [])) {
      await conn.query(
        `INSERT INTO hotspots (hotspot_id, scene_id, type, yaw, pitch, label, icon,
            target_scene_id, target_yaw, target_pitch, info_title, info_content, info_image, info_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [h.hotspotId, h.sceneId, h.type, h.yaw, h.pitch, h.label || null, h.icon || null,
         h.targetSceneId || null, h.targetYaw ?? null, h.targetPitch ?? null,
         h.infoTitle || null, h.infoContent || null, h.infoImage || null, h.infoUrl || null]
      );
    }
  }
}

module.exports = initDb;
