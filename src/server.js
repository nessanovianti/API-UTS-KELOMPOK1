require('dotenv').config();
const app = require('./app');

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`Server REST API Toko Online ATK berjalan di http://localhost:${PORT}`);
});