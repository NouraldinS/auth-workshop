module.exports = (err, req, res) => {
  res.writeHead(500, { 'content-type': 'text/html' });
  res.end('<h1>Error 500: Internal Server Error');
};
