import sendOTPService from '../services/sendOTPService';

const sendOTPCL = async (req, res) => {
    try {
        const response = await sendOTPService.sendOTP(req.body, req.body.type);
        if (response.status === 0) {
            return res.status(200).json({
                status: response.status,
                mess: response.mess,
                data: response.data,
            });
        }
        return res.status(500).json({
            status: -1,
            mess: response.mess,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: -1,
            mess: 'error from sendOTP',
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const request = await sendOTPService.forgotPass(req.body.email);
        return res.status(200).json({
            status: request.status,
            mess: request.mess,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: -1,
            mess: error.message,
        });
    }
}

module.exports = {
    sendOTPCL,
    forgotPassword,
}