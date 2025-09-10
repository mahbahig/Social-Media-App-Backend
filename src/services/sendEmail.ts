import nodemailer, { SendMailOptions } from "nodemailer";

const sendEmail = async (mailOptions: SendMailOptions) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: `"Social Media App" <${process.env.EMAIL}>`,
        ...mailOptions
    });
    console.log("Message sent:", info.messageId);
}

export default sendEmail;