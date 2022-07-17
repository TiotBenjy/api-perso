const express = require('express');
const cors = require('cors');

require('./src/utils/config');

const mailRoute = require('./src/routes/mail.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/mail', mailRoute);

app.listen(1242, () => {
    console.log('Server is running on port 1242');
});