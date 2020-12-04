import nodemailer from 'nodemailer';
require('dotenv').config()

export async function sendEmail(email: string, url: string) {
  console.log(process.env.GM_USER)
  console.log(process.env.GM_PASSWORD)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GM_USER,
        pass: process.env.GM_PASSWORD
    }
  })

  const mailOptions = {
    from: `"Code Project API" <${process.env.GM_USER}>`,
    to: email,
    subject: "Hello ✔",
    text: "Hello world?", 
    html: `<a href="${url}">${url}</a>`
  }

  const info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
}

