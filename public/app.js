'use strict';

const TOP_LEVEL_COMPONENTS = [
    '.coin', '.homepage', '.form', '.start'
];

let store = {
    page: 'start',
    currentCoin: null,
    coinDate: null,
    selectedCoin: null,
    investments: null
};

function hideAll() {
    TOP_LEVEL_COMPONENTS.forEach(component =>
        $(`${component}`).hide());
}

function render() {
    hideAll();
    if (store.page === 'start') {
        $('.start').show();
        $('.coin').hide();
        $('.homepage').hide();
        $('.form').hide();
    } else if (store.page === 'coin') {
        $('.start').hide();
        $('.homepage').hide();
        $('.coin').show();
        $('.form').hide();
    } else if (store.page === 'form') {
        $('.start').hide();
        $('.homepage').hide();
        $('.coin').hide();
        $('.form').show();
    } else if (store.page === 'homepage') {
        $('.start').hide();
        $('.homepage').show();
        $('.coin').hide();
        $('.form').hide();
    }
}
render();

$('.homepage').on('click', 'option', function(event){
    store.selectedCoin = event.currentTarget.value;
    const filteredInvestments = store.investments.filter(investment => investment.coinName === store.selectedCoin);
    if(store.selectedCoin === ''){
        $('.results').html(divCreator(store.investments));
    }else{
        $('.results').html(divCreator(filteredInvestments));
    }
})

function divCreator(data) {
    let div = '';
    for (let i = 0; i < data.length; i++) {
        let item = data[i];

        div += `<div class="coinDiv">You Invested:$${item.investmentAmount} in ${item.coinAmount} ${item.coinName}  on ${item.date.substring(0,10)}<button id="update" value="${item.coinName} ${item.id}">update</button><button id="delete" value="${item.coinName} ${item.id}">delete</button></div>`;

    }
    return '<br><button id="deleteAll">Delete all entries</button><br><br>' + div;
}

$('.coin').on('click', 'div', function (event) {
    if (event.target.attributes.name.nodeValue === 'BTC') {
        console.log('BTC');
        store.currentCoin = 'BTC';
        store.coinDate = '2009-01-09';
    } else if (event.target.attributes.name.nodeValue === 'BCH') {
        console.log('BCH');
        store.currentCoin = 'BCH';
        store.coinDate = '2017-08-01';
    } else if (event.target.attributes.name.nodeValue === 'ETH') {
        console.log('ETH');
        store.currentCoin = 'ETH';
        store.coinDate = '2015-07-30';
    } else if (event.target.attributes.name.nodeValue === 'XRP') {
        console.log('XRP');
          store.currentCoin = 'XRP';
        store.coinDate = '2017-04-14';
    }
});

$('body').on('click', '#homepage', (apiGet) => {
    store.page = 'homepage';
    let getUrl = 'https://remorse.glitch.me/v3/investments';
    let getting = $.getJSON(getUrl, (data) => {
        console.log(data);
    });
    getting.done(function (data) {
        store.investments = data;
        // $('.homepage').html(divCreator(data));
    });
    render();
});

$('body').on('click', '#delete', (apiDelete) => {

    var row = $(apiDelete.currentTarget).closest('div');

    let value = apiDelete.currentTarget.value.split(' ');

    console.log(value);

    let deleteUrl = `https://remorse.glitch.me/v3/investments/${value[0]}/${value[1]}`;

    $.ajax({
        url: deleteUrl,
        type: 'DELETE',
        success: function (result) {
            alert('This entry has been deleted');
            row.remove();
            render();
        }
    });

});

$('body').on('click', '#update', (apiUpdate) => {

    var row = $(apiUpdate.currentTarget).closest('div');

    let value = apiUpdate.currentTarget.value.split(' ');

    console.log(value);
    console.log('Update handler worked.');
    let updateUrl = `https://remorse.glitch.me/v3/investments/${value[0]}/${value[1]}`;

    // $.ajax({
    //     url: updateUrl,
    //     type: 'PUT',
    //     success: function (result) {
    //         alert('This entry has been updated');
    //         render();
    //     }
    // });

});

$('body').on('click', '#deleteAll', (apiDeleteall) => {
    let deleteUrl = 'https://remorse.glitch.me/v3/investments';

    $.ajax({
        url: deleteUrl,
        type: 'DELETE',
        success: function (result) {
            alert('All entries have been deleted');
            $('.homepage').empty();
            store.page = 'start';
            render();
        }
    });

});

$('body').on('click', '.submit', (event) => {
    // event.preventDefault();
    console.log(store.page);
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
            <input class ="submit" type="submit" value="Add to your portfolio">
            </form> `);
    } else if (store.page === 'homepage') {
        store.page = 'start';
    }
    render();
});
//is for when a user adds a new investment
$('.form').submit(function (event) {

    event.preventDefault();
    store.page = 'homepage';

    let $form = $(this),
        amt = $form.find('input[name=\'investmentAmount\']').val(),
        bought = $form.find('input[name=\'Buy Price\']').val(),
        date = $form.find('input[name=\'date\']').val(),
        postUrl = 'https://remorse.glitch.me/v3/investments';

    let posting = $.post(postUrl, {
        'coinName': store.currentCoin,
        'investmentAmount': amt,
        'date': date,
        'previousValue': bought
    });

    posting.done(function (data) {
        console.log(data);
    });

    render();
    //when user added investments; they didnt see them on the screen till they went Back
    //& pressed homepage
    // let getUrl = 'https://remorse.glitch.me/v3/investments';
    // let getting = $.getJSON(getUrl, (data) => {
    //     store.investments = data;
    // });

    // getting.done(function (data) {
    //     $('.homepage').html(divCreator(data));
    //     render();
    // });


});
