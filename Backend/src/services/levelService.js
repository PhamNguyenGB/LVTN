import db from '../models/index';

const createLevelService = async (data, staff) => {
    try {
        const level = await db.Level.findOne({
            where: { name: data.name }
        });
        if (level) {
            return {
                mess: 'Đã tồn tại cấp bậc này',
                status: 0,
            }
        }

        await db.Level.create({
            name: data.name,
            description: data.description,
            staffId: staff.id,
        });
        return {
            mess: 'Tạo cấp bậc thành công',
            status: 0,
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Tạo cấp bậc thất bại',
            status: -1,
        }
    }
};

const getAllLevelsService = async () => {
    try {
        const data = await db.Level.findAll({
            include: { model: db.Staff, attributes: ['email'] }
        });
        return {
            mess: 'Lấy tất cả cấp bậc thành công',
            status: 0,
            data: data
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Lấy tất cả cấp bậc thất bại',
            status: -1,
        }
    }
};

const UpdateLevelService = async (data, staff) => {
    try {
        const level = await db.Level.findOne({
            where: { id: data.id },
        });
        if (level) {
            await level.update({
                name: data.name,
                description: data.description,
                staff: staff.id,
            });
            return {
                mess: 'Cập nhật cấp bậc thành công',
                status: 0,
            }
        }
        return {
            mess: 'Không tìm thấy cấp bậc để cập nhật',
            status: -1,
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Lỗi cập nhật cấp bậc',
            status: -1,
        }

    }
};

const deleteLevelService = async (levelId) => {
    try {
        const level = await db.Level.findOne({
            where: { id: levelId },
        });

        if (level) {
            await level.destroy();
            return {
                mess: 'Xóa tên cấp bậc thành công',
                status: 0,
            }
        }

        return {
            mess: 'Không tồn tại cấp bậc',
            status: -1,
        }

    } catch (error) {
        console.log(error);
        return {
            mess: 'Lỗi khi xóa cấp bậc',
            status: -1,
        }
    }
};

module.exports = {
    createLevelService,
    getAllLevelsService,
    UpdateLevelService,
    deleteLevelService,
}