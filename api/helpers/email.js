const send = require ('gmail-send');
const env = require('dotenv');
const config = env.config();

module.exports = {
    sendEmail: ({ to, link }) => {
        return new Promise((resolve, reject) => {
            const options = {
                user: config.parsed.EMAIL_BLOG,
                pass: config.parsed.EMAIL_PASS,
                to,
                subject: 'Subscribe to codelirium.io!',
                html: `
                    <h2>Thanks for being interested about Codelirium.io!</h2>
                    <br/>
                    <p>
                        You recieved this email because you initiated a subscription to Codelirium.io!
                    <br/>
                        To verify your email, click you personal verification link below:
                    </p>
                    <a href="${link} target="_blank">${link}</a>
                `
            };
    
            send(options)({}, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
}