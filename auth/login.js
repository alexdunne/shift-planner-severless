const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SafeError = require("../error/SafeError");
const makeUserRepository = require("../repository/userRepository");

module.exports = async event => {
  const userRepository = makeUserRepository();
  const { email, password } = JSON.parse(event.body);

  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new SafeError("email or password does not match", 400);
  }

  const matches = await bcrypt.compare(password, user.password);

  if (!matches) {
    throw new SafeError("email or password does not match", 400);
  }

  return {
    apiKey: jwt.sign({ id: user.ID, email: user.email }, process.env.JWT_SECRET)
  };
};
