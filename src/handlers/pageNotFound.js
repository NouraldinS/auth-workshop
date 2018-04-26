module.exports = (req, res) => {
  res.writeHead(404, { 'content-type': 'text/html' });
  res.end('<h1>Error 404: Page Not Found');
};
