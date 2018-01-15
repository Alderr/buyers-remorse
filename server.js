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

app.get('/json', (req, res) => {
    res.json({word: 'json'});
});

app.get('/testCoin', (req, res) => {
    var options = {
        'method': 'GET',
        'hostname': 'rest.coinapi.io',
        'path': '/v1/assets',
        'headers': {'X-CoinAPI-Key': '73034021-0EBC-493D-8A00-E0F138111F41'}
    };

    var chunks = [];
    var request = https.request(options, function (response) {
        response.on('data', function (chunk) {
            chunks.push(chunk);
            console.log(chunk);
        });
    });

    request.end();

    res.send(chunks);
});

module.exports = app;
