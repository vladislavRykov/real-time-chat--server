const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');

const DialogSchema = Schema(
  {
    members: {
      type: [ObjectId],
      ref: 'User',
    },
    lastMessage: {
      type: ObjectId,
      ref: 'Message',
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Dialog', DialogSchema);
