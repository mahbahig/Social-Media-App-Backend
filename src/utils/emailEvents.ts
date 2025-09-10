import { EventEmitter } from "node:events";
import { confirmEmailTemplate } from "../services/confirmEmail.template";
import sendEmail from "../services/sendEmail";

const emailEventEmitter = new EventEmitter();

emailEventEmitter.on("confirmEmail", async ({ to, otp } :{ to: string, otp: string }) => {
    await sendEmail({ subject: "Confirm Email", to, html: confirmEmailTemplate(otp) });
});

export default emailEventEmitter;