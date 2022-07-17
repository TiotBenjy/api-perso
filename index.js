const express = require('express');
const cors = require('cors');

require('./src/utils/config');

const mailRoute = require('./src/routes/mail.routes');


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATH, OPTIONS');

    next();
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        code: 200,
        message: "Welcome to the Benjamin G API"
    });
});

app.use('/mail', mailRoute);

app.listen(config.api.port, () => {
    console.log('Server is running on port 1242');
});