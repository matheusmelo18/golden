const switchElement = document.getElementById("switch-toggle");
const buttonC = document.querySelector('.converter-box');
const buttonS = document.querySelector('.svg-button');
var inputV = document.querySelector('.insert-value-box');
const select1 = document.querySelector('.to-box');
const select2 = document.querySelector('.from-box');
const selectq = document.querySelector('.quick-box')
var autoMode = false;


const url = 'https://v6.exchangerate-api.com/v6/7aa6b8fe235ff30eb01826e8/latest/'



function fetchAndConvert() {
    const coins = select1.value;


    

    if (!/^[0-9,.]+$/.test(inputV.value)) {
        alert('Por favor, insira apenas números, ponto ou virgula');
        return;
    }
    
    
    inputV.value = inputV.value.replace("-","")
    inputV.value = inputV.value.replace(",",".")
    parseFloat(inputV.value);
    
    fetch(url + coins)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            
            const coin =  select2.value;
            const newCotacao = data.time_last_update_unix;
            const conversao = data.conversion_rates[coin];
            const inputValue = parseFloat(inputV.value);
            const convertedValue = inputValue / conversao;

            var date = new Date(newCotacao*1000)

            document.getElementById('cota').innerHTML ="Cotação do Dia: "+ date.toLocaleDateString("pt-BR") +" Horas: " +date.toLocaleTimeString("pt-BR") + "<br>";

            function determinarCasasDecimais(valor) {
                const valorAbsoluto = Math.abs(valor);
                if (valorAbsoluto >= 1) {
                    return 2; // Sempre mostra 2 casas decimais para valores maiores ou iguais a 1
                } else {
                    return Math.max(2, Math.ceil(-Math.log10(valorAbsoluto))+1);
                }
            }
            
            const casasDecimais = determinarCasasDecimais(convertedValue);
            const formattedValue = convertedValue.toFixed(casasDecimais);

            document.getElementById('v-convert').innerHTML = parseFloat(formattedValue).toLocaleString('en', {
                style: 'currency',
                currency: select1.value,
                currencyDisplay: 'code',
                maximumFractionDigits: 8
            });
            document.getElementById('to-v').innerHTML = parseFloat(inputV.value).toLocaleString('en', {
                style: 'currency',
                currency: select2.value,
                currencyDisplay: 'code',
                maximumFractionDigits: 8
            })+ " =";
            document.getElementById('t-f').innerHTML = parseFloat(1).toLocaleString('en', {
                style: 'currency',
                currency: select1.value,
                currencyDisplay: 'code',
                maximumFractionDigits: 5
            })+ " = "+parseFloat(conversao).toLocaleString('en', {
                style: 'currency',
                currency: select2.value,
                currencyDisplay: 'code',
                maximumFractionDigits: 5
            });
            document.getElementById('f-t').innerHTML = parseFloat(1).toLocaleString('en', {
                style: 'currency',
                currency: select2.value,
                currencyDisplay: 'code',
                maximumFractionDigits: 5
            })+ " = "+parseFloat(1/conversao).toLocaleString('en', {
                style: 'currency',
                currency: select1.value,
                currencyDisplay: 'code',
                maximumFractionDigits: 5
            }); 
            setFlagByCountryCode2(select1.value);
            setFlagByCountryCode1(select2.value);     
        });
            
};



buttonS.addEventListener('click', function() {
    const auxIndex = select1.selectedIndex;
    select1.selectedIndex = select2.selectedIndex;
    select2.selectedIndex = auxIndex;
    
    fetchAndConvert();
            
});

switchElement.addEventListener('input',function(){
    autoMode = !autoMode;
    console.log('Valor alternado: ' + autoMode);
    
}
)

select1.addEventListener('change', toggleAuto);
select2.addEventListener('change', toggleAuto);
inputV.addEventListener('input', toggleAuto);
switchElement.addEventListener('input',toggleAuto);
switchElement.addEventListener('input',fetchAndConvert);
select1.addEventListener('change', fetchAndConvert);
    select2.addEventListener('change', fetchAndConvert);
    inputV.addEventListener('input', fetchAndConvert);

