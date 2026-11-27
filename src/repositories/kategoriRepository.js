const pool = require('../config/db');

class KategoriRepository {
    async findAll() {
        const result = await pool.query(
            'SELECT id, nama_kategori, deskripsi, created_at FROM kategori ORDER BY id ASC'
        );
        return result.rows;
    }

    async findById(id) {
        const result = await pool.query(
            'SELECT id, nama_kategori, deskripsi, created_at FROM kategori WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    }

    async create({ nama_kategori, deskripsi }) {
        const result = await pool.query(
            'INSERT INTO kategori (nama_kategori, deskripsi) VALUES ($1, $2) RETURNING id, nama_kategori, deskripsi, created_at',
            [nama_kategori, deskripsi]
        );
        return result.rows[0];
    }

    async deleteById(id) {
        const result = await pool.query(
            'DELETE FROM kategori WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rowCount > 0;
    }
}

module.exports = new KategoriRepository();