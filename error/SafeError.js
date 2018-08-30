class SafeError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, SafeError);
  }
}

module.exports = SafeError;
