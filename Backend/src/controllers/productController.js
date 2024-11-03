import e from 'express';
import ProductService from '../services/productService';

const findAllProducts = async (req, res) => {
    try {
        let products = await ProductService.getAllProducts();
        if (products.status === 0)
            return res.status(200).json({
                status: 0,
                data: products.data,
            });
        return res.status(500).json({
            mess: products.mess,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error from findAllProduct');
    }
};

const createProduct = async (req, res) => {
    try {
        let data = await ProductService.addProduct(req.body, req.files, req.user);
        if (data.status === 0)
            return res.status(200).json({
                mess: data.mess,
                status: data.status
            });
        return res.status(500).json(data.mess);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'error from server create product',
            status: -1,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        let idProduct = req.params.idProduct;
        let data = await ProductService.deleteProductService(idProduct);
        if (data.status === 0)
            return res.status(200).json({
                mess: data.mess,
                status: data.status,
            });

        return res.status(500).json({
            mess: data.mess,
            status: data.status,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'error from server delete product',
            status: -1,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        let data = await ProductService.updateProductService(req.body, req.files, req.user);
        return res.status(200).json({
            mess: data.mess,
            status: data.status,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'error update product',
            status: -1,
        });
    }
};

const fetchNewProducts = async (req, res) => {
    try {
        let data = await ProductService.getAllProducts();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json('error fetch new products');
    }
};

const fetchNew4Products = async (req, res) => {
    try {
        let data = await ProductService.getNew4Products();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json('error fetch new 4 products');
    }
}

const fetchAllListProducts = async (req, res) => {
    try {
        let page = req.params.page;
        let limit = req.params.limit;
        let data = await ProductService.getAllListProducts(req.params.listId, +page, +limit);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

const filterProductsByBrandAndSize = async (req, res) => {
    try {
        let page = req.body.page;
        let limit = req.body.limit;
        let brandArr = req.body?.brandArr;
        let sizeArr = req.body?.sizeArr;
        let listId = req.body.listId;
        let data = await ProductService.filterProductsByBrandAndSizeSv(brandArr, sizeArr, +page, +limit, listId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

const getByProductID = async (req, res) => {
    try {
        let idProduct = req.params.id;
        let data = await ProductService.getProductByIDService(idProduct);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json('error get products');
    }
};

const getSimilarProduct = async (req, res) => {
    try {
        let brand = req.params.brand;
        brand = brand.replace(/-/g, ' ');
        let idProduct = req.params.id;
        let data = await ProductService.getSimilarProductService(brand, idProduct);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json('error getSimilar products');
    }
};

const filterProductsPrice = async (req, res) => {
    // try {
    //     let type = req.params.type;
    //     type = type.replace(/-/g, ' ');
    //     let price = req.params.price;
    //     let data = await ProductService.filterProductsPriceService(type, price);
    //     return res.status(200).json({
    //         Mess: data.Mess,
    //         ErrC: data.ErrC,
    //         Data: data.Data,
    //     });
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //         Mess: 'error filter products',
    //         ErrC: -1,
    //         Data: '',
    //     });
    // }
}

const searchProduct = async (req, res) => {
    try {
        const data = await ProductService.handleSearchProduct(req.params.name);
        return res.status(200).json({
            Mess: data.Mess,
            ErrC: data.ErrC,
            Data: data.Data,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Mess: 'error searching products',
            ErrC: -1,
            Data: '',
        });
    }
}

const updateQuantity = async (req, res) => {
    try {
        const data = await ProductService.updateQuantity(req.body);
        if (data.status === 0)
            return res.status(200).json('success');
        return res.status(500).json('fail');
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    findAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    fetchNewProducts,
    getByProductID,
    getSimilarProduct,
    filterProductsPrice,
    searchProduct,
    fetchNew4Products,
    fetchAllListProducts,
    filterProductsByBrandAndSize,
    updateQuantity,
}