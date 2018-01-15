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
    currentCoin: null
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
        store.currentCoin = coins.bitcoin
    } else if (event.target.value === 'BCH') {
        store.currentCoin = coins.bitcoinCash
    } else if (event.target.value === 'ETH') {
        store.currentCoin = coins.Ethereum
    } else if (event.target.value === 'XRP') {
        store.currentCoin = coins.Ripple
    }
    $('#select').html(`<option value="option1">${store.currentCoin[0]}</option>
    <option value="option2">${store.currentCoin[1]}</option>
    <option value="option3">${store.currentCoin[2]}</option>`);

});

function success1(data){
    console.log(data)
}

$('.submit').click(() => {
    $.getJSON(
    'https://remorse.glitch.me/coinNames',success1
      );
  store.page = !store.page;
  render();
})