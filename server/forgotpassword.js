/*const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require("dotenv");
const { result } = require('lodash');
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const db = require("./index.js")

const router = express.Router();
dotenv.config();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/forgotpassword', (req, res) => {
    const email = req.body.userEmail;

    // Veritabanında kullanıcının e-posta adresini ara
    db.query('SELECT * FROM user WHERE userEmail = ?', [email], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Internal server error' });
        }

        const user = rows[0];

        // Kullanıcı bulunamadıysa hata döndür
        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        // JWT oluştur
        const token = jwt.sign( email , process.env.JWT_SECRET, { expiresIn: '1h' });

        // Şifre sıfırlama bağlantısını içeren bir e-posta gönder
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: 'Gamelog <noreply@gamelog.com>',
            to: email,
            subject: 'Şifrenizi sıfırlayın',
            text: `Şifrenizi sıfırlamak için bu bağlantıya tıklayın: http://localhost:3000/reset-password?token=${token}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).send({ error: 'Internal server error' });
            }

            res.send({ message: 'E-posta gönderildi' });
        });
    });
});

module.exports = router;*/