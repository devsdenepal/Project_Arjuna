require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const searchRoutes = require('./routes/search');
const profileRoutes = require('./routes/profile');
const statsRoutes = require('./routes/stats');
const toolsRoutes = require('./routes/tools');
app.use('/api', searchRoutes);
app.use('/api', profileRoutes);
app.use('/api', statsRoutes);
app.use('/api', toolsRoutes);
app.get('/api/health', (req, res) => {
	res.json({ ok: true, routes: ['google','domain','phone','ip','search/log','search/recent','search/clear','profiles','profile','stats','stats/summary','tech-detect'] });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
