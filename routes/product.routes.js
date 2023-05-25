import {Router} from 'express';
import Controller from '../controllers/productController.js';
import AdminController from '../controllers/adminController/productController.js';
import auth from "../utils/auth.js"

const router = Router();


router.route('/:type')
.get(Controller.getProducts) // Get all products
.post(auth.verifyAdmin, AdminController.addProduct) // Add a new product

router.route('/:type/:slug')
.get(Controller.getProductByslug) // Get a product by slug

router.route('/:type/delete/:id')
.delete(AdminController.deleteProductById) // Delete a product by id for admin




export default router;



