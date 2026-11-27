const kategoriRepo = require('../repositories/kategoriRepository');
const produkRepo = require('../repositories/produkRepository');

const getAllKategori = async (req, res, next) => {
    try {
        const data = await kategoriRepo.findAll();
        return res.status(200).json({
            status: 'success',
            message: 'Daftar kategori berhasil diambil',
            count: data.length,
            data,
        });
    } catch (err) {
        next(err);
    }
};

const getKategoriById = async (req, res, next) => {
    try {
        const kategori = await kategoriRepo.findById(req.parsedId);
        if (!kategori) {
            return res.status(404).json({
                status: 'error',
                message: 'Kategori tidak ditemukan',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Detail kategori berhasil diambil',
            data: kategori,
        });
    } catch (err) {
        next(err);
    }
};

const getProdukByKategori = async (req, res, next) => {
    try {
        const kategori = await kategoriRepo.findById(req.parsedId);
        if (!kategori) {
            return res.status(404).json({
                status: 'error',
                message: 'Kategori tidak ditemukan',
            });
        }

        const data = await produkRepo.findActiveByKategoriId(req.parsedId);
        return res.status(200).json({
            status: 'success',
            message: 'Daftar produk berdasarkan kategori berhasil diambil',
            count: data.length,
            data,
        });
    } catch (err) {
        next(err);
    }
};

const createKategori = async (req, res, next) => {
    try {
        const created = await kategoriRepo.create(req.body);
        return res.status(201).json({
            status: 'success',
            message: 'Kategori berhasil ditambahkan',
            data: created,
        });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'error',
                message: 'Nama kategori sudah terdaftar (duplikat)',
            });
        }
        next(err);
    }
};

const deleteKategori = async (req, res, next) => {
    try {
        const deleted = await kategoriRepo.deleteById(req.parsedId);
        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Kategori tidak ditemukan',
            });
        }

        return res.status(204).send();
    } catch (err) {
        if (err.code === '23503') {
            return res.status(409).json({
                status: 'error',
                message: 'Kategori tidak dapat dihapus karena masih digunakan oleh data produk',
            });
        }
        next(err);
    }
};

module.exports = {
    getAllKategori,
    getKategoriById,
    getProdukByKategori,
    createKategori,
    deleteKategori,
};