const { validationResult } = require('express-validator');
const DialogModel = require('../models/Dialog');
const { responceDialogs } = require('../service/dialog-service');
const UploadedFile = require('../models/UploadedFile');
const ObjectId = require('mongoose').Types.ObjectId;

const Upload = {
  images: async (req, res) => {
    const userId = req.user._id;
    const newFiles = req.files.map(async (file) => {
      console.log(file.path.replace('uploads', ''));
      const fileMod = await UploadedFile.create({
        user: userId,
        fileName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        source: process.env.API_URL + file.path.replace('uploads', ''),
      });
      await fileMod.save();
      return fileMod;
    });
    const resData = await Promise.all(newFiles);
    console.log(resData);

    res.status(200).json(resData);
  },
};

module.exports = { Upload };
