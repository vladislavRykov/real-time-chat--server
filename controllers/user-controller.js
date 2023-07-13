const { validationResult } = require('express-validator');
const UserModel = require('../models/User');
const { generateToken, validateAccessToken } = require('../service/user-service');
const ObjectId = require('mongoose').Types.ObjectId;

const User = {
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errorMessage: 'Невалидные значения полей',
          errorsArray: errors.array(),
        });
      }
      const user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        throw new Error('Пользователь с такой почтой уже существует');
      }
      const postData = {
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
      };
      const newUser = await UserModel.create(postData);
      const { password, ...resData } = newUser._doc;
      const accessToken = generateToken(resData);
      res.status(200).json({
        ...resData,
        accessToken,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        errorMessage: error.message,
        errorsArray: null,
      });
    }
  },
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errorMessage: 'Невалидные значения полей',
          errorsArray: errors.array(),
        });
      }
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        throw new Error('Неправильный пароль или email');
      }
      if (user.password !== req.body.password) {
        throw new Error('Неправильный пароль или email');
      }
      const { password, ...resData } = user._doc;
      const accessToken = generateToken(resData);
      res.status(200).json({
        ...resData,
        accessToken,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        errorMessage: error.message,
        errorsArray: null,
      });
    }
  },
  refresh: async (req, res) => {
    try {
      const accessToken = req.body.accessToken;
      if (!accessToken) {
        throw new Error('Вы не были авторизованы');
      }
      const userInfo = validateAccessToken(accessToken);
      if (!userInfo) {
        throw new Error('Такого accessToken не существует или он не валиден');
      }

      const user = await UserModel.findById(userInfo._id);

      const { password, ...userData } = user._doc;
      const newAccessToken = generateToken(userData);
      user.save();
      return res.json({
        ...userData,
        accessToken: newAccessToken,
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        errorMessage: error.message,
        errorsArray: null,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const userId = req.params.id;
      if (!ObjectId.isValid(userId)) {
        throw new Error('id невалиден');
      }
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error('Такого пользователя не существует');
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({
        status: 'error',
        errorMessage: error.message,
        errorsArray: null,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const userId = new ObjectId(req.user._id);
      const users = await UserModel.find({ _id: { $ne: userId } }).select({ fullName: 1 });

      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({
        status: 'error',
        errorMessage: error.message,
        errorsArray: null,
      });
    }
  },
};

module.exports = { User };
