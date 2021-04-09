window.addEventListener('load', start);

const unidade = {
  0: 'zero',
  1: 'um',
  2: 'dois',
  3: 'três',
  4: 'quatro',
  5: 'cinco',
  6: 'seis',
  7: 'sete',
  8: 'oito',
  9: 'nove'
}

const familiaDez = {
  0: 'dez',
  1: 'onze',
  2: 'doze',
  3: 'treze',
  4: 'quatorze',
  5: 'quinze',
  6: 'dezesseis',
  7: 'dezessete',
  8: 'dezoito',
  9: 'dezenove'
}

const dezena = {
  2: 'vinte',
  3: 'trinta',
  4: 'quarenta',
  5: 'cinquenta',
  6: 'sessenta',
  7: 'setenta',
  8: 'oitenta',
  9: 'noventa'
}

const centena = {
  1: 'cento',
  2: 'duzentos',
  3: 'trezentos',
  4: 'quatrocentos',
  5: 'quinhentos',
  6: 'seiscentos',
  7: 'setecentos',
  8: 'oitocentos',
  9: 'novecentos',
}

function start() {
  let inputUserNumber = document.querySelector('#inputUserNumber');
  let inputCurrentNumber = document.querySelector('#inputCurrentNumber');
  let inputSpellingNumber = document.querySelector('#inputSpellingNumber');
  let response = '';

  inputUserNumber.addEventListener('input', updateSpellingNumber);

  function updateCurrentNumber() {
    inputCurrentNumber.value = inputUserNumber.value;
  }
  
  function updateSpellingNumber() {
    inputSpellingNumber.value = spellingNumber();
  }

  function splitNumber(number){
    let numberSplited = {
      'first': number.substring(0,1),
      'second': number.substring(1,2),
      'third': number.substring(2,3)
    }
    return numberSplited;
  }

  function spellingNumber(){
    let number = inputUserNumber.value;
    let numberSize = inputUserNumber.value.length;
    let splitedNumber = splitNumber(number);

    if(numberSize == 1) {
      response = unidade[number];
    } else if (numberSize == 2) {
      if(number>9 && number<20) {
        response = familiaDez[splitedNumber.second];
      } else if(splitedNumber.second == 0) {
        response = dezena[splitedNumber.first];
      } else {
        response = dezena[splitedNumber.first] + ' e ' + unidade[splitedNumber.second];
      }
    } else if (numberSize == 3){
      if (number == 100) {
        response = 'cem';
      } else {
        if(splitedNumber.second == 0 && splitedNumber.third == 0) {
          response = centena[splitedNumber.first];
        } else if (splitedNumber.second == 0) {
          response = centena[splitedNumber.first] + ' e ' + unidade[splitedNumber.third];
        } else if (splitedNumber.second == 1) {
          response = centena[splitedNumber.first] + ' e ' + familiaDez[splitedNumber.third];
        } else if (splitedNumber.second != 0 && splitedNumber.third == 0) {
          response = centena[splitedNumber.first] + ' e ' + dezena[splitedNumber.second];
        } else {
          response = centena[splitedNumber.first] + ' e ' + dezena[splitedNumber.second] + ' e ' + unidade[splitedNumber.third];
        }
      }
    }
    updateCurrentNumber();
    return response;
  }
}