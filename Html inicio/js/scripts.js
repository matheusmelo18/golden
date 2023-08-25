const button = document.querySelector('.b-converter');
const inputV = document.querySelector('.i-real');
const inputC1 = document.querySelector('.moeda1');
const inputC2 = document.querySelector('.moeda2');
const select1 = document.querySelector('.moedas');
const select2 = document.querySelector('.moedas2');

const url = 'https://economia.awesomeapi.com.br/last/';

button.addEventListener('click', function() {
    const coins = select1.value + '-' + select2.value;

    fetch(url + coins)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const coin = select1.value + select2.value;
            const conversao = data[coin];

            document.getElementById('dol').innerHTML = parseFloat(inputV.value / conversao.bid).toLocaleString('en', {
                style: 'currency',
                currency: select1.value
            });
        });
});

