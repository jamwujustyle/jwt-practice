const dotenv = require("dotenv").config();
const bot = require("node-telegram-bot-api");

const TOKEN = process.env.TOKEN;

bot.onText("start", (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot;
});
