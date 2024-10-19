require('dotenv').config();
import axios from 'axios';
import socialService from '../services/socialService';
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'http://localhost:3000');

const verifyToken = async (code) => {
    try {
        const { tokens } = await client.getToken(code);
        return tokens;
    } catch (error) {
        console.log(error);

    }

};


const handleLoginGoogle = async (req, res) => {
    try {
        const { token } = req.body;

        const code = await verifyToken(token);

        const { id_token, access_token } = code;

        const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const userInfo = userInfoResponse.data;
        if (userInfo) {
            return res.status(200).json({
                data: userInfo,
                mess: 'Đăng nhập thành công',
                status: 0,
            })

        }
        return res.status(500).json({
            mess: response.mess,
            status: response.status,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mess: 'Error from social controller',
            status: -1,
        });
    }
};

const loginGoogle = async (req, res) => {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const picture = req.body.picture;
        const response = await socialService.loginUserSocial(email, name, picture);
        if (response.status === 0) {
            return res.status(200).json({
                status: 0,
                data: response.data,
            });
        }
        return res.status(500).json({
            status: -1,
            mess: response.mess
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: -1,
            mess: 'error login from social controller'
        });

    }
}

module.exports = {
    handleLoginGoogle,
    loginGoogle,
};
