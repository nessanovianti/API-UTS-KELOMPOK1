const validateKategori = (req, res, next) => {
    const errors = [];
    const { nama_kategori, deskripsi } = req.body || {};

    if (typeof nama_kategori !== 'string' || nama_kategori.trim() === '') {
        errors.push('Field nama_kategori wajib diisi dan tidak boleh kosong');
    } else if (nama_kategori.trim().length > 50) {
        errors.push('Field nama_kategori maksimal 50 karakter');
    }

    if (deskripsi !== undefined && deskripsi !== null) {
        if (typeof deskripsi !== 'string') {
            errors.push('Field deskripsi harus berupa teks');
        } else if (deskripsi.length > 200) {
            errors.push('Field deskripsi maksimal 200 karakter');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Validasi data kategori gagal',
            errors,
        });
    }

    req.body.nama_kategori = nama_kategori.trim();
    req.body.deskripsi = deskripsi !== undefined && deskripsi !== null ? deskripsi.trim() : null;
    next();
};

module.exports = validateKategori;