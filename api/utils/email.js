const path = require('path');
const fs = require('fs');

const nodemailer = require('nodemailer');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.url = url;
        this.from = `Book Worm <${process.env.EMAIL_FROM}>`;
    }

    //a method to create the transport
    newTransport() {
        //if we're not in production use MailTrap
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,

            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    // send the actual email
    async sendPasswordReset() {
        const templatePath = path.join(__dirname, '../views/email/index.html');
        let htmlTemplate = await fs.readFile(
            templatePath,
            'utf-8',
            async (err, data) => {
                // Replace placeholders
                const html = data.replace(/{{URL}}/g, this.url);
                //2)define the email options
                const mailOptions = {
                    from: this.from,
                    to: this.to,
                    subject:
                        'Your password reset token(valid for only 10 minutes)',
                    html,
                    attachments: [
                        {
                            filename: 'image-2.png',
                            path: path.join(
                                __dirname,
                                '../views/email/images/image-2.png'
                            ),
                            cid: 'image2', // same as used in img src
                        },
                    ],
                };

                //3)create a transport and send email
                await this.newTransport().sendMail(mailOptions);
            }
        );
    }
};
