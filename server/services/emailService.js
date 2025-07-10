const nodemailer = require('nodemailer');

exports.sendVerificationEmail = async (user, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  const url = `${process.env.CLIENT_URL}/verify/${token}`;
  await transporter.sendMail({
    to: user.email,
    subject: 'Verify Email',
    html: `<a href="${url}">Verify Email</a>`
  });
};
