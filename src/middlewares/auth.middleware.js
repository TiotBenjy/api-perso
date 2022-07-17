module.exports.authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        if (authorization === config.api.authToken) {
            return next();
        }

        return res.status(401).json({
            code: 401,
            message: 'Unauthorized'
        });
    } catch (error) {
        console.log(error);
        console.log(" _________________________________________________");
        return res.status(500).json({
            code: 500,
            message: 'Internal server error'
        });
    }


}