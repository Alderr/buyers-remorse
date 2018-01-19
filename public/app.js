'use strict';

const TOP_LEVEL_COMPONENTS = [
    '.coin', '.homepage', '.form', '.start'
];

let store = {
    page: 'start',
    currentCoin: null,
    state: null, //add or update
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
    }

    else if (store.page === 'coin') {
        $('.start').hide();
        $('.homepage').hide();
        $('.coin').show();
        $('.form').hide();
    }

    else if (store.page === 'form') {
        $('.start').hide();
        $('.homepage').hide();
        $('.coin').hide();
        $('.form').show();
    }

    else if (store.page === 'homepage') {

        let getUrl = 'https://remorse.glitch.me/v3/investments';

        let getting = $.getJSON(getUrl, (data) => {
            console.log(data);
            store.investments = data;

            const filteredInvestments = store.investments.filter(investment => investment.coinName === store.selectedCoin);
            console.log(store.selectedCoin);
            if(store.selectedCoin === '' || store.selectedCoin === null) {
                console.log('selectedCoin is empty');
                $('.results').html(divCreator(store.investments));
            }

            else {
                $('.results').html(divCreator(filteredInvestments));
            }

            $('.start').hide();
            $('.homepage').show();
            $('.coin').hide();
            $('.form').hide();

        });


    }


}

$('.homepage').on('change', function(event){

    console.log('change event triggered!') ;

    store.page = 'homepage';
    store.selectedCoin = event.target.value;
    console.log(store.selectedCoin);
    render();
});

function divCreator(data) {
    console.log('divCreator!!');
    let div = '',
        totalXRPCash = 0,
        totalXRP = 0,
        totalXRPProfit = 0,
        totalXRPInvested = 0,
        totalBTCCash = 0,
        totalBTC = 0,
        totalBTCProfit = 0,
        totalBTCInvested = 0,
        totalBCHCash = 0,
        totalBCH = 0,
        totalBCHProfit = 0,
        totalBCHInvested = 0,
        totalETHCash = 0,
        totalETH = 0,
        totalETHProfit = 0,
        totalETHInvested = 0,
        totalProfit = 0;



    for (let i = 0; i < data.length; i++) {
        console.log(i);
        let item = data[i];
        // console.log(item);
        div += `<div>You Invested:$${item.investmentAmount} in ${item.coinAmount} ${item.coinName}  on ${item.date}<button id="update" value="${item.coinName} ${item.id} ${item.investmentAmount} ${item.previousValue} ${item.date}. Your profit/Loss if you sold now would be $${totalProfit}">update</button><button id="delete" value="${item.coinName} ${item.id}">delete</button></div>`;
        let gainLoss = item.investmentAmount - parseInt(item.investmentAmountNow);
        totalProfit += gainLoss

        if(item.coinName === 'XRP'){
            totalXRPInvested += item.investmentAmount;
            totalXRPCash += gainLoss;
            totalXRP += item.coinAmount;
            totalXRPProfit += parseInt(item.investmentAmountNow);
            console.log('found xrp');
            console.log(item.coinAmount);
            console.log('total: ' + totalXRP);
        }else if(item.coinName === 'BTC'){
            totalBTCInvested += item.investmentAmount;
            totalBTCCash += gainLoss;
            totalBTC += item.coinAmount;
            totalBTCProfit += parseInt(item.investmentAmountNow);
            console.log('found btc');
            console.log(item.coinAmount);
            console.log('total: ' + totalETH);
        }else if(item.coinName === 'BCH'){
            totalBCHInvested += item.investmentAmount;
            totalBCHCash += gainLoss;
            totalBCH += item.coinAmount;
            totalBCHProfit += parseInt(item.investmentAmountNow);
            console.log('found bch');
            console.log(item.coinAmount);
            console.log('total: ' + totalETH);
        }else if(item.coinName === 'ETH'){
            totalETHInvested += item.investmentAmount;
            totalETHCash += gainLoss;
            totalETH += item.coinAmount;
            totalETHProfit += parseInt(item.investmentAmountNow);
            console.log('found eth');
            console.log(item.coinAmount);
            console.log('total: ' + totalETH);
        }

    }

    let XRP = totalXRP.toFixed(2);
    let BTC = totalBTC.toFixed(2);
    let BCH = totalBCH.toFixed(2);
    let ETH = totalETH.toFixed(2);

    if(store.selectedCoin === 'XRP')
    {
        return '<br><button id="deleteAll">Delete all entries</button><br><br>' +`<p>Current Worth:$${totalXRPProfit}</p> <p>Profit/Loss: $ ${totalXRPCash}   Total Investment: $ ${totalXRPInvested}</p>` +  `<p>Total XRP:${XRP}</p>` + div;
    }

    else if(store.selectedCoin === 'BTC')
    {
        return '<br><button id="deleteAll">Delete all entries</button><br><br>' +`<p>Current Worth:$${totalBTCProfit}</p> <p>Profit/Loss: $ ${totalBTCCash}   Total Investment: $ ${totalBTCInvested}</p>` +  `<p>Total BTC: ${BTC}</p>` + div;
    }

    else if(store.selectedCoin === 'BCH')
    {
        return '<br><button id="deleteAll">Delete all entries</button><br><br>' +`<p>Current Worth:$${totalBCHProfit}</p> <p>Profit/Loss: $ ${totalBCHCash}   Total Investment: $ ${totalBCHInvested}</p>` +  `<p>Total BCH:${BCH}</p>` + div;
    }

    else if(store.selectedCoin === 'ETH')
    {
        return '<br><button id="deleteAll">Delete all entries</button><br><br>' +`<p>Current Worth:$${totalETHProfit}</p> <p>Profit/Loss: $ ${totalETHCash}   Total Investment: $ ${totalETHInvested}</p>` +  `<p>Total ETH:${ETH}</p>` + div;
    }

    else if(store.selectedCoin === '')
    {
        return '<br><button id="deleteAll">Delete all entries</button><br><br>' +`<p>Total Profit: $${totalProfit}</p>` +  `<p>Total BTC: ${BTC}  Total ETH:${ETH}   Total BCH:${BCH}   Total XRP:${XRP}</p>` + div;
    }

    return '<br><button id="deleteAll">Delete all entries</button><br><br>' +`<p>Total Profit: $${totalProfit}</p>` +  `<p>Total BTC: ${BTC}  Total ETH:${ETH}   Total BCH:${BCH}   Total XRP:${XRP}</p>` + div;
}

