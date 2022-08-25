function mailService(options = {}) {
    return function (to, text = "", optional = {}) {
        return new Promise((resolve, reject) => {
            const nodemailer = require('nodemailer');
            const smtpTransport = require('nodemailer-smtp-transport');
            const smtpService = nodemailer.createTransport(
                smtpTransport({
                    service: options.service || "QQex",
                    auth: {
                        user: options.user,
                        pass: options.pass,
                    },
                })
            );


            const mailOpts = {
                from: options.user,
                to: to,
                text: text
            };
            optional.subject && (mailOpts.subject = optional.subject);
            optional.html && (mailOpts.html = optional.html);
            if (Array.isArray(optional.file)) {
                mailOpts.attachments = optional.file.map(item => ({ path: item }));
            } else {
                optional.file && (mailOpts.attachments = [{ path: optional.file }]);
            }

            smtpService.sendMail(mailOpts, function (error, response) {
                if (error) {
                    reject(error);
                }
                resolve(response);
                smtpService.close()
            }
            );
        })
    }
}
module.exports = { mailService }