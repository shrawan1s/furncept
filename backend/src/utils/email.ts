import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const link = process.env.EMAIL_LINK;

if (!link) {
  throw new Error('EMAIL_LINK is not defined in environment variables');
}

// Function to send password reset email
export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<void> => {
  // Create a nodemailer transporter with your email service provider configuration
  const transporter = nodemailer.createTransport({
    host: process.env.PROVIDER_HOST,
    port: 465,
    auth: {
      user: process.env.USER_NAME as string,
      pass: process.env.PASS_WORD as string
    }
  });

  try {
    // Send email
    await transporter.sendMail({
      from: 'techsupport@gmail.com', // Use environment variable or fallback
      to: email, // Recipient address
      subject: 'Reset Password', // Email subject
      html: `<p>Click <a href="${link}/${resetToken}">here</a> to reset your password.</p>`, // Email body with reset link
    });
  } catch (error) {
    console.log('Error sending password reset email:', error); // Log the error
    throw new Error('Failed to send reset password email. Please try again later.');
  }
};
