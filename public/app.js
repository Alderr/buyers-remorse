const TOP_LEVEL_COMPONENTS = [
    '.begin','.results'];

const coins = {
    bitcoin: ['8 Years Ago','4 Years ago','Last Year'],
    bitcoinCash:['5 Months ago','2 Months ago','Yesterday'],
    Ethereum:['2 Years ago', '1 Year ago', '6 Months ago'],
    Ripple: ['5 Years ago', '3 Years ago', '1 Year ago']
}
  
  function hideAll() {
    TOP_LEVEL_COMPONENTS.forEach(component => $(`${component}`).hide());
  };

//   function pushDropdown(response) {
//     coins.forEach(function(ans){
        
//         });
//     }


let store = {
    page: 'begin',
    feedback: null
};


if(store.page === 'intro'){
    $('.begin').show();
}else if(store.page === 'answer'){
    $('.results').show();
}