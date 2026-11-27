const pool = require('../config/db');

class ProdukRepository {
    async findAllActive(kategoriId = null) {
        if (kategoriId !== null) {
            const result = await pool.query(
                `SELECT id, kategori_id, kode_produk, nama_produk, harga, stok, created_at, deleted_at
                 FROM produk
                 WHERE deleted_at IS NULL AND kategori_id = $1
                 ORDER BY id ASC`,
                [kategoriId]
            );
            return result.rows;
        }

        const result = await pool.query(
            `SELECT id, kategori_id, kode_produk, nama_produk, harga, stok, created_at, deleted_at
             FROM produk
             WHERE deleted_at IS NULL
             ORDER BY id ASC`
        );
        return result.rows;
    }

    async findActiveById(id) {
        const result = await pool.query(
            `SELECT id, kategori_id, kode_produk, nama_produk, harga, stok, created_at, deleted_at
             FROM produk
             WHERE id = $1 AND deleted_at IS NULL`,
            [id]
        );
        return result.rows[0] || null;
    }

    async findAnyById(id) {
        const result = await pool.query(
            `SELECT id, kategori_id, kode_produk, nama_produk, harga, stok, created_at, deleted_at
             FROM produk
             WHERE id = $1`,
            [id]
        );
        return result.rows[0] || null;
    }

    async findActiveByKategoriId(kategoriId) {
        const result = await pool.query(
            `SELECT id, kategori_id, kode_produk, nama_produk, harga, stok, created_at, deleted_at
             FROM produk
             WHERE kategori_id = $1 AND deleted_at IS NULL
             ORDER BY id ASC`,
            [kategoriId]
        );
        return result.rows;
    }

    async create({ kategori_id, kode_produk, nama_produk, harga, stok }) {
        const result = await pool.query(
            `INSERT INTO produk (kategori_id, kode_produk, nama_produk, harga, stok)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, kategori_id, kode_produk, nama_produk, harga, stok, created_at, deleted_at`,
            [kategori_id, kode_produk, nama_produk, harga, stok]
        );
        return result.rows[0];
    }

    async updateFull(id, { kategori_id, kode_produk, nama_produk, harga, stok }) {
        const result = await pool.query(
            `UPDATE produk
             SET kategori_id = $1, kode_produk = $2, nama_produk = $3, harga = $4, stok = $5
             WHERE id = $6 AND deleted_at IS NULL
             RETURNING id, kategori_id, kode_produk, nama_produk, harga, stok, created_at, deleted_at`,
            [kategori_id, kode_produk, nama_produk, harga, stok, id]
        );
        return result.rows[0] || null;
    }

    async updatePartial(id, fields) {
        const allowed = ['kategori_id', 'kode_produk', 'nama_produk', 'harga', 'stok'];
        const setClauses = [];
        const values = [];
        let idx = 1;

        for (const key of allowed) {
            if (key in fields) {
                setClauses.push(`${key} = $${idx}`);
                values.push(fields[key]);
                idx++;
            }
        }

        values.push(id);
        const query = `
            UPDATE produk
            SET ${setClauses.join(', ')}
            WHERE id = $${idx} AND deleted_at IS NULL
            RETURNING id, kategori_id, kode_produk, nama_produk, harga, stok, created_at, deleted_at
        `;

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    async softDelete(id) {
        const result = await pool.query(
            `UPDATE produk
             SET deleted_at = NOW()
             WHERE id = $1 AND deleted_at IS NULL
             RETURNING id`,
            [id]
        );
        return result.rowCount > 0;
    }

    async restore(id) {
        const result = await pool.query(
            `UPDATE produk
             SET deleted_at = NULL
             WHERE id = $1 AND deleted_at IS NOT NULL
             RETURNING id, kategori_id, kode_produk, nama_produk, harga, stok, created_at, deleted_at`,
            [id]
        );
        return result.rows[0] || null;
    }

    async hardDeleteSoftDeleted(id) {
        const result = await pool.query(
            `DELETE FROM produk
             WHERE id = $1 AND deleted_at IS NOT NULL
             RETURNING id`,
            [id]
        );
        return result.rowCount > 0;
    }
}

module.exports = new ProdukRepository();