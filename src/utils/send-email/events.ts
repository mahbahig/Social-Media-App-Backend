import { EventEmitter } from "node:events";
import sendEmail from "../../services/sendEmail";
import { confirmEmailTemplate } from "../../services/confirmEmail.template";

export const emailEventEmitter = new EventEmitter();

emailEventEmitter.on("confirmEmail", async ({ to, otp } :{ to: string, otp: string }) => {
    await sendEmail({ subject: "Confirm Email", to, html: confirmEmailTemplate(otp) });
});