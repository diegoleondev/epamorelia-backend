import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import nodemailer from "nodemailer";
import { ENV } from "../../constants/index.js";

function getHTMLTemplate(template: string) {
  return fs.readFileSync(
    path.join(
      path.dirname(url.fileURLToPath(import.meta.url)),
      `../../../public/templates/email-${template}.html`,
    ),
    "utf-8",
  );
}

const transporter = nodemailer.createTransport({
  host: ENV.EMAIL_HOST,
  port: ENV.EMAIL_PORT,
  secure: ENV.EMAIL_SECURE,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});

transporter.verify().then(() => {
  console.log("[*] Ready to send emails");
});

async function sendForgotPassword(props: { to: string; token: string }) {
  await transporter.sendMail({
    from: ENV.EMAIL_FROM,
    to: props.to,
    subject: "Recuperar contraseña",
    html: getHTMLTemplate("forgot-password").replace(
      "{{url}}",
      `${ENV.CLIENT_URL}/auth/reset-password/${props.token}`,
    ),
  });
}

const Email = {
  sendForgotPassword,
};

export default Email;
