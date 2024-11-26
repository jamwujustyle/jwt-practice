"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const logginMiddleware = async (request, response, next) => {
  console.log(`${request.method} = ${request.url}`);
  next();
};

router.post("/register", (request, response) => {});
