const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.js');

router.get('/', productController.showAllProducts);
router.post('/add', productController.addProduct);
router.get('/:id', productController.showProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
// app.post("/login",authController.login);
// app.get("/login",authController.login);



module.exports = router;