// Função toggleAuto
function toggleAuto() {
  if (autoMode) {
    switchElement.addEventListener('input',fetchAndConvert);
    select1.addEventListener('change', fetchAndConvert);
        select2.addEventListener('change', fetchAndConvert);
        inputV.addEventListener('input', fetchAndConvert);    

  } else {
    select1.removeEventListener('change', fetchAndConvert);
    select2.removeEventListener('change', fetchAndConvert);
    inputV.removeEventListener('input', fetchAndConvert);
  }
}

buttonC.addEventListener('click', fetchAndConvert);

function trocarCSS() {
    var link = document.getElementById('css-link');
    if (link.href.endsWith('style.css')) {
        link.href = 'style2.css';
    } else {
        link.href = 'style.css';
    }
    var imagem = document.getElementById("logo_l");
            if (imagem.src.endsWith("logo.png")) {
                imagem.src = "logoD.png";
                imagem.alt = "logo 2";
            } else {
                imagem.src = "logo.png";
                imagem.alt = "logo 1";
            }
            

}


function toggleButton() {
    const switchElement = document.getElementById("switch-toggle");
    const botaoElement = document.getElementById("convert");
    botaoElement.disabled = switchElement.checked;
    
}


function minhaFuncao() {
    const dynamicText = document.getElementById('v-convert');
    

    
    
    // Define o tamanho máximo para o tamanho do texto
    const tamanhoMaximo = 60; // Altere para o tamanho máximo desejado
    
    // Calcula o tamanho do texto com base no tamanho do conteúdo

    const tamanhoTexto = tamanhoMaximo - 1.3*dynamicText.textContent.length;
    
    console.log(dynamicText.textContent)
    // Define o tamanho do texto
    dynamicText.style.fontSize = tamanhoTexto + 'px';

    
};

function onDivContentChanged(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // O conteúdo do elemento foi alterado, ação a ser realizada aqui
            console.log('Conteúdo do elemento mudou para:', mutation.target.textContent);
            // Chame sua função aqui, por exemplo:
            minhaFuncao();
        }
    }
}

// Seleciona o elemento que você deseja observar
const targetNode = document.getElementById('v-convert');

// Configura o MutationObserver com a função de callback
const observer = new MutationObserver(onDivContentChanged);

// Configura as opções para observar mudanças no conteúdo do elemento
const config = { childList: true, characterData: true, subtree: true };

// Inicia a observação do elemento alvo
observer.observe(targetNode, config);

function quick1(value) {
    const inputElement = document.getElementById('i-value-box');
    inputElement.value = value.toString();
    
    fetchAndConvert();
}


function setFlagByCountryCode1(countryCode) {
    // Extrai os dois primeiros caracteres da sigla em lowercase
    const countryCodeLower = countryCode.substring(0, 2).toLowerCase();
    
    // Crie o URL da imagem da bandeira com base na sigla do país em lowercase
    const flagImageUrl = `https://flagcdn.com/w160/${countryCodeLower}.png`;

    // Selecione o elemento da bandeira
    const flagElement = document.querySelector('.flag-1');

    // Defina o atributo 'src' do elemento da bandeira com o URL da imagem da bandeira
    flagElement.setAttribute('src', flagImageUrl);
    flagElement.style.display = 'inline';

    // Defina o atributo 'alt' do elemento da bandeira com o nome do país (opcional)
    flagElement.setAttribute('alt', countryCode);
}

function setFlagByCountryCode2(countryCode) {
    // Extrai os dois primeiros caracteres da sigla em lowercase
    const countryCodeLower = countryCode.substring(0, 2).toLowerCase();
    
    // Crie o URL da imagem da bandeira com base na sigla do país em lowercase
    const flagImageUrl = `https://flagcdn.com/w160/${countryCodeLower}.png`;

    // Selecione o elemento da bandeira
    const flagElement = document.querySelector('.flag-2');
    const arrow = document.getElementById('arrow');
    arrow.style.display = 'inline-block';

    // Defina o atributo 'src' do elemento da bandeira com o URL da imagem da bandeira
    flagElement.setAttribute('src', flagImageUrl);
    flagElement.style.display = 'inline';

    // Defina o atributo 'alt' do elemento da bandeira com o nome do país (opcional)
    flagElement.setAttribute('alt', countryCode);
}

function updateCurrencySelects(fromCurrency, toCurrency) {
    // Obtém referências para os elementos <select> pelo ID

    // Define as opções selecionadas nos elementos <select>
    select2.value = fromCurrency;
    select1.value = toCurrency;
    fetchAndConvert();
}

