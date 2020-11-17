import nodemailer from 'nodemailer';

export async function sendEmail(email: string, url: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '***REMOVED***',
        pass: 'bitfox-fuhZaz-tutco3'
    }
  })

  const mailOptions = {
    from: '"Max Streitberger" <***REMOVED***>',
    to: email,
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<a href="${url}">${url}</a>` // html body
  }

  const info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
}

