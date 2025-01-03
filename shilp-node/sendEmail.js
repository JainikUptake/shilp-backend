const nodemailer = require("nodemailer");
require('dotenv').config();

async function main() {
    try {
        // 1. Create a transporter for Gmail
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for port 465, false for 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 2. Send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"Jainik 👻" <${process.env.EMAIL_FROM}>`, // Sender address
            to: "recipient@example.com", // Receiver email
            subject: "Test Email from Gmail ✔", // Subject line
            text: "Hello! This is a test email sent using Gmail and Nodemailer.", // Plain text body
            html: "<b>Hello! This is a test email sent using Gmail and Nodemailer.</b>", // HTML body
        });

        console.log("✅ Message sent: %s", info.messageId);
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
    }
}

// Start the email process
main();
