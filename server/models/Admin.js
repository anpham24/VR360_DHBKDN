const db = require('../config/db');

const Admin = {
  async getByUsername(username) {
    const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
    return rows[0] || null;
  },

  async getById(adminId) {
    const [rows] = await db.query('SELECT admin_id, username, display_name, created_at, last_login FROM admins WHERE admin_id = ?', [adminId]);
    return rows[0] || null;
  },

  async updateLastLogin(adminId) {
    await db.query('UPDATE admins SET last_login = NOW() WHERE admin_id = ?', [adminId]);
  }
};

module.exports = Admin;
