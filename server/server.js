const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'client')));

app.use('/api', publicRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log('\n========================================================');
  console.log('   ✅ VR360 SERVER ĐANG CHẠY!');
  console.log('========================================================');
  console.log(`   👉 Mở trình duyệt và dán link sau:`);
  console.log('');
  console.log(`      http://localhost:${PORT}`);
  console.log('');
  console.log('   Nhấn Ctrl + C để dừng server.');
  console.log('========================================================\n');
});

// Báo lỗi thân thiện nếu cổng đang bị chiếm (thay vì đổ stack trace dài)
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('\n========================================================');
    console.error(`   ⚠️  Cổng ${PORT} đang bị một chương trình khác sử dụng.`);
    console.error('   → Có thể server đã chạy sẵn rồi. Hãy thử mở trình duyệt:');
    console.error(`        http://localhost:${PORT}`);
    console.error('   → Hoặc tắt tiến trình cũ rồi chạy lại bằng lệnh:');
    console.error(`        lsof -ti :${PORT} | xargs kill -9   (macOS)`);
    console.error('========================================================\n');
    process.exit(1);
  } else {
    throw err;
  }
});
