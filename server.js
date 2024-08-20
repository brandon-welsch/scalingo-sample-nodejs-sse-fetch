const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let counter = 0;

  const sendEvent = () => {
    counter++;
    const data = JSON.stringify({ message: `Counter: ${counter}` });
    res.write(`data: ${data}\n\n`);
  };

  const intervalId = setInterval(sendEvent, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
