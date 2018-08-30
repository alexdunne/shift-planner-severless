const bcrypt = require("bcrypt");
const uuid = require("uuid");

const SafeError = require("../error/SafeError");
const makeUserRepository = require("../repository/userRepository");

module.exports = async event => {
  const userRepository = makeUserRepository();
  const { email, password } = JSON.parse(event.body);

  const user = await userRepository.findByEmail(email);

  if (user) {
    throw new SafeError("That user already exists", 400);
  }

  const newUser = {
    ID: uuid.v4(),
    email,
    password: await bcrypt.hash(password, 10)
  };

  await userRepository.create(newUser);

  return newUser;
};
