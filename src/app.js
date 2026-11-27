const express = require('express');
const kategoriRoutes = require('./routes/kategoriRoutes');
const produkRoutes = require('./routes/produkRoutes');

const app = express();

app.use(express.json());

// Menangkap JSON rusak (misalnya koma berlebih di akhir body) -> 400
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            status: 'error',
            message: 'Format JSON tidak valid',
        });
    }
    next(err);
});

app.use('/api/kategori', kategoriRoutes);
app.use('/api/produk', produkRoutes);

// Handler 404 untuk URL yang tidak terdaftar
app.use((req, res) => {
    return res.status(404).json({
        status: 'error',
        message: 'Route tidak ditemukan',
    });
});

// Error handler terpusat 500 tanpa membocorkan detail error PostgreSQL
app.use((err, req, res, next) => {
    console.error('[SERVER ERROR]:', err);
    return res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan internal pada server',
    });
});

module.exports = app;