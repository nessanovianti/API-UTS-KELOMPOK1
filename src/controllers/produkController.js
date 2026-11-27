const produkRepo = require('../repositories/produkRepository');

const getAllProduk = async (req, res, next) => {
    try {
        let kategoriId = null;

        if (req.query.kategori_id !== undefined) {
            const parsed = Number(req.query.kategori_id);
            if (!Number.isInteger(parsed) || parsed < 1) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Parameter query kategori_id harus berupa bilangan bulat positif',
                });
            }
            kategoriId = parsed;
        }

        const data = await produkRepo.findAllActive(kategoriId);
        return res.status(200).json({
            status: 'success',
            message: 'Daftar produk aktif berhasil diambil',
            count: data.length,
            data,
        });
    } catch (err) {
        next(err);
    }
};

const getProdukById = async (req, res, next) => {
    try {
        const produk = await produkRepo.findActiveById(req.parsedId);
        if (!produk) {
            return res.status(404).json({
                status: 'error',
                message: 'Produk tidak ditemukan',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Detail produk berhasil diambil',
            data: produk,
        });
    } catch (err) {
        next(err);
    }
};

const createProduk = async (req, res, next) => {
    try {
        const created = await produkRepo.create(req.body);
        return res.status(201).json({
            status: 'success',
            message: 'Produk berhasil ditambahkan',
            data: created,
        });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'error',
                message: 'Kode produk sudah digunakan oleh produk lain',
            });
        }
        if (err.code === '23503') {
            return res.status(422).json({
                status: 'error',
                message: 'Kategori tidak ditemukan (kategori_id tidak valid)',
            });
        }
        next(err);
    }
};

const updateProdukPut = async (req, res, next) => {
    try {
        const updated = await produkRepo.updateFull(req.parsedId, req.body);
        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Produk aktif tidak ditemukan',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Data produk berhasil diperbarui seluruhnya',
            data: updated,
        });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'error',
                message: 'Kode produk sudah digunakan oleh produk lain',
            });
        }
        if (err.code === '23503') {
            return res.status(422).json({
                status: 'error',
                message: 'Kategori tidak ditemukan (kategori_id tidak valid)',
            });
        }
        next(err);
    }
};

const updateProdukPatch = async (req, res, next) => {
    try {
        const updated = await produkRepo.updatePartial(req.parsedId, req.body);
        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Produk aktif tidak ditemukan',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Sebagian data produk berhasil diperbarui',
            data: updated,
        });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'error',
                message: 'Kode produk sudah digunakan oleh produk lain',
            });
        }
        if (err.code === '23503') {
            return res.status(422).json({
                status: 'error',
                message: 'Kategori tidak ditemukan (kategori_id tidak valid)',
            });
        }
        next(err);
    }
};

const softDeleteProduk = async (req, res, next) => {
    try {
        const deleted = await produkRepo.softDelete(req.parsedId);
        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Produk aktif tidak ditemukan atau sudah terhapus',
            });
        }

        return res.status(204).send();
    } catch (err) {
        next(err);
    }
};

const restoreProduk = async (req, res, next) => {
    try {
        const restored = await produkRepo.restore(req.parsedId);
        if (!restored) {
            return res.status(404).json({
                status: 'error',
                message: 'Produk terhapus tidak ditemukan atau masih berstatus aktif',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Produk berhasil dipulihkan',
            data: restored,
        });
    } catch (err) {
        next(err);
    }
};

const hardDeleteProduk = async (req, res, next) => {
    try {
        const produk = await produkRepo.findAnyById(req.parsedId);
        if (!produk) {
            return res.status(404).json({
                status: 'error',
                message: 'Produk tidak ditemukan',
            });
        }

        if (produk.deleted_at === null) {
            return res.status(409).json({
                status: 'error',
                message: 'Produk masih aktif; lakukan soft delete terlebih dahulu sebelum hapus permanen',
            });
        }

        await produkRepo.hardDeleteSoftDeleted(req.parsedId);
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllProduk,
    getProdukById,
    createProduk,
    updateProdukPut,
    updateProdukPatch,
    softDeleteProduk,
    restoreProduk,
    hardDeleteProduk,
};