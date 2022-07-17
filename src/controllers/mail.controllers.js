const mailer = require('nodemailer');
var handlebars = require('handlebars');
const { readHTMLFile } = require('../utils/functs');

module.exports.mailSend = async (req, res) => {

    let { firstname, lastname, tel, email, subject, message } = req.body;

    var transporter = mailer.createTransport({
        port: config.mailer.port,
        host: config.mailer.host,
        auth: {
            user: config.mailer.auth.user,
            pass: config.mailer.auth.pass
        },
        authMethod: "PLAIN",
    });

    readHTMLFile('./src/templates/mail/index.html', function (err, html) {
        if(err) {
            console.log(err);

            return res.status(500).json({
                code: 500,
                message: 'Internal server error'
            });
        };

        var template = handlebars.compile(html);

        var replacements = {
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            phone: tel.trim(),
            email: email.trim(),
            object: subject.trim(),
            message: message
        };

        var htmlToSend = template(replacements);

        var mailOptions = {
            from: 'no-reply@benjamingourlez.fr',
            to: 'contact@benjamingourlez.fr',
            subject: `Website - ${subject}`,
            html: htmlToSend
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({
                    code: 500,
                    message: 'Internal server error'
                });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({
                    code: 200,
                    message: 'Email sent',
                    data: info.response
                });
            }
        });
    });

}