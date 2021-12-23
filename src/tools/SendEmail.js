const nodemailer = require("nodemailer");

const sendEmail = async (code, user) => {
    return new Promise((resolve, reject) => {
        const smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            secure: true,
            auth: {
              user: 'for.devs.only@gmail.com',
              pass: 'Ahmad.Dev@11000',
            },
        });
    
        var mailOptions = {
            to: user.email,
            from: 'Bety App <for.devs.only@gmail.com>',
            subject: 'Password Reset',
            html: `You are receiving this because you (or someone else) have requested the reset of the password for your account.<br><br>
              Please type this number in the app to complete the process:<br>
              <h1>${code}</h1>
              If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };
    
        // resolve()
        // return
        smtpTransport.sendMail(mailOptions).then(response => {
            resolve(response)
        }).catch(err => {
            reject(err);
        })
    })
}

// const sendEmail = async (token, user, req) => {
//     return new Promise((resolve, reject) => {
//         const smtpTransport = nodemailer.createTransport({
//             service: 'Gmail',
//             secure: true,
//             auth: {
//               user: 'for.devs.only@gmail.com',
//               pass: 'Ahmad.Dev@11000',
//             },
//         });
    
//         var mailOptions = {
//             to: user.email,
//             from: 'Bety App <for.devs.only@gmail.com>',
//             subject: 'Password Reset',
//             html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.<br><br>' +
//               'Please click on the following link to complete the process:<br>' +
//               '<button><a href="http://' + req.headers.host + '/au/reset/' + token + '">Reset</a></button><br><br><br>' +
//               ' If you did not request this, please ignore this email and your password will remain unchanged.\n'
//         };
    
//         smtpTransport.sendMail(mailOptions).then(response => {
//             resolve(response)
//         }).catch(err => {
//             reject(err);
//         })
//     })
// }

module.exports = { sendEmail };