
const buttonC = document.querySelector('.b-converter');
const buttonS = document.querySelector('.b-switch')
const inputV = document.querySelector('.i-real');
const select1 = document.querySelector('.moedas');
const select2 = document.querySelector('.moedas2');


const url = 'https://v6.exchangerate-api.com/v6/2b28f847f6610668cfba5704/latest/'



inputV.addEventListener('input', function() {
    const coins = select1.value;


    fetch(url + coins)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            const coin =  select2.value;
            const conversao = data.conversion_rates[coin];

            document.getElementById('dol').innerHTML = parseFloat(inputV.value / conversao).toLocaleString('en', {
                style: 'currency',
                currency: select1.value
            });
        });
});

buttonS.addEventListener('click', function() {
    const auxIndex = select1.selectedIndex;
    select1.selectedIndex = select2.selectedIndex;
    select2.selectedIndex = auxIndex;
    
    const coins = select1.value;


    fetch(url + coins)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            const coin =  select2.value;
            const conversao = data.conversion_rates[coin];

            document.getElementById('dol').innerHTML = parseFloat(inputV.value / conversao).toLocaleString('en', {
                style: 'currency',
                currency: select1.value
            });
        });
});
function trocarCSS() {
    var link = document.getElementById('css-link');
    if (link.href.endsWith('style.css')) {
        link.href = 'style.css';
    } else {
        link.href = 'style2.css';
    }
}


$(document).ready(function () {
    //change selectboxes to selectize mode to be searchable
       $("select").select2();
    });






