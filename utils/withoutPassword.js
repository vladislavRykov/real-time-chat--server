const withoutPassword = (obj) => {
  const { password, ...rest } = obj;
  return rest;
};
module.exports = { withoutPassword };
