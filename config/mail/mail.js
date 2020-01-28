const nodemailer = require('nodemailer')

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nuadthaijob@gmail.com',
        pass: 'codecamp4nuadthai',
    }
});


exports.mailcreator = (type,req,token) => {
    switch (type) {
        case 'contactus':
            return {
                from: `${req.body.sender}`,
                to: `${req.body.receiver}`,
                subject: `${req.body.title}`,
                html: `<h2>${req.body.sender}</h2>
                       <h3>${req.body.message}</h3>`
            }
        case 'forgetpassword':
            return {
                from:'nuadthaijob@gmail.com',
                to: `${req.body.email}`,
                subject: `reset password`,
                text: 'you are recieving this because you (or someone else) have request the reset for your account.\n\n'+
                      'Please click on the following link, or paste this into your browser to compleate the process within fifteen minute of recieving it:\n\n'+
                      `http://localhost:3000/resetpassword/${token}\n\n`+
                      'if you did not request this, please ignore this email and your password will remain unchanged.\n'
            }
            default:
                return ''
    }
}