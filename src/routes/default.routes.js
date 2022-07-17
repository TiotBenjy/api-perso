const defaultRoute = (req, res) => {
    return res.status(500).json({
        code: 500,
        message: "bad_request"
    });
};

module.exports = {
    defaultRoute
};