import { Resend } from "resend";
import { config as loadEnv } from "dotenv";
loadEnv();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  userName,
  userEmail,
  restaurantName,
  restaurantLocation,
  date,
  time,
  numberOfGuests,
}) => {
  try {
    await resend.emails.send({
      from: "ChhotuTableWala 🍽 <onboarding@resend.dev>",
      to: [userEmail],
      subject: "Your Table Reservation is Confirmed 🎉",
      html: `
        <h2>Hi ${userName},</h2>
        <p>Your reservation at <strong>${restaurantName}</strong> has been successfully confirmed!</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Location:</strong> ${restaurantLocation}</p>
        <p><strong>Number of Guests:</strong> ${numberOfGuests}</p>
        <br />
        <p>We look forward to serving you 😊</p>
        <p><em>- Team ChhotuTableWala</em></p>
      `,
    });

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email",
    };
  }
};
