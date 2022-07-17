const router = require('express').Router();

const { authMiddleware } = require('../middlewares/auth.middleware');

const { mailSend } = require('../controllers/mail.controllers');

router.post("/send", authMiddleware, mailSend)

module.exports = router;