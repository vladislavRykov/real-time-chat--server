const { body } = require('express-validator');

const registerValidator = [
  body('email', 'Неверный формат почты').isEmail(),
  body('fullName', 'Неверный формат почты'),
  body('password', 'Пароль должен состоять из 5-15 символов'),
];
const loginValidator = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен состоять из 5-15 символов'),
];
module.exports = { registerValidator, loginValidator };
