const express = require('express');
const router = express.Router();
const parseId = require('../middlewares/parseId');
const validateKategori = require('../middlewares/validateKategori');
const {
    getAllKategori,
    getKategoriById,
    getProdukByKategori,
    createKategori,
    deleteKategori,
} = require('../controllers/kategoriController');

router.get('/', getAllKategori);
router.get('/:id', parseId, getKategoriById);
router.get('/:id/produk', parseId, getProdukByKategori);
router.post('/', validateKategori, createKategori);
router.delete('/:id', parseId, deleteKategori);

module.exports = router;