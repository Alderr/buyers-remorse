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
    page: 'start',
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
    if (store.page === 'start') {
        $('.start').show();
        $('.begin').hide();
        $('.results').hide();
        $('.form').hide();
    } else if (store.page === 'begin') {
        $('.start').hide();
        $('.results').hide();
        $('.begin').show();
        $('.form').hide();
    } else if (store.page === 'form') {
        $('.start').hide();
        $('.results').hide();
        $('.begin').hide();
        $('.form').show();
    } else if (store.page === 'results') {
        $('.start').hide();
        $('.results').show();
        $('.begin').hide();
        $('.form').hide();
    }
}
render();

$('#coin').click(function (event) {
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

function success1(data) {
    console.log(data)
}

// moment(store.coinArray).fromNow().format('YYYY_MM_DD');

$('.submit').click(() => {
    $.getJSON(
        `https://remorse.glitch.me/v1/profit?investmentAmount=100&coinName=${store.currentCoin}&date=2017_02_13`, success1
    )
    if (store.page === 'start') {
        store.page = 'begin'
    } else if (store.page === 'begin') {
        store.page = 'form'
    } else if (store.page === 'form') {
        console.log(store.page)
        store.page = 'results'
    } else if (store.page === 'results') {
        store.page = 'start';
    }
    render();
})