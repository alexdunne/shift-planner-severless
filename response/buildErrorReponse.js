const SafeError = require("../error/SafeError");

module.exports = error => {
  if (error instanceof SafeError) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({ message: error.message })
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({ message: error.message })
  };
};
