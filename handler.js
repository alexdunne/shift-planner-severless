"use strict";

const register = require("./auth/register");
const buildErrorReponse = require("./response/buildErrorReponse");

module.exports.register = async (event, context, callback) => {
  try {
    const data = await register(event);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ data })
    });
  } catch (error) {
    callback(null, buildErrorReponse(error));
  }
};
