"use strict";
const dotenv = require("dotenv").config();
const telegramBot = require("node-telegram-bot-api");
const jwt = require("jsonwebtoken");

const TOKEN = process.env.TOKEN;

if (!TOKEN) {
  console.log("Telegram bot token is not defined");
  process.exit(1);
}

const bot = new telegramBot(TOKEN, {
  polling: true,
});

const generateToken = (chatId) => {
  const payload = { chatId };
  const secret = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "Bot has started. To retrieve the verification code, enter the command:\n'/sendcode'"
  );
});

bot.onText(/\/sendcode/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Please provide your email address:");

  bot.once("message", (response) => {
    const userEmail = response.text;

    if (validateEmail(userEmail)) {
      const token = generateToken(chatId);
      bot.sendMessage(
        chatId,
        `Your verification token is: ${token}\nKeep it secure and do not share it with anyone.`
      );
    } else {
      bot.sendMessage(chatId, "Invalid email address. Please try again.");
    }
  });
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text !== "/start" && msg.text !== "/sendcode") {
    bot.sendMessage(chatId, "Message received, but I'm not sure what to do.");
  }
});

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};
