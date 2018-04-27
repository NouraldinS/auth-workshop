const jwt = require('jsonwebtoken');
const cookie = require('cookie');
require('env2')('./.config.env');

module.exports = {
  page: (req, res) => {
    if (req.authinticated) {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end('<h1>Authinticated</h1>');
    } else {
      res.writeHead(403, { 'content-type': 'text/html' });
      res.end('<h1>NOT Authinticated</h1>');
    }
  },
  fun: (req, res) => {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    if (cookies.token) {
      jwt.verify(cookies.token, process.env.SECRET, (err, decoded) => {
        if (err) {
          res.writeHead(403, { 'content-type': 'text/html' });
          res.end('<h1>You Are Not Authorised To Proceed</h1>');
          return false;
        }
        req.loggedIn = true;
        return true;
      });
    } return true;
  }
};
