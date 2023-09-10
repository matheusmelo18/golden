const switchElement = document.getElementById("switch-toggle");
const buttonC = document.querySelector('.converter-box');
const buttonS = document.querySelector('.svg-button');
const inputV = document.querySelector('.insert-value-box');
const select1 = document.querySelector('.to-box');
const select2 = document.querySelector('.from-box');
var autoMode = false;


const url = 'https://v6.exchangerate-api.com/v6/2b28f847f6610668cfba5704/latest/'



function fetchAndConvert() {
    const coins = select1.value;


    fetch(url + coins)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            const coin =  select2.value;
            const conversao = data.conversion_rates[coin];

            document.getElementById('v-convert').innerHTML = parseFloat(inputV.value / conversao).toLocaleString('en', {
                style: 'currency',
                currency: select1.value
            });
        });
};



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

            document.getElementById('v-convert').innerHTML = parseFloat(inputV.value / conversao).toLocaleString('en', {
                style: 'currency',
                currency: select1.value
            });
            
        });
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








