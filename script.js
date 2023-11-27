document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const navbar = document.getElementById('navbar');

    hamburgerIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
});

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send', (req, res) => {
    // Nodemailer setup
    let transporter = nodemailer.createTransport({
        // Your SMTP settings (e.g., Gmail, Mailgun)
    });

    let mailOptions = {
        from: '"Beautiful Landscaping" <info@beautifullandscaping.com>',
        to: 'recipient@example.com', // replace with your email
        subject: 'New Contact Form Submission',
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send("Error sending email.");
        }
        res.status(200).send("Email successfully sent.");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
