import db from '../models/index';
import fs from 'fs';
import path from 'path';

const createImageHomeService = async (file, data, staff) => {
    try {
        await db.Image_Home.create({
            url: 'http://localhost:8080/image/' + file.filename,
            description: data.description,
            staffId: staff.id,
        });
        return {
            mess: 'Tạo hình ảnh giới thiệu thành công',
            status: 0,
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Tạo hình ảnh giới thiệu thất bại',
            status: -1,
        }
    }
};

const getAllImageHomeService = async () => {
    try {
        const data = await db.Image_Home.findAll({
            include: { model: db.Staff, attributes: ['email'] }
        });
        return {
            mess: 'Lấy tất cả hình ảnh giới thiệu thành công',
            status: 0,
            data: data
        }
    } catch (error) {
        console.log(error);
        return {
            mess: 'Lấy tất cả hình ảnh giới thiệu thất bại',
            status: -1,
        }
    }
};

const deleteFile = async (images) => {
    try {
        const pathName = path.join(__dirname, '../assets/image/');
        const fileName = images.split('/')[4];

        await fs.unlink(pathName + fileName, (err) => console.log(err));

        return {
            mess: 'Xóa file hình ảnh thành công',
            status: 0,
        };
    } catch (error) {
        console.log(error);
        return {
            mess: 'error delete file',
            status: -1,
        };
    }
}

const deleteImageHomeService = async (imgHomeId) => {
    try {
        const IH = await db.Image_Home.findOne({
            where: { id: imgHomeId },
        });

        if (IH) {
            await deleteFile(IH.url);

            await IH.destroy();
            return {
                mess: 'Xóa tên hình ảnh giới thiệu thành công',
                status: 0,
            }
        }

        return {
            mess: 'Không tồn tại hình ảnh giới thiệu',
            status: -1,
        }

    } catch (error) {
        console.log(error);
        return {
            mess: 'Lỗi khi xóa hình ảnh giới thiệu',
            status: -1,
        }
    }
};

module.exports = {
    createImageHomeService,
    getAllImageHomeService,
    deleteImageHomeService,
}