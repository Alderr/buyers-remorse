const rp = require('request-promise');

var options = {
    method: 'GET',
    uri: 'https://rest.coinapi.io/v1/assets',
    headers: {
        'User-Agent': 'Request-Promise',
        'X-CoinAPI-Key': '73034021-0EBC-493D-8A00-E0F138111F41'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.log(err);
    });
