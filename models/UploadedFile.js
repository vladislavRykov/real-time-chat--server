const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');

const UploadedFile = Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    size: Number,
    mimetype: String,
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    // message: {
    //   type: ObjectId,
    //   ref: 'Message',
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);

module.exports = model('UploadedFile', UploadedFile);
