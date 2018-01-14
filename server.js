const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(process.env.PORT || 8080, function () {
  console.log("App is listening!");
});


app.get('/', (req, res) => {
  res.status(200).end();
});

app.get('/json', (req, res) => {
  res.json({word: 'json'});
});

module.exports = app;
