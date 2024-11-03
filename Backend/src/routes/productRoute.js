import express from 'express';
import ProductController from '../controllers/productController';
import { verifyToken, checkVerifyTokenAdmin } from '../middleware/AuthStaff';
import upload from '../middleware/upLoadFile';

const router = express.Router();

const ProductRoute = (app) => {
    router.get('/', checkVerifyTokenAdmin, ProductController.findAllProducts);
    router.get('/fetAllList/:listId/:page/:limit', ProductController.fetchAllListProducts);
    router.post('/create', checkVerifyTokenAdmin, upload.array('images'), ProductController.createProduct);
    router.delete('/delete/:idProduct', checkVerifyTokenAdmin, ProductController.deleteProduct);
    router.put('/update', checkVerifyTokenAdmin, upload.array('images'), ProductController.updateProduct);
    router.get('/newProduct', ProductController.fetchNewProducts);
    router.get('/new4Product', ProductController.fetchNew4Products);
    router.get('/oneProduct/:id', ProductController.getByProductID);
    router.get('/similar/:brand/:id', ProductController.getSimilarProduct);
    router.post('/filter/brand/size', ProductController.filterProductsByBrandAndSize);
    router.get('/search/:name', ProductController.searchProduct);
    router.post('/update/quantity', checkVerifyTokenAdmin, ProductController.updateQuantity);

    return app.use('/api/products', router);
}

export default ProductRoute;