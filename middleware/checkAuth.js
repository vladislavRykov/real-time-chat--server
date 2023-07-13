const { validateAccessToken } = require('../service/user-service');

const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('Вы не авторизованны');
    }
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new Error('Вы не авторизованны');
    }
    const userInfo = validateAccessToken(accessToken);
    if (!userInfo) {
      throw new Error('Неправильный токен');
    }
    req.user = userInfo;
    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
module.exports = checkAuth;
