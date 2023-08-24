const button = document.querySelector('.b-converter')
const input = document.querySelector('.i-real')
const url =  'https://economia.awesomeapi.com.br/last/'
const coins = 'USD-BRL'
const valorDigitado = document.querySelector('.real') 
const valorDolar = document.querySelector('.dolar')
fetch(url + coins)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            const dolarReal = data.USDBRL

            function pegarValorDoInput(){
                console.log(input.value)
            
                document.getElementById('dol')
                .innerHTML = parseFloat(input.value/dolarReal.bid).toLocaleString('eng',{
                    style: 'currency' ,
                    currency: 'USD'
                })
            }
            
            button.addEventListener('click',pegarValorDoInput)
    
        })

