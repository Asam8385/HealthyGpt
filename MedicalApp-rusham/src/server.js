const express = require('express');
const cors = require('cors');
const chatRouter = require('./routes/chat');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/chat', chatRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = app;