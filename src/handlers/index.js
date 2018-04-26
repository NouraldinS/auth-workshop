const getLogin = require('./getLogin');
const postLogin = require('./postLogin');
const getSignup = require('./getSignup');
const checkAuth = require('./checkAuth');
const postSignup = require('./postSignup');
const serverError = require('./serverError');
const pageNotFound = require('./pageNotFound');

module.exports = {
  getLogin,
  postLogin,
  getSignup,
  checkAuth,
  postSignup,
  serverError,
  pageNotFound
};
