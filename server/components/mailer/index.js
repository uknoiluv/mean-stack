/**
 * Error responses
 */

'use strict';

const nodemailer = require('nodemailer');

export default function sendMail(details) {
  console.log('details', details);
  let transporter = nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'raa52wwr6np6wvpt@ethereal.email',
        pass: 'HTuYvYtr1UqNED7Jma'
      }
    });
    let mailOptions = {
      to: 'uknoiluv@gmail.com',
      subject: 'test',
      text: JSON.stringify(details),
      html: '<p><b>hello </b> will be there </p>'
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        return console.log(err);
      }
      console.log(`Message sent: ${info.messageId}`);
      console.log(`Preview URL: %s: ${nodemailer.getTestMessageUrl(info)}`)
    });
  });
};
