const jwt = require('jsonwebtoken');
const User = require('../models/user');
const getTokenFrom = (request) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request);

  next();
};

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    next();
    return;
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid',
    });
  }

  const user = await User.findById(decodedToken.id);
  request.user = user;
  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
