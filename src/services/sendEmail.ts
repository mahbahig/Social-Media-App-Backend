import nodemailer, { SendMailOptions } from "nodemailer";
import { devConfig } from "../config/dev.config";

const sendEmail = async (mailOptions: SendMailOptions) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: devConfig.EMAIL,
            pass: devConfig.PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: `"Social Media App" <${devConfig.EMAIL}>`,
        ...mailOptions
    });
    console.log("Message sent:", info.messageId);
}

export default sendEmail;