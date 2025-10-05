require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Route modules
const searchRoutes = require('./routes/search');
const profileRoutes = require('./routes/profile');
const statsRoutes = require('./routes/stats');

app.use('/api', searchRoutes);
app.use('/api', profileRoutes);
app.use('/api', statsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));