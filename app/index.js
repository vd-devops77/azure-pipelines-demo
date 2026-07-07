const express = require('express');

const app = express();

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'zen-demo-app is running', env: process.env.APP_ENV || 'dev' });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`zen-demo-app listening on ${port}`));
}

module.exports = app;
