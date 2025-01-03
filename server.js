require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// POST /send-mail
app.post('/send-mail', async (req, res) => {
    const { name, email, contact, message, project } = req.body;

    if (!name || !email || !contact || !message || !project) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // True for port 465, false for 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send mail
        const info = await transporter.sendMail({
            from: `"Shilp" <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_FROM, // Recipient's email
            subject: `New Inquiry from ${name}`, // Dynamic subject
            text: `Name: ${name}\nContact: ${contact}\nProject: ${project}\nMessage: ${message}`, // Plain text body
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #4CAF50; color: #fff; text-align: center; padding: 20px;">
                    <h2 style="margin: 0;">New Inquiry Received</h2>
                </div>
                <div style="padding: 20px; line-height: 1.6;">
                    <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
                    <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
                    <p style="font-size: 16px;"><strong>Contact:</strong> ${contact}</p>
                    <p style="font-size: 16px;"><strong>Project:</strong> ${project}</p>
                    <p style="font-size: 16px;"><strong>Message:</strong><br> ${message}</p>
                </div>
            </div>
            `,
        });

        console.log('✅ Message sent:', info.messageId);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});

// Set up the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
