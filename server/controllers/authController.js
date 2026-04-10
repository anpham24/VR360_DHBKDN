const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

module.exports = {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ tài khoản và mật khẩu' });
      }

      const admin = await Admin.getByUsername(username);
      if (!admin) {
        return res.status(401).json({ message: 'Tài khoản không tồn tại' });
      }

      const isMatch = await bcrypt.compare(password, admin.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: 'Mật khẩu không đúng' });
      }

      const token = jwt.sign(
        { adminId: admin.admin_id, username: admin.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      await Admin.updateLastLogin(admin.admin_id);

      res.json({
        token,
        displayName: admin.display_name,
        message: 'Đăng nhập thành công'
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
