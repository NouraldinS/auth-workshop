const fs = require('fs');
const path = require('path');
const serverError = require('./serverError');

module.exports = (req, res) => {
  if (!req.loggedIn) {
    fs.readFile(path.join(__dirname, '..', '..', 'public', 'login.html'), (err, file) => {
      if (err) return serverError(err, req, res);
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(file);
    });
  } else {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('<h1>You are already logged in</h1>');
  }
};
