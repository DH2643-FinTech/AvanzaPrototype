import nodemailer from 'nodemailer';

export const POST = async (request: Request) => {
  try {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'smtp.kth.se',
      auth: {
        user: 'ermia@kth.se', // Use environment variable
        pass: '6175144Gher!',   // Use environment variable (app password)
      },
    });

    // Setup email data
    const mailOptions = {
      from: 'ermia@kth.se', // Use environment variable
      to: 'ermiaghaffari2002@gmail.com', // Replace with actual recipient email
      subject: 'Subject of your email',
      text: 'Hello world?', // Plain text body
       html: '<b>Hello world?</b>' // HTML body if needed
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    // Return a successful response
    return new Response(JSON.stringify({ success: true, messageId: info.messageId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error occurred: ', error);

    // Return an error response
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
