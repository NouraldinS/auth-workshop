const fs = require('fs');
const path = require('path');
const { getLogin, postLogin, getSignup,  postSignup, pageNotFound, checkAuth } = require('./handlers');

module.exports = (req, res) => {
  const { url, method } = req;
  req.authinticated = checkAuth.fun(req, res);
  if (req.authinticated)
  if (url === '/login' && method === 'GET') {
    getLogin(req, res);
  } else if (url === '/login' && method === 'POST') {
    postLogin(req, res);
  } else if (url === '/signup' && method === 'GET') {
    getSignup(req, res);
  } else if (url === '/signup' && method === 'POST') {
    postSignup(req, res);
  } else if (url === '/checkAuth' && method === 'GET') {
    checkAuth.page(req, res);
  } else {
    pageNotFound(req, res);
  }
};
