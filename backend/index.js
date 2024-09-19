const express = require('express');
const app = express();
const cors = require('cors');
const novelRoutes = require('./routes/novelRoutes');

app.use(cors());
app.use(express.json());

// ใช้ route novel
app.use('/api', novelRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