function oldDivCreator(data) {
    console.log('divCreator!!');
    let div = '';
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        console.log(item);
        div += `<div>You Invested:$${item.investmentAmount} in ${item.coinAmount} ${item.coinName}  on ${item.date}<button id="update" value="${item.coinName} ${item.id} ${item.investmentAmount} ${item.previousValue} ${item.date}">update</button><button id="delete" value="${item.coinName} ${item.id}">delete</button></div>`;

    }

    return '<br><button id="deleteAll">Delete all entries</button><br><br>' + div;
}

$('.coin').on('click', 'div', function (event) {

    store.state = 'add';

    if (event.target.attributes.name.nodeValue === 'BTC') {
        console.log('BTC');
        store.currentCoin = 'BTC';
        store.coinDate = '2009-01-09';
    }

    else if (event.target.attributes.name.nodeValue === 'BCH') {
        console.log('BCH');
        store.currentCoin = 'BCH';
        store.coinDate = '2017-08-01';
    }

    else if (event.target.attributes.name.nodeValue === 'ETH') {
        console.log('ETH');
        store.currentCoin = 'ETH';
        store.coinDate = '2015-07-30';
    }

    else if (event.target.attributes.name.nodeValue === 'XRP') {
        console.log('XRP');
        store.currentCoin = 'XRP';
        store.coinDate = '2017-04-14';
    }

});

$('body').on('click', '#homepage', (apiGet) => {
    console.log('home page button!');
    store.page = 'homepage';
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
    console.log('clicked updated button');
    var row = $(apiUpdate.currentTarget).closest('div');

    let value = apiUpdate.currentTarget.value.split(' ');


    console.log('Update handler worked.');

    let [coinName, id, investmentAmount, previousValue, date] = value;
    let updateUrl = `https://remorse.glitch.me/v3/investments/${coinName}/${id}`;

    store.page = 'form';
    store.state = 'update';

    if (coinName === 'BTC') {
        console.log('BTC');
        store.currentCoin = 'BTC';
        store.coinDate = '2009-01-09';
    } else if (coinName === 'BCH') {
        console.log('BCH');
        store.currentCoin = 'BCH';
        store.coinDate = '2017-08-01';
    } else if (coinName === 'ETH') {
        console.log('ETH');
        store.currentCoin = 'ETH';
        store.coinDate = '2015-07-30';
    } else if (coinName === 'XRP') {
        console.log('XRP');
        store.currentCoin = 'XRP';
        store.coinDate = '2017-04-14';
    }
    store.selectedCoinId = id;
    //define(['moment'], function (moment) { console.log(moment().format('LLLL')); // 'Friday, June 24, 2016 1:42 AM' });

    $('.form').html(
        `<form>
        Initial Investment:<br>
        <input type="number" name="investmentAmount" step='.01' required value=${investmentAmount}><br>
        Value at time of purchase:<br>
        <input type="number" min="0" name="Buy Price" step='.01' required value=${previousValue}><br>
        Date:<br>
        <input type="date" name="date" min= ${store.coinDate} max=${moment().format('YYYY-MM-DD')} value=${date.substring(0,10)} required><br>
        <br>
        <input class ="submit" type="submit" value="Add to your portfolio">
        </form> `);

    render();

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
            <input type="number" name="investmentAmount" step='.01' required placeholder="Exchange"><br>
            Value at time of purchase:<br>
            <input type="number" min="0" name="Buy Price"  step='.01' required placeholder="Buy Price"><br>
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
        date = $form.find('input[name=\'date\']').val();


    if (store.state === 'add'){

        console.log('adding');

        let postUrl = 'https://remorse.glitch.me/v3/investments';

        let posting = $.post(postUrl, {
            'coinName': store.currentCoin,
            'investmentAmount': amt,
            'date': date,
            'previousValue': bought
        });

        posting.done(function (data) {
            console.log(data);
            render();
        });

    }

    else if (store.state === 'update') {
        console.log('false');

        let updateUrl = `https://remorse.glitch.me/v3/investments/${store.currentCoin}/${store.selectedCoinId}`;

        let updating = $.ajax({
            type: 'PUT',
            url: updateUrl,
            data: {
                'coinName': store.currentCoin,
                'investmentAmount': amt,
                'date': date,
                'previousValue': bought
            }});

        updating.done(function (data) {
            console.log(data);
            render();

        });

        updating.fail( function (data) {
            console.log('updating fail!');
        });

    }




});

//START project
render();
