const MessageModel = require('../models/Message');
const DialogModel = require('../models/Dialog');
const { withoutPassword } = require('../utils/withoutPassword');
const Message = {
  getByDialogId: async (req, res) => {
    try {
      const userId = req.user._id;
      const dialogId = req.params.id;
      const messages = await MessageModel.find({ dialog: dialogId }).populate([
        'author',
        'dialog',
        'attachments',
      ]);
      const resMessages = messages.map((message) => {
        const docMes = message._doc;
        const isMe = userId === docMes.author._id.toString() ? true : false;
        return { ...docMes, isMe, author: withoutPassword(docMes.author._doc) };
      });
      res.status(200).json(resMessages);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  create: async (req, res) => {
    try {
      const { dialog, text, attachments } = req.body;
      const userId = req.user._id;
      let message = await MessageModel.create({
        dialog,
        author: userId,
        text,
        attachments,
      });
      const updatedDialog = await DialogModel.findByIdAndUpdate(
        dialog,
        {
          lastMessage: message._id,
        },
        { new: true },
      );
      await message.save();
      message = await message.populate(['author', 'dialog', 'attachments']);
      const resMessage = {
        ...message._doc,
        isMe: true,
        author: withoutPassword(message._doc.author._doc),
      };

      res.status(200).json(resMessage);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.body;
      const userId = req.user._id;
      await MessageModel.findByIdAndDelete(id);

      res.status(200).json({
        message: 'deleted',
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};

module.exports = Message;
