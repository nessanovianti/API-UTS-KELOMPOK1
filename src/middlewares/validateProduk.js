const ALLOWED_FIELDS = ['kategori_id', 'kode_produk', 'nama_produk', 'harga', 'stok'];

const isPositiveInt = (val) => typeof val === 'number' && Number.isInteger(val) && val >= 1;
const isStrictPositiveInt = (val) => typeof val === 'number' && Number.isInteger(val) && val > 0;
const isNonNegativeInt = (val) => typeof val === 'number' && Number.isInteger(val) && val >= 0;

const validateProduk = (req, res, next) => {
    const errors = [];
    const { kategori_id, kode_produk, nama_produk, harga, stok } = req.body || {};

    if (!isPositiveInt(kategori_id)) {
        errors.push('Field kategori_id wajib diisi dan berupa bilangan bulat >= 1');
    }

    if (typeof kode_produk !== 'string' || kode_produk.trim() === '') {
        errors.push('Field kode_produk wajib diisi dan tidak boleh kosong');
    } else if (kode_produk.trim().length > 20) {
        errors.push('Field kode_produk maksimal 20 karakter');
    }

    if (typeof nama_produk !== 'string' || nama_produk.trim() === '') {
        errors.push('Field nama_produk wajib diisi dan tidak boleh kosong');
    } else if (nama_produk.trim().length > 100) {
        errors.push('Field nama_produk maksimal 100 karakter');
    }

    if (!isStrictPositiveInt(harga)) {
        errors.push('Field harga wajib diisi dan berupa bilangan bulat > 0');
    }

    if (!isNonNegativeInt(stok)) {
        errors.push('Field stok wajib diisi dan berupa bilangan bulat >= 0');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Validasi data produk gagal',
            errors,
        });
    }

    req.body.kode_produk = kode_produk.trim();
    req.body.nama_produk = nama_produk.trim();
    next();
};

const validateProdukPatch = (req, res, next) => {
    const body = req.body || {};
    const keys = Object.keys(body).filter((k) => ALLOWED_FIELDS.includes(k));

    if (keys.length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Body PATCH tidak boleh kosong dan harus memuat minimal satu field produk yang valid',
            errors: ['Minimal satu field (kategori_id, kode_produk, nama_produk, harga, stok) wajib dikirim'],
        });
    }

    const errors = [];

    if ('kategori_id' in body && !isPositiveInt(body.kategori_id)) {
        errors.push('Field kategori_id harus berupa bilangan bulat >= 1');
    }

    if ('kode_produk' in body) {
        if (typeof body.kode_produk !== 'string' || body.kode_produk.trim() === '') {
            errors.push('Field kode_produk tidak boleh kosong');
        } else if (body.kode_produk.trim().length > 20) {
            errors.push('Field kode_produk maksimal 20 karakter');
        } else {
            body.kode_produk = body.kode_produk.trim();
        }
    }

    if ('nama_produk' in body) {
        if (typeof body.nama_produk !== 'string' || body.nama_produk.trim() === '') {
            errors.push('Field nama_produk tidak boleh kosong');
        } else if (body.nama_produk.trim().length > 100) {
            errors.push('Field nama_produk maksimal 100 karakter');
        } else {
            body.nama_produk = body.nama_produk.trim();
        }
    }

    if ('harga' in body && !isStrictPositiveInt(body.harga)) {
        errors.push('Field harga harus berupa bilangan bulat > 0');
    }

    if ('stok' in body && !isNonNegativeInt(body.stok)) {
        errors.push('Field stok harus berupa bilangan bulat >= 0');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Validasi data produk gagal',
            errors,
        });
    }

    next();
};

module.exports = {
    validateProduk,
    validateProdukPatch,
};