import db from '../models/index';
import path from 'path';
import fs from 'fs';
import { Op } from 'sequelize';

const getAllProducts = async () => {
    try {
        const products = await db.Product.findAll({
            include: { model: db.List_Product, attributes: ['name'] }
        });
        if (products) {
            return {
                status: 0,
                data: products
            };
        }
        return {
            status: -1,
            mess: 'Không tìm thấy sản phẩm',
        };
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'error getting users',
        };
    }
};

const addProduct = async (data, files, staff) => {
    try {
        const { name,
            description,
            quantity,
            brand,
            price,
            size,
            origin,
            listProductId,
            discount } = data;

        const imageUrls = files.map(file => 'http://localhost:8080/image/' + file.filename);

        await db.Product.create({
            name: name,
            description: description,
            quantity: quantity,
            brand: brand,
            price: price,
            size: size,
            origin: origin,
            listProductId: listProductId,
            images: imageUrls,
            star: 0,
            discount: discount,
            staffId: staff.id,
        })
        return {
            mess: 'Thêm sản phẩm thành công',
            status: 0,
        };
    } catch (error) {
        console.log(error);
        return {
            mess: 'error getting add product',
            stauts: -1
        };
    }
};

const deleteProductService = async (idProduct) => {
    try {
        let product = await db.Product.findOne({
            where: { id: idProduct },
        });
        if (product) {
            const deleteFiles = await deleteFile(product.images);
            if (deleteFiles.status === 0) {
                await product.destroy();
                return {
                    mess: 'Xóa sản phẩm thành công',
                    status: 0,
                };
            }
            return deleteFile;
        } else {
            return {
                mess: 'Không tìm thấy sản phẩm',
                status: 0,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'error deleting product',
            stauts: -1,
        };
    }
};

const deleteFile = async (images) => {
    try {
        if (images && images.length > 0) {
            // Duyệt qua từng URL hình ảnh và xóa tệp
            const imageArr = JSON.parse(images);
            imageArr.forEach(async url => {

                const fileName = url.split('/')[4];
                const pathName = path.join(__dirname, '../assets/image/');

                await fs.unlink(pathName + fileName, (err) => console.log(err));
            });
            return {
                mess: 'Xóa file hình ảnh thành công',
                status: 0,
            };
        } else {

            return {
                mess: 'Không tìm thấy sản hình ảnh',
                status: -1,
            };
        };
    } catch (error) {
        console.log(error);
        return {
            mess: 'error delete file',
            status: -1,
        };
    }
}

const updateProductService = async (dataProduct, newFile, staff) => {
    try {
        const {
            id,
            brand,
            description,
            disCount,
            listProductId,
            name,
            origin,
            price,
            quantity,
            size,
            imgOld,
        } = dataProduct;

        const fileNameNew = imgOld ? imgOld.split(',') : [];

        let product = await db.Product.findOne({
            where: { id: id },
        });
        if (product) {
            const getOldFile = JSON.parse(product.images);
            const checkFile = [];

            for (let i = 0; i < getOldFile.length; i++) {
                if (getOldFile[i] !== fileNameNew[i]) {
                    checkFile.push(getOldFile[i]);
                }
            }

            if (checkFile.length > 0) {
                await deleteFile(JSON.stringify(checkFile));
            }

            if (newFile) {
                const imageUrls = newFile && newFile.length > 0
                    ? newFile.map(file => 'http://localhost:8080/image/' + file.filename)
                    : [];

                const updateImg = [...fileNameNew, ...imageUrls];

                await product.update({
                    name: name,
                    description: description,
                    quantity: quantity,
                    brand: brand,
                    price: price,
                    size: size,
                    origin: origin,
                    listProductId: listProductId,
                    star: 0,
                    discount: disCount,
                    staffId: staff.id,
                    images: updateImg,
                });
            } else {
                await product.update({
                    name: name,
                    description: description,
                    quantity: quantity,
                    brand: brand,
                    price: price,
                    size: size,
                    origin: origin,
                    listProductId: listProductId,
                    star: 0,
                    discount: disCount,
                    staffId: staff.id,
                    images: fileNameNew,
                });
            }
            return {
                mess: 'Cập nhật sản phẩm thành công',
                status: 0,
            }
        };
    } catch (error) {
        console.log(error);
        return {
            mess: 'Cập nhật sản phẩm bị lỗi',
            status: 0,
        };
    }
};

const getNewProducts = async () => {
    try {

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const products = await db.Product.findAll({
            where: {
                createdAt: {
                    //gte: lớn hơn hoặc bằng
                    [Op.gte]: thirtyDaysAgo
                }
            },
            order: [['createdAt', 'DESC']],
        });
        return products;
    } catch (error) {
        console.log(error);
        return 'error get new product';
    }
};

const getNew4Products = async () => {
    try {

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const products = await db.Product.findAll({
            where: {
                createdAt: {
                    //gte: lớn hơn hoặc bằng
                    [Op.gte]: thirtyDaysAgo
                }
            },
            order: [['createdAt', 'DESC']],
            limit: 4
        });
        return products;
    } catch (error) {
        console.log(error);
        return 'error get new product';
    }
};


const getAllListProducts = async (idList, page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Product.findAndCountAll({
            offset: offset,
            limit: limit,
            where: { listProductId: idList },
            include: { model: db.List_Product, attributes: ['name'] }
        });

        const brandAndSize = await db.Product.findAll({
            where: { listProductId: idList },
            attributes: ['brand', 'size']

        })

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            products: rows,
            brandAndSize: brandAndSize,
        }

        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

const filterProductsByBrandAndSizeSv = async (brandArr, sizeArr, page, limit, listId) => {
    try {
        let offset = (page - 1) * limit;

        const whereCondition = { listProductId: listId };
        if (brandArr && brandArr.length > 0) {
            whereCondition.brand = {
                [Op.in]: brandArr
            };
        }
        if (sizeArr && sizeArr.length > 0) {
            whereCondition.size = {
                [Op.in]: sizeArr
            };
        }

        const { count, rows } = await db.Product.findAndCountAll({
            offset: offset,
            limit: limit,
            where: whereCondition,
            include: { model: db.List_Product, attributes: ['name'] }
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            products: rows,
        }
        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

const getProductByIDService = async (idProduct) => {
    try {
        const product = await db.Product.findOne({
            where: { id: idProduct },
        })
        return product;
    } catch (error) {
        console.log(error);
        return 'Product not found';
    }
};

const getSimilarProductService = async (brand, idOldProduct, listProductId) => {
    try {
        const data = await db.Product.findAll({
            where: {
                id: {
                    [Op.ne]: idOldProduct
                },
                brand: brand,
                listProductId: listProductId,
            },
            limit: 4,
        })
        return data;
    } catch (error) {
        console.log(error);
        return 'Similar product not found';
    }
};

const filterProductsPriceService = async (type, price) => {
    try {
        let products = [];
        if (type === 'All') {
            products = await db.Product.findAll({});
        } else {
            products = await db.Product.findAll({
                where: { type: type }
            });
        }
        if (products) {
            let data = [];
            if (price === '500000') {
                data = products.filter((item) => item.price < price);
            } else if (price === '1000000') {
                data = products.filter((item) => item.price >= 500000 && item.price < price);
            } else if (price === '2000000') {
                data = products.filter((item) => item.price >= 1000000 && item.price < price);
            } else if (price === '3000000') {
                data = products.filter((item) => item.price >= 2000000 && item.price < price);
            } else if (price === '5000000') {
                data = products.filter((item) => item.price >= 3000000 && item.price < price);
            } else {
                data = products.filter((item) => item.price <= price);
            }
            return {
                Mess: 'find products filter price successfully',
                ErrC: 0,
                Data: data,
            }
        }
        return {
            Mess: 'find products filter price not found',
            ErrC: 0,
            Data: [],
        }
    } catch (error) {
        console.log(error);
        return {
            Mess: 'find products filter price  not found',
            ErrC: 1,
            Data: '',
        }
    }
};

const handleSearchProduct = async (name) => {
    try {
        const products = await db.Product.findAll({});
        const data = await products.filter((item) => {
            return item.dataValues.name.toLocaleLowerCase().includes(name.toLocaleLowerCase());
        }
        )
        return data;
    } catch (error) {
        console.log(error);
        return 'Search for products failed';
    }
};

const updateQuantity = async (data) => {
    try {
        data.forEach(async (item) => {
            let product = await db.Product.findOne({
                where: { id: item.productId }
            })

            await product.update({
                quantity: (product.quantity - item.quantity)
            });
        });
        return {
            status: 0
        }
    } catch (error) {
        console.log(error);
        return { status: -1 };
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    deleteProductService,
    deleteFile,
    updateProductService,
    getNewProducts,
    getProductByIDService,
    getSimilarProductService,
    filterProductsPriceService,
    handleSearchProduct,
    getNew4Products,
    getAllListProducts,
    filterProductsByBrandAndSizeSv,
    updateQuantity,
}