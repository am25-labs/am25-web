import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: import.meta.env.SMTP_HOST,
  port: Number(import.meta.env.SMTP_PORT),
  secure: false,
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASSWORD,
  },
});

export async function sendMail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  return transporter.sendMail({
    from: `"AM25" <${import.meta.env.SMTP_FROM}>`,
    to,
    subject,
    text,
  });
}
