import { Router } from "express";
import { addProduct, deleteProduct, showAllProducts, showProduct, updateProduct } from "../controllers/products"

const router = Router();

router.get('/', showAllProducts);
router.post('/', addProduct);
router.get('/:id', showProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;