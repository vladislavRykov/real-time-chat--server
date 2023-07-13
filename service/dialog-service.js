const responceDialogs = (userId, dialogs) => {
  if (Array.isArray(dialogs)) {
    const resDialogs = dialogs.map((dialog) => {
      const { password, ...partner } = dialog.members.find(
        (el) => el._id.toString() !== userId,
      )._doc;
      const { members, ...rest } = dialog._doc;
      return { ...rest, partner };
    });
    return resDialogs;
  } else {
    const { password, ...partner } = dialogs.members.find(
      (el) => el._id.toString() !== userId,
    )._doc;
    const { members, ...rest } = dialogs._doc;
    return { ...rest, partner };
  }
};
module.exports = { responceDialogs };
