let firstNumber = '';
let secondNumber = '';
let sign = '';
let finish = false;
let outcome = {};
console.log(typeof outcome)

let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
let action = ['-', '+', 'X', '/'];
let rvrs = '+/-';
let percent = '%';
let equals = '=';

let table = document.querySelector("table");
let resultScreen = document.querySelector("output");
document.querySelector(".ac").addEventListener("click", clearAll);
table.addEventListener("click", CalculationWithMouse);
document.addEventListener("keypress", CalculationWithKeyboard);
document.addEventListener("keyup", Backspace);

function CalculationWithMouse(e){
    if (!e.target.classList.contains("btn")){
        return;
    }
    if (e.target.classList.contains("ac")){
        return;
    }

    resultScreen.textContent = '';
    errorDeactivation()
    let inputs = e.target.textContent;
    process(inputs);


}

function CalculationWithKeyboard(e){
    resultScreen.textContent = '';
    let keys = e.key;
    // if (keys === 'Backspace'){
    //     clearAll()
    // }
    errorDeactivation()
    process(keys);
    console.log(keys);
}

function clearAll(){
    firstNumber = '';
    secondNumber = '';
    sign = '';
    finish = false;
    resultScreen.textContent = '0';
    errorDeactivation()
}

function clearPartly(){
    firstNumber = '';
    secondNumber = '';
    sign = '';
    finish = false;
}

function process(values){
    if (values === '*'){
        values = 'X';
    }
    if (values === 'Enter'){
        values = equals;
    }

    if (numbers.includes(values) || action.includes(values) || values === rvrs || values === percent || values === equals){
        if (numbers.includes(values)){
            if (secondNumber === '' && sign === ''){
                if (values === '.' && firstNumber.includes('.')){
                    firstNumber += '';
                    resultScreen.textContent = firstNumber;
                }
                else if (firstNumber === '' && values === '.' || firstNumber === '0' && values !== '.'){
                    firstNumber = '0.';
                    resultScreen.textContent = firstNumber;
                }
                else {
                    firstNumber += values;
                    resultScreen.textContent = firstNumber;
                }
            }
            else if (firstNumber!=='' && secondNumber!=='' && finish){
                secondNumber = values;
                finish = false;
                resultScreen.textContent = secondNumber;
            }
            else {
                if (values === '.' && secondNumber.includes('.')){
                    secondNumber += '';
                    resultScreen.textContent = secondNumber;
                }
                else if (secondNumber === '' && values === '.' || secondNumber === '0' && values !== '.'){
                    secondNumber = '0.';
                    resultScreen.textContent = secondNumber;
                }
                else {
                    secondNumber += values;
                    resultScreen.textContent = secondNumber;
                }
            }
            return;

        }

        if (values === rvrs){
            if (firstNumber !== '' && secondNumber === ''){
                firstNumber = Number(firstNumber) * -1;
                resultScreen.textContent = firstNumber;
            }
            else if (secondNumber !== ''){
                secondNumber = Number(secondNumber) * -1;
                resultScreen.textContent = secondNumber;
            }
            return;
        }

        if (values === percent){
            if (firstNumber !== '' && secondNumber === ''){
                firstNumber = Number(firstNumber) / 100;
                resultScreen.textContent = firstNumber;
            }
            else if (secondNumber !== ''){
                secondNumber = Number(secondNumber) / 100;
                resultScreen.textContent = secondNumber;
            }
        }

        if (action.includes(values) && secondNumber === ''){
            sign = values;
            resultScreen.textContent = values;
            return;
        }
        if (values === equals){
            calc(firstNumber, sign, secondNumber);
            if (outcome.error){
                resultScreen.textContent = 'Error';
                clearPartly()
                errorActivation()
            }
            else {
                firstNumber = outcome.result;
                firstNumber = `${firstNumber}`;
                secondNumber = '';
                finish = true;
                resultScreen.textContent = firstNumber;
                secondNumber = '';
                sign = ''
            }

        }

        if (firstNumber !== '' && secondNumber !== '' && values !== equals){
            calc(firstNumber, sign, secondNumber);
            if (outcome.error){
                resultScreen.textContent = 'Error';
                clearPartly()
                errorActivation()
            }
            else {
                firstNumber = outcome.result;
                firstNumber = `${firstNumber}`;
                finish = true;
                sign = values;
                resultScreen.textContent = firstNumber;
                secondNumber = '';
                sign = ''
            }

        }
    }
}

function calc(firstNumber, sign, secondNumber,){
        if (secondNumber === ''){
            secondNumber = firstNumber;
        }
        outcome = {
            result: 0,
            error: false,
            // a: ''
        }
        switch (sign){
            case '+':
                outcome.result = Number(firstNumber) + Number(secondNumber);
                break;
            case '-':
                outcome.result = Number(firstNumber) - Number(secondNumber);
                break;
            case 'X':
                outcome.result= Number(firstNumber) * Number(secondNumber);
                break;
            case '/':
                if (secondNumber === '0'){
                    outcome.error = true;
                    return;
                }
                else {
                    outcome.result = Number(firstNumber) / Number(secondNumber);
                }

                break;
        }
}

function errorActivation(){
    document.body.classList.add("body-error");

    let div = document.querySelector(".screen");
    div.classList.add('calc-error');

    let container = document.querySelector('.container');
    container.classList.add('container-error');
}

function errorDeactivation(){
    document.body.classList.remove("body-error");

    let div = document.querySelector(".screen");
    div.classList.remove('calc-error');

    let container = document.querySelector('.container');
    container.classList.remove('container-error');
}

function Backspace(e){
    let keys = e.key;
    if (keys === 'Backspace') {
        if (firstNumber !== '' && sign !== '' && secondNumber !== '') {
            secondNumber = secondNumber.slice(0, -1);
            resultScreen.textContent = secondNumber;
            if (secondNumber === ''){
                resultScreen.textContent = sign;
            }
        } else if (firstNumber !== '' && sign !== '' && secondNumber === '') {
            sign = sign.slice(0, -1);
            resultScreen.textContent = firstNumber;
        } else if (firstNumber !== '' && sign === '' && secondNumber === '') {
            firstNumber = firstNumber.slice(0, -1);
            resultScreen.textContent = firstNumber;
            if (firstNumber === ''){
                resultScreen.textContent = '0';
            }

        } else if (firstNumber === '' && sign === '' && secondNumber === ''){
            resultScreen.textContent = '0';
        }
        console.log(firstNumber);
    }
}
