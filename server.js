const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(process.env.PORT || 8080, function () {
  console.log("App is listening!");
});


app.get('/', (req, res) {
  res.send('Home.');
});
