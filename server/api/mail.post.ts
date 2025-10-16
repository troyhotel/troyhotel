import nodemailer from "nodemailer";
import { defineEventHandler, readBody } from "h3";

type FormType =
  | "banquet"
  | "banquet-price"
  | "feedback"
  | "booking"
  | "groupBooking"
  | "conference"
  | "conference-price";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ type: FormType; form: Record<string, any> }>(event);
  const { type, form } = body;
  const config = useRuntimeConfig(event);

  // Если пользователь не дал согласие, письмо не отправляем
  if (!form.consent) {
    return {
      ok: false,
      skipped: true,
      message: "Пользователь не дал согласие на обработку данных, письмо не отправлено"
    };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: config.mailUser,
      pass: config.mailPass,
    },
  });

  const date = new Date().toLocaleString();

  const wrapHtml = (title: string, content: string) => `
    <div style="font-family: Stem, Arial, sans-serif; color: #1c1c1c;">
      <h2 style="
        font-weight: 500;
        font-size: 32px;
        line-height: 140%;
        color: #1c1c1c;
        margin-bottom: 20px;
      ">${title}</h2>
      ${content}
      <p style="font-family: Stem, Arial, sans-serif; font-weight: 300; font-size: 14px; color: #666; margin-top: 20px;">Дата подачи: ${date}</p>
    </div>
  `;

  const row = (label: string, value: string) => `
    <p style="font-family: Stem, Arial, sans-serif; font-weight: 300; font-size: 18px; line-height: 140%; color: #1c1c1c;">
      <strong style="font-weight: 500;">${label}:</strong> ${value}
    </p>
  `;

  // Добавляем строку с согласием
  const consentRow = row("Согласие на обработку персональных данных", form.consent ? "Да" : "Нет");

  let subject = "";
  let html = "";

  switch (type) {
    case "banquet":
      subject = `[Банкет] Заявка от ${form.name} (${form.phone})`;
      html = wrapHtml(
        "Заявка на банкет",
        row("Имя", form.name) +
        row("Телефон", form.phone) +
        row("Вопрос", form.question || "-") +
        consentRow
      );
      break;

    case "banquet-price":
      subject = `[Банкет расчет] Заявка от ${form.name} (${form.phone})`;
      html = wrapHtml(
        "Расчет стоимости банкета",
        row("Имя", form.name) +
        row("Телефон", form.phone) +
        row("Количество людей и дата", form.question || "-") +
        consentRow
      );
      break;

    case "feedback":
      subject = `[Обратная связь] Сообщение от ${form.name}`;
      html = wrapHtml(
        "Сообщение с сайта",
        row("Имя", form.name) +
        row("Телефон", form.phone) +
        row("Вопрос / Комментарий", form.question || "-") +
        consentRow
      );
      break;

    case "groupBooking":
      subject = `[Групповое бронирование] ${form.name} (${form.phone})`;
      html = wrapHtml(
        "Групповое бронирование",
        row("Имя", form.name) +
        row("Телефон", form.phone) +
        row("Вопрос / Комментарий", form.question || "-") +
        consentRow
      );
      break;

    case "conference":
      subject = `[Конференция] ${form.name} (${form.phone})`;
      html = wrapHtml(
        "Заявка от конференции",
        row("Имя", form.name) +
        row("Телефон", form.phone) +
        row("Количество людей и дата", form.question || "-") +
        consentRow
      );
      break;

    case "conference-price":
      subject = `[Конференции расчет] Заявка от ${form.name} (${form.phone})`;
      html = wrapHtml(
        "Расчет стоимости конферц.зала",
        row("Имя", form.name) +
        row("Телефон", form.phone) +
        row("Количество людей и дата", form.question || "-") +
        consentRow
      );
      break;

    default:
      subject = `[Неизвестная форма]`;
      html = wrapHtml(
        "Данные формы",
        `<pre>${JSON.stringify(form, null, 2)}</pre>` + consentRow
      );
  }

  try {
    await transporter.sendMail({
      from: `"Сайт Парк-отель Троя" <${config.mailUser}>`,
      to: config.mailTo,
      subject,
      html,
      replyTo: form.email || undefined,
    });

    return { ok: true };
  } catch (err: any) {
    console.error("Ошибка при отправке письма:", err);
    return { ok: false, error: err.message };
  }
});
