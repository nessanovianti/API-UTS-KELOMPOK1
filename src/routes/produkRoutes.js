const express = require('express');
const router = express.Router();
const parseId = require('../middlewares/parseId');
const { validateProduk, validateProdukPatch } = require('../middlewares/validateProduk');
const {
    getAllProduk,
    getProdukById,
    createProduk,
    updateProdukPut,
    updateProdukPatch,
    softDeleteProduk,
    restoreProduk,
    hardDeleteProduk,
} = require('../controllers/produkController');

router.get('/', getAllProduk);
router.get('/:id', parseId, getProdukById);
router.post('/', validateProduk, createProduk);
router.put('/:id', parseId, validateProduk, updateProdukPut);
router.patch('/:id', parseId, validateProdukPatch, updateProdukPatch);
router.delete('/:id', parseId, softDeleteProduk);
router.patch('/:id/restore', parseId, restoreProduk);
router.delete('/:id/permanent', parseId, hardDeleteProduk);

module.exports = router;