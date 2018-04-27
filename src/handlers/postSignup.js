const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { serverError } = require('../handlers');
const { users } = require('../database.json');

module.exports = (req, res) => {
  let data = '';
  req.on('data', chunk => data += chunk)
    .on('end', () => {
      data = data.split('&');
      const password = data[1].split('=')[1];
      const username = data[0].split('=')[1].toLowerCase();
      const user = users.filter(singleUser => singleUser.username.toLowerCase() === username);
      if (user.length === 0) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ msg: 'User Already Exists' }));
      } else {
        bcrypt.hash(password, 8, (hashError, hash) => {
          if (hashError) return serverError(hashError, req, res);
          users.push({ username, password: hash });
          fs.writeFile(path.join(__dirname, '..', 'database.json'), JSON.stringify({ users }), (readError) => {
            if (readError) return serverError(readError, req, res);
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ msg: 'User Added Successfully' }));
          });
        });
      }
    });
};
