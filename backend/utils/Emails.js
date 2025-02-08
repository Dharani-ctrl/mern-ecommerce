const nodemailer = require('nodemailer');

const sendMail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = { from: process.env.SMTP_USER, to, subject, html };

        await transporter.sendMail(mailOptions);
        console.log(`📧 Email sent to ${to}`);
    } catch (error) {
        console.error('🚨 Error sending email:', error);
    }
};

// ✅ Ensure correct export
module.exports = sendMail; // For CommonJS
// OR 
// export default sendMail; // For ESM
