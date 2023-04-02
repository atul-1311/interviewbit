const nodemailer = require('nodemailer');

class EmailService{
    async sendEmail({ from, sendername, to, subject, text  }){
        let transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT, 
                    secure: false,
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS
                    }
                });
            
                let info = await transporter.sendMail({
                    from: `mentor <${from}>`,
                    sendername: sendername,
                    to: to,
                    subject: subject,
                    text: text,
        });

        // console.log(info);
        return text;
    }
}

module.exports = new EmailService();
