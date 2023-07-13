const { validationResult } = require('express-validator');
const DialogModel = require('../models/Dialog');
const { responceDialogs } = require('../service/dialog-service');
const ObjectId = require('mongoose').Types.ObjectId;

const Dialog = {
  getAll: async (req, res) => {
    try {
      const userId = req.user._id;
      const dialogs = await DialogModel.find({ members: userId }).populate([
        'members',
        'lastMessage',
      ]);
      const resDialogs = responceDialogs(userId, dialogs);

      res.status(200).json(resDialogs);
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        errorMessage: error.message,
        errorsArray: null,
      });
    }
  },
  create: async (req, res) => {
    try {
      const userId = req.user._id;
      const patnerId = req.body._id;
      const dialogData = {
        members: [userId, patnerId],
      };
      const dialogsExisted = await DialogModel.findOne({ members: [userId, patnerId] });
      if (dialogsExisted) {
        throw new Error('Такой диалог уже существует');
      }
      let newDialog = await DialogModel.create(dialogData);
      newDialog = await newDialog.populate(['members', 'lastMessage']);
      const resDialogs = responceDialogs(userId, newDialog);
      res.status(200).json(resDialogs);
    } catch (error) {
      res.status(400).json({
        status: 'error',
      });
    }
  },
  //   create: async (req,res)=>{
  //     try {

  //     } catch (error) {

  //     }
  //   }
};

module.exports = { Dialog };
