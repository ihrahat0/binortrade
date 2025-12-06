import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

export const sendOTP = async (to: string, otp: string) => {
    const mailOptions = {
        from: '"BinOrTrade" <binortrade@gmail.com>',
        to,
        subject: 'Verify Your Email - BinOrTrade',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1b26; color: #ffffff; padding: 20px; border-radius: 10px;">
                <h2 style="color: #10b981; text-align: center;">Verify Your Email</h2>
                <p>Hello,</p>
                <p>Use the code below to verify your email address. This code will expire in 10 minutes.</p>
                <div style="background-color: #24283b; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
                    <h1 style="margin: 0; color: #fbbf24; letter-spacing: 5px;">${otp}</h1>
                </div>
                <p>If you didn't request this, please ignore this email.</p>
                <p>Best regards,<br>BinOrTrade Team</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
