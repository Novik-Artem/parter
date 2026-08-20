import { createError } from "h3";
import https from "node:https";
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from "./telegramConfig";

const chatCandidates = (chatId) => {
  const raw = String(chatId).trim();
  const ids = [raw];
  if (/^-\d+$/.test(raw) && !raw.startsWith("-100")) {
    ids.push(`-100${raw.slice(1)}`);
  }
  return ids;
};

const postTelegram = (token, body, family) =>
  new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request(
      {
        hostname: "api.telegram.org",
        path: `/bot${token}/sendMessage`,
        method: "POST",
        ...(family ? { family } : {}),
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          const raw = Buffer.concat(chunks).toString("utf8");
          try {
            resolve(JSON.parse(raw));
          } catch {
            reject(new Error(raw || "Invalid Telegram response"));
          }
        });
      },
    );

    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy(new Error("Telegram timeout"));
    });
    req.write(data);
    req.end();
  });

export const sendTelegramMessage = async (text) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw createError({
      statusCode: 500,
      statusMessage: "Telegram is not configured",
    });
  }

  let lastDescription = "Telegram request failed";

  for (const family of [4, undefined]) {
    for (const chatId of chatCandidates(TELEGRAM_CHAT_ID)) {
      try {
        const response = await postTelegram(
          TELEGRAM_BOT_TOKEN,
          {
            chat_id: chatId,
            text,
          },
          family,
        );
        if (response?.ok) return response;
        lastDescription = response?.description || lastDescription;
      } catch (error) {
        lastDescription = error?.message || lastDescription;
      }
    }
  }

  throw createError({
    statusCode: 502,
    statusMessage: lastDescription,
  });
};
