'use server';

// Utils
import sgMail from '@sendgrid/mail';

export const sendTestEmail = async () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  const message = {
    to: 'a.barghigiani@gmail.com',
    from: 'andrea.barghigiani@digitrails.com',
    subject: 'Sending with SendGrid is Fun',
    text: "I's also easy AF with Next.js",
    html: "<strong>I's also easy AF with Next.js</strong>",
  };

  try {
    await sgMail.send(message);
  } catch (error) {
    console.log(error);
  }
};
