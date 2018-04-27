const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { users } = require('../database.json');
require('env2')('./.config.env');

module.exports = (req, res) => {
  let data = '';
  req.on('data', chunk => data += chunk)
    .on('end', () => {
      data = data.split('&');
      const password = data[1].split('=')[1];
      const username = data[0].split('=')[1].toLowerCase();
      const user = users.filter(singleUser => singleUser.username.toLowerCase() === username);
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (compareError, compareResponse) => {
          if (compareError) throw new Error(compareError);
          if (compareResponse) {
            const token = jwt.sign({ username, password, logged_in: true }, process.env.SECRET);
            res.writeHead(200, { 'content-type': 'text/html', 'set-cookie': `token=${token}` });
            res.end('<h1>You are logged in</h1>');
          } else {
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ msg: 'Worng password' }));
          }
        });
      }
    });
};
