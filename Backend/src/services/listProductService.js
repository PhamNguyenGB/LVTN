import db from '../models/index';

const createListProductService = async (data, staff) => {
    try {
        await db.List_Product.create({
            name: data.name,
            description: data.description,
            staffId: staff.id,
        });
        return {
            mess: 'Tạo tên danh mục thành công',
            status: 0,
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Tạo tên danh mục thất bại',
            status: -1,
        }
    }
};

const getAllListProductService = async () => {
    try {
        const data = await db.List_Product.findAll({
            include: { model: db.Staff, attributes: ['email'] }
        });
        return {
            mess: 'Lấy tất cả danh mục thành công',
            status: 0,
            data: data
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Lấy tất cả danh mục thất bại',
            status: -1,
        }
    }
};

const UpdateListProductService = async (data, staff) => {
    try {
        const listProduct = await db.List_Product.findOne({
            where: { id: data.id },
        });
        if (listProduct) {
            await listProduct.update({
                name: data.name,
                description: data.description,
                staff: staff.id,
            });
            return {
                mess: 'Cập nhật tên danh mục thành công',
                status: 0,
            }
        }
        return {
            mess: 'Không tìm thấy danh mục để cập nhật',
            status: -1,
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Lỗi cập nhật danh mục',
            status: -1,
        }

    }
};

const deleteListProductService = async (listProductId) => {
    try {
        const listProduct = await db.List_Product.findOne({
            where: { id: listProductId },
        });

        if (listProduct) {
            await listProduct.destroy();
            return {
                mess: 'Xóa tên danh mục thành công',
                status: 0,
            }
        }

        return {
            mess: 'Không tồn tại danh mục sản phẩm',
            status: -1,
        }

    } catch (error) {
        console.log(error);
        return {
            mess: 'Lỗi khi xóa tên danh mục',
            status: -1,
        }
    }
};

module.exports = {
    createListProductService,
    getAllListProductService,
    UpdateListProductService,
    deleteListProductService,
}