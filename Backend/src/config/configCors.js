
const configCors = (app) => {
    // Add headers before the routes are defined
    app.use(function (req, res, next) {

        const allowedOrigins = ['http://localhost:3006', 'http://localhost:3000'];
        const origin = req.headers.origin;

        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        // Website you wish to allow to connect
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3006', 'http://localhost:3000');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, token');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        if (req.method === 'OPTIONS') {
            return res.status(204).end();
        }

        // Pass to next layer of middleware
        next();
    });
};

export default configCors;