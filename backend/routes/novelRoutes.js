const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// สร้างการเชื่อมต่อกับ MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bok'
});

// Route สำหรับดึงข้อมูลจากตาราง novel
router.get('/novels', (req, res) => {
  const query = 'SELECT id, name, category, image FROM novel';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    // ตรวจสอบผลลัพธ์
    console.log('Database results:', results);
    res.json(results); // ตรวจสอบว่าผลลัพธ์เป็น array
  });
});

// Route สำหรับเพิ่มหนังสือ
router.post('/novels', (req, res) => {
  const { name, category, image } = req.body;
  const query = 'INSERT INTO novel (name, category, image) VALUES (?, ?, ?)';

  db.query(query, [name, category, image], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: 'Book added successfully' });
  });
});

// Route สำหรับแก้ไขหนังสือ
router.put('/novels/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, image } = req.body;
  const query = 'UPDATE novel SET name = ?, category = ?, image = ? WHERE id = ?';

  db.query(query, [name, category, image, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: 'Book updated successfully' });
  });
});

// Route สำหรับลบหนังสือ
router.delete('/novels/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM novel WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  });
});

module.exports = router;
