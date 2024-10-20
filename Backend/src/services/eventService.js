import db from '../models/index';

const createEventService = async (data, staff) => {
    try {
        const event = await db.Event.findOne({
            where: { name: data.name }
        });
        if (event) {
            return {
                mess: 'Đã tồn tại tên sự kiện',
                status: 0,
            }
        }

        await db.Event.create({
            name: data.name,
            description: data.description,
            discount: data.discount,
            expiryDate: data.expiryDate,
            staffId: staff.id,
        });
        return {
            mess: 'Tạo sự kiện thành công',
            status: 0,
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Tạo sự kiện thất bại',
            status: -1,
        }
    }
};

const getAllEventService = async () => {
    try {
        const data = await db.Event.findAll({
            include: { model: db.Staff, attributes: ['email'] }
        });
        return {
            mess: 'Lấy tất cả sự kiện thành công',
            status: 0,
            data: data
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Lấy tất cả sự kiện thất bại',
            status: -1,
        }
    }
};

const UpdateEventService = async (data, staff) => {
    try {
        const event = await db.Event.findOne({
            where: { id: data.id },
        });
        if (event) {
            await event.update({
                name: data.name,
                description: data.description,
                discount: data.discount,
                expiryDate: data.expiryDate,
                staff: staff.id,
            });
            return {
                mess: 'Cập nhật sự kiện thành công',
                status: 0,
            }
        }
        return {
            mess: 'Không tìm thấy sự kiện để cập nhật',
            status: -1,
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Lỗi cập nhật sự kiện',
            status: -1,
        }

    }
};

const deleteEventService = async (eventId) => {
    try {
        const event = await db.Event.findOne({
            where: { id: eventId },
        });

        if (event) {
            await event.destroy();
            return {
                mess: 'Xóa tên sự kiện thành công',
                status: 0,
            }
        }

        return {
            mess: 'Không tồn tại sự kiện',
            status: -1,
        }

    } catch (error) {
        console.log(error);
        return {
            mess: 'Lỗi khi xóa sự kiện',
            status: -1,
        }
    }
};

const findEventByNameSevice = async (eventName) => {
    try {
        const currentDate = new Date();

        const data = await db.Event.findOne({
            where: { name: eventName },
            attributes: ['name', 'discount', 'expiryDate']
        })
        if (data) {
            if (data.expiryDate < currentDate)
                return {
                    status: 0,
                    mess: 'Mã giảm giá đã hết hạn'
                }

            return {
                status: 0,
                data: data,
                mess: 'Áp dụng mã giảm giá thành công'
            }
        }
        return {
            status: 0,
            mess: 'Mã giảm giá không tồn tại'
        }
    } catch (error) {
        console.log(error);
        return {
            status: -1,
            mess: 'Lỗi tìm mã giảm giá'
        }
    }
}

module.exports = {
    createEventService,
    getAllEventService,
    UpdateEventService,
    deleteEventService,
    findEventByNameSevice,
}