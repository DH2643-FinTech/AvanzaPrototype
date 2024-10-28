import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_us3vp1r';
const TEMPLATE_ID = 'template_kmg9wjd';
const USER_ID = '9Q600vKX9f68s1yZd';

export const sendPasswordResetEmail = async ({email, resetLink}: {email:string, resetLink:string}) => {

    try {
        emailjs.init(USER_ID);
        const templateParams = {
        to_email: email,
        reset_link: resetLink,
        };
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
        return response;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return 'Failed to send password reset email';
    }
};
