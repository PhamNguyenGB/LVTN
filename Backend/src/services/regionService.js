import db from '../models/index';

const createRegionService = async (data, staff) => {
    try {
        const region = await db.Region.findOne({
            where: { name: data.name }
        });
        if (region) {
            return {
                mess: 'Khu vực này đã tồn tại',
                status: 0,
            };
        }

        await db.Region.create({
            name: data.name,
            deliveryFee: data.deliveryFee,
            staffId: staff.id,
        });

        return {
            mess: 'Tạo khu vực thành công',
            status: 0,
        };
    } catch (error) {
        console.log(error);
        return {
            mess: 'Tạo khu vực thất bại',
            status: -1,
        };
    }
};

const getAllRegionService = async () => {
    try {
        const data = await db.Region.findAll({
            include: { model: db.Staff, attributes: ['email'] }
        });
        return {
            mess: 'Lấy tất cả khu vực thành công',
            status: 0,
            data: data,
        };
    } catch (error) {
        console.log(error);
        return {
            mess: 'Lấy tất cả khu vực thất bại',
            status: -1,
        };
    }
};

const updateRegionService = async (data, staff) => {
    try {
        const region = await db.Region.findOne({
            where: { id: data.id },
        });

        if (region) {
            await region.update({
                name: data.name,
                deliveryFee: data.deliveryFee,
                staffId: staff.id,
            });

            return {
                mess: 'Cập nhật khu vực thành công',
                status: 0,
            };
        }

        return {
            mess: 'Không tìm thấy khu vực để cập nhật',
            status: -1,
        };
    } catch (error) {
        console.log(error);
        return {
            mess: 'Lỗi khi cập nhật khu vực',
            status: -1,
        };
    }
};

const deleteRegionService = async (regionId) => {
    try {
        const region = await db.Region.findOne({
            where: { id: regionId },
        });

        if (region) {
            await region.destroy();
            return {
                mess: 'Xóa khu vực thành công',
                status: 0,
            };
        }

        return {
            mess: 'Không tồn tại khu vực này',
            status: -1,
        };
    } catch (error) {
        console.log(error);
        return {
            mess: 'Lỗi khi xóa khu vực',
            status: -1,
        };
    }
};

module.exports = {
    createRegionService,
    getAllRegionService,
    updateRegionService,
    deleteRegionService,
};
