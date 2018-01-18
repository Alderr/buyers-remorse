const express = require('express');
const app = express();
const https = require('https');

app.use(express.static('public'));

app.listen(process.env.PORT || 8080, function () {
    console.log('App is listening!');
});


app.get('/', (req, res) => {
    res.status(200).end();
});


module.exports = app;
