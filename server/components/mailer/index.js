/**
 * Error responses
 */

'use strict';

const nodemailer = require('nodemailer');
// const xoauth2 = require('xoauth2');

const send = (details, emailTo = 'adriankim82@gmail.com') => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'Oauth2',
      user: process.env.GOOGLE_USER_EMAIL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
  });
  let mailOptions = {
    to: emailTo,
    subject: 'test',
    text: JSON.stringify(details)
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      return console.log(err);
    }
    console.log(`Message sent: ${info.messageId}`);
  });
};

export {send};
