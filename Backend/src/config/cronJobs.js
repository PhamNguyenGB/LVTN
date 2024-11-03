import cron from 'node-cron';
import db from '../models/index';

// Đặt lịch chạy vào 23:59 ngày 31 tháng 12 hàng năm
cron.schedule('59 23 31 12 *', async () => {
    try {
        await db.User.update({ point: 0 }, { where: {} });
    } catch (error) {
        console.log(error);

    }
});