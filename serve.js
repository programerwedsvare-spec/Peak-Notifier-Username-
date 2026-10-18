const express = require('express');
const app = express();

app.use(express.text({ type: '*/*', limit: '1mb' }));

const usernames = new Set();

app.get('/usernames', (req, res) => {
  res.type('text/plain').send([...usernames].join('\n'));
});

app.post('/usernames', (req, res) => {
  let body = req.body;

  if (Buffer.isBuffer(body)) body = body.toString('utf8');
  if (typeof body !== 'string') body = '';

  const name = body.trim();

  if (name && /^[A-Za-z0-9_]{3,20}$/.test(name)) {
    usernames.add(name);
  }

  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.type('text/plain').send('Peak Notifier usernames API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[Peak Notifier API] Running on port ${PORT}`);
});
