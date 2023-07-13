const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, { expiresIn: '1d' });
  return accessToken;
};

const validateAccessToken = (accessToken) => {
  try {
    const userData = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);
    return userData;
  } catch (error) {
    return null;
  }
};
module.exports = {
  generateToken,
  validateAccessToken,
};
