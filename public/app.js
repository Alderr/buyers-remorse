'use strict'

// let request = new Request();


const TOP_LEVEL_COMPONENTS = [
    '.coin', '.results', '.form', '.start'
];

let store = {
    page: 'start',
    feedback: null,
    currentCoin: null,
    coinDate: null
};


function hideAll() {
    TOP_LEVEL_COMPONENTS.forEach(component =>
        $(`${component}`).hide());
};

function render() {
    hideAll();
    if (store.page === 'start') {
        $('.start').show();
        $('.coin').hide();
        $('.results').hide();
        $('.form').hide();
    } else if (store.page === 'coin') {
        $('.start').hide();
        $('.results').hide();
        $('.coin').show();
        $('.form').hide();
    } else if (store.page === 'form') {
        $('.start').hide();
        $('.results').hide();
        $('.coin').hide();
        $('.form').show();
    } else if (store.page === 'results') {
        $('.start').hide();
        $('.results').show();
        $('.coin').hide();
        $('.form').hide();
    }
}
render();

$('.coin').on('click', 'div', function (event) {
    if (event.target.attributes.name.nodeValue === 'BTC') {
        console.log('Hey');
        store.currentCoin = 'BTC';
        store.coinDate = "2009-01-09";
    } else if (event.target.attributes.name.nodeValue === 'BCH') {
        store.currentCoin = 'BCH';
        store.coinDate = "2017-08-01";
    } else if (event.target.attributes.name.nodeValue === 'ETH') {
        store.currentCoin = 'ETH';
        store.coinDate = "2015-07-30";
    } else if (event.target.attributes.name.nodeValue === 'XRP') {
        store.currentCoin = 'XRP';
        store.coinDate = "2017-04-14";
    }
});

$('body').on('click', '.submit', (event) => {
    // event.preventDefault();
    console.log(store.page)
    if (store.page === 'start') {
        store.page = 'coin';
    } else if (store.page === 'coin') {
        console.log(store.coinDate);
        store.page = 'form';
        $('.form').html(`<form>
            Initial Investment:<br>
            <input type="number" name="investmentAmount" required placeholder="Exchange"><br>
            Value at time of purchase:<br>
            <input type="number" min="0" name="Buy Price" required placeholder="Buy Price"><br>
            Date:<br>
            <input type="date" name="date" min= ${store.coinDate} required><br>
            <br>
            <input class ="submit" type="submit" value="Send Me!">
            </form> `);    
    } else if (store.page === 'results') {
        store.page = 'start';
    }
    render();
})

$(".form").submit(function (event) {

    // Stop form from submitting normally
    event.preventDefault();
    store.page = 'results';
    // Get some values from elements on the page:
    let $form = $(this),
        amt = $form.find("input[name='investmentAmount']").val(),
        bought = $form.find("input[name='Buy Price']").val(),
        date = $form.find("input[name='date']").val(),
        url = 'https://remorse.glitch.me/v3/investment';
    
        console.log(date);

    // Send the data using post
    let posting = $.post(url, {
        "coinName": store.currentCoin, 
        "investmentAmount": amt, 
        "date" : date, 
        "previousValue": bought
        // investmentAmount: amt
    });

    let gettingIt = $.getJSON(url, {

    });

    
    // Put the results in a div
    posting.done(function (data) {
        console.log(data);
        let content = $(data).find("#content");
        $(".results").append(content);
    });
    render();
});
