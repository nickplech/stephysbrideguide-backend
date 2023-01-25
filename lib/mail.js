import { createTransport, getTestMessageUrl } from 'nodemailer'

const transport = createTransport({
  host: process.env.MAIL_HOST,
  secureConnection: process.env.SECURE_CONNECTIONS,
  port: process.env.MAIL_PORT,
  tls: {
    ciphers:'SSLv3'
 },
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

function makeANiceEmail(text) {
  return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>

      <p>xo, Stephy</p>
    </div>
  `
}
function inquiryEmail(text) {
  return`
    <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;">
    <h2>You Have a New Inquiry!</h2>
    <p>${text}</p>

    <p>Hooray Shooshi!</p>
  `
}
export async function sendPasswordResetEmail(resetToken, to) {
  // email the user a token
  const info = await transport.sendMail({
    to,
    from: 'info@stephysbrideguide.com',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>
    `),
  })
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`)
  }
}

export async function newSubmissionEmail(submissionObj) {
  transport.verify(function (error, success) {
    if (error) {
      console.log(error)
    } else {
      console.log("Server is ready to take our messages")
    }
  })
// const from = submissionObj.firstName + " " + submissionObj.lastName
  const info = await transport.sendMail({
    from: 'info@stephysbrideguide.com',
    to: `${ process.env.MAIL_USER }`,
    subject: 'New Inquiry!',
    html: inquiryEmail(`An interested couple has reached out to you!
<br/>
<p>first name: ${submissionObj.firstName}</p>
<p>last name: ${submissionObj.lastName}</p>
<p>fiance name: ${submissionObj.fianceFirst}</p>
<p>email: ${submissionObj.email}</p>
<p>phone number: ${submissionObj.mobilePhone}</p>
<p>submitted on: ${submissionObj.publishedAt}</p>
<p>event date: ${submissionObj.eventDate}</p>
<p>service requested: ${submissionObj.serviceRequested}</p>
<p>additional info: ${submissionObj.additionalInformation}</p>
    `),
  })
console.log('message sent!')
}