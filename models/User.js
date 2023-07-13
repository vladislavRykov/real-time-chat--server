const { Schema, model } = require('mongoose');

const UserModel = Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: String | null,
    confirm: Boolean,
    confirm_hash: String,
    last_seen: Date,
  },
  {
    timestamps: true,
  },
);

module.exports = model('User', UserModel);
