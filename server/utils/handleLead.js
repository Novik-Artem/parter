import { sendTelegramMessage } from "./sendTelegram";

export const submitSiteLead = async (event) => {
  const body = await readBody(event);
  const name = String(body?.name || "").trim();
  const phone = String(body?.phone || "").trim();
  const comment = String(body?.comment || "").trim();

  if (!name || !phone) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name and phone are required",
    });
  }

  const text = [
    "Новая заявка с сайта ПАРТЕР 162",
    "",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Комментарий: ${comment || "—"}`,
  ].join("\n");

  await sendTelegramMessage(text);
  return { ok: true };
};
