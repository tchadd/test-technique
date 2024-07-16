const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.js');

router.get('/', productController.showAllProducts);
router.post('/create', productController.createProduct);
router.get('/:id', productController.showProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
