"use strict";
const dotenv = require("dotenv").config({ path: "./.env" });
const telegramBot = require("node-telegram-bot-api");
const jwt = require("jsonwebtoken");

const TOKEN = process.env.TOKEN;

if (!TOKEN) {
  console.log("telegram bot is not defined");
  process.exit(1);
}

const bot = new telegramBot(TOKEN, {
  polling: true,
});

const generateToken = (chainId) => {
  const payload = { chainId };
  const secret = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
};

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "bot has started. to retrieve the verification code enter command\n '/sendcode'"
  );
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text !== "/start" && msg.text !== "/sendcode") {
    bot.sendMessage(chatId, "message recieved");
  }
});
bot.onText(/\/sendcode/, (msg) => {
  const chatId = msg.chat.id;
  const token = generateToken(chatId);
  bot.sendMessage(chatId, "please provide your email address: ");

  bot.once("message", (response) => {
    const userEmail = response.text;

    if(validateEmail(userEmail))
  });
});
const validateEmail = email => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email)
}