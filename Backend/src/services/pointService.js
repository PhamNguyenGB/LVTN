import db from '../models/index';

const createPointService = async (data, staff) => {
    try {
        const point = await db.Point.findOne({
            where: { price: data.price }
        });
        if (point) {
            return {
                mess: 'Đã tồn tại giá tiền đổi điểm',
                status: 0,
            }
        }

        await db.Point.create({
            price: data.price,
            point: data.point,
            description: data.description,
            staffId: staff.id,
        });
        return {
            mess: 'Tạo thành công điểm thưởng',
            status: 0,
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Tạo thất bại điểm thưởng',
            status: -1,
        }
    }
};

const getAllPointService = async () => {
    try {
        const data = await db.Point.findAll({
            include: { model: db.Staff, attributes: ['email'] }
        });
        return {
            mess: 'Lấy tất cả điểm thưởng thành công',
            status: 0,
            data: data
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Lấy tất cả điểm thưởng thất bại',
            status: -1,
        }
    }
};

const UpdatePointService = async (data, staff) => {
    try {
        const point = await db.Point.findOne({
            where: { id: data.id },
        });
        if (point) {
            await point.update({
                price: data.price,
                point: data.point,
                description: data.description,
                staffId: staff.id,
            });
            return {
                mess: 'Cập nhật điểm thưởng thành công',
                status: 0,
            }
        }
        return {
            mess: 'Không tìm thấy điểm thưởng để cập nhật',
            status: -1,
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Lỗi cập nhật điểm thưởng',
            status: -1,
        }

    }
};

const deletePointService = async (pointId) => {
    try {
        const point = await db.Point.findOne({
            where: { id: pointId },
        });

        if (point) {
            await point.destroy();
            return {
                mess: 'Xóa tên điểm thưởng thành công',
                status: 0,
            }
        }

        return {
            mess: 'Không tồn tại điểm thưởng',
            status: -1,
        }

    } catch (error) {
        console.log(error);
        return {
            mess: 'Lỗi khi xóa điểm thưởng',
            status: -1,
        }
    }
};

const pointsRedemptionService = async (currency) => {
    try {
        const points = await db.Point.findAll();
        let coin = 0;
        points.forEach((point) => {
            if (point.price <= currency) {
                coin = point.point;
            }
        })
        return {
            status: 0,
            data: coin,
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: error.message,
        }
    }
};



module.exports = {
    createPointService,
    getAllPointService,
    UpdatePointService,
    deletePointService,
    pointsRedemptionService,
}