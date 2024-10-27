import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error_code: 1 });
                }
                return res.status(403).json("Token is invalid");
            }

            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("Bạn chưa đăng nhập!");
    }
};

const checkVerifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role == 'admin' || req.user.role === 'staff') {
            next();
        } else {
            return res.status(403).json({
                Mess: 'Bạn không có quyền truy cập',
                ErrC: 1,
            });
        }
    });
};

const checkVerifyTokenAd = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role == 'admin') {
            next();
        } else {
            return res.status(403).json({
                Mess: 'Bạn không có quyền truy cập',
                ErrC: 1,
            });
        }
    });
};

const checkVerifyTokenUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role == 'user') {
            next();
        } else {
            return res.status(403).json({
                Mess: 'Bạn chưa đăng nhập',
                ErrC: 1,
            })
        }
    })
};

const checkVerifyTokenShipper = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role == 'shipper') {
            next();
        } else {
            return res.status(403).json({
                Mess: 'Bạn chưa đăng nhập',
                ErrC: 1,
            })
        }
    })
};


module.exports = {
    verifyToken,
    checkVerifyTokenAdmin,
    checkVerifyTokenUser,
    checkVerifyTokenAd,
    checkVerifyTokenShipper,
};