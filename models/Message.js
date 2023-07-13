const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');

const MessageSchema = Schema(
  {
    author: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
    },
    dialog: {
      type: ObjectId,
      ref: 'Dialog',
      required: true,
    },
    unread: {
      type: Boolean,
      required: true,
      default: false,
    },
    attachments: {
      type: [ObjectId],
      ref: 'UploadedFile',
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Message', MessageSchema);
