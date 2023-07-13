const UserModel = require('../models/User');
const updateLastSeen = async (req, res, next) => {
  try {
    const id = req.user._id;
    await UserModel.updateOne({ _id: id }, { last_seen: new Date() });
  } catch (error) {
  } finally {
    next();
  }
};

module.exports = updateLastSeen;
