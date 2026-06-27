import nodemailer from "nodemailer";
import APP_CONFIG from "../utills/config.js";



async function sendMail(receiverMail, subject, body) {
    try {
        console.log("Sending email to:", receiverMail);
        console.log("app config", APP_CONFIG.SENDERMAIL, APP_CONFIG.SENDER_PASSWORD);
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Replace with your SMTP server host
            port: 587,                // 587 is standard for TLS
            secure: false,            // true for port 465, false for other ports
            auth: {
                user: APP_CONFIG.SENDERMAIL,  // Your SMTP account username
                pass: APP_CONFIG.SENDER_PASSWORD   // Your SMTP account password
            }
        });

        const mailOptions = {
            from: `"My App" <${APP_CONFIG.SENDERMAIL}>`,
            to: receiverMail,
            subject,
            html: body,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Email Sent :", info.messageId);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function registrationWelcomeMail(name, email) {

    const subject = `🎉 Welcome to ${APP_CONFIG.APP_NAME}`;

    const body = `
    <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:30px;">
        <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;padding:30px;">

            <h2 style="color:#2563eb;text-align:center;">
                Welcome ${name}! 🎉
            </h2>

            <p>Hi <strong>${name}</strong>,</p>

            <p>
                Thank you for registering with <strong>My App</strong>.
            </p>

            <p>
                Your account has been created successfully.
            </p>

            <p>
                You can now login and start exploring all the features available on our platform.
            </p>

            <div style="text-align:center;margin:30px 0;">
                <a href="https://yourwebsite.com/login"
                   style="
                        background:#2563eb;
                        color:white;
                        padding:12px 25px;
                        text-decoration:none;
                        border-radius:5px;
                        display:inline-block;">
                    Login Now
                </a>
            </div>

            <hr>

            <p style="font-size:13px;color:#777;">
                If you did not create this account, please ignore this email.
            </p>

            <p style="font-size:13px;color:#777;">
                Regards,<br>
                <strong>My App Team</strong>
            </p>

        </div>
    </div>
    `;

    await sendMail(email, subject, body);
}
