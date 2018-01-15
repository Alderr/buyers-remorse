const TOP_LEVEL_COMPONENTS = [
    '.begin', '.results'
];

const coins = {
    bitcoin: ['8 Years ago', '4 Years ago', 'Last Year'],
    bitcoinCash: ['5 Months ago', '2 Months ago', 'Yesterday'],
    Ethereum: ['2 Years ago', '1 Year ago', '6 Months ago'],
    Ripple: ['5 Years ago', '3 Years ago', '1 Year ago']
}

let store = {
    page: true,
    feedback: null,
    currentCoin: null,
    coinArray: null
};

function hideAll() {
    TOP_LEVEL_COMPONENTS.forEach(component =>
        $(`${component}`).hide());
};

function render() {
    hideAll();
    if (store.page === true) {
        $('.begin').show();
        $('.results').hide();

    } else if (store.page === false) {
        $('.results').show();
        $('.begin').hide();
    }
}
render();

$('#coin').click(function(event) {
    if (event.target.value === 'BTC') {
        store.currentCoin = 'BTC';
        store.coinArray = coins.bitcoin;
    } else if (event.target.value === 'BCH') {
        store.currentCoin = 'BCH';
        store.coinArray = coins.bitcoinCash;
    } else if (event.target.value === 'ETH') {
        store.currentCoin = 'ETH';
        store.coinArray = coins.Ethereum;
    } else if (event.target.value === 'XRP') {
        store.currentCoin = 'XRP';
        store.coinArray = coins.Ripple;
    }
    $('#select').html(`<option value="option1">${store.coinArray[0]}</option>
    <option value="option2">${store.coinArray[1]}</option>
    <option value="option3">${store.coinArray[2]}</option>`);

});

function success1(data){
    console.log(data)
}

// moment(store.coinArray).fromNow().format('YYYY_MM_DD');

$('.submit').click(() => {
    $.getJSON(
    `https://remorse.glitch.me/v1/profit?investmentAmount=100&coinName=${store.currentCoin}&date=2017_02_13`,success1
      );
  store.page = !store.page;
  render();
})