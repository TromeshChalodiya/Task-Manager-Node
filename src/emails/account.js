const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'fd6143@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app , ${name}, Let me know how you get along with the app`
  });
};

const cancelAccountEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'fd6143@gmail.com',
    subject: 'Please find the reason',
    text: `How was your experiance throught the app, ${name}, Please let us know if we need to improve something`
  });
};

module.exports = {
  sendWelcomeEmail,
  cancelAccountEmail
};
