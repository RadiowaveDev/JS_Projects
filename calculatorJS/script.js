//Seleccionar nodos del HTML document
const displayPreviousValue = document.getElementById('previous-value');
const displayCurrentValue = document.getElementById('current-value');
const btnNumbers = document.querySelectorAll('.number');
const btnOperators = document.querySelectorAll('.operator');

const display = new Display(displayPreviousValue,displayCurrentValue);

//addEventListener a cada boton de numeros
btnNumbers.forEach(button =>{
    button.addEventListener('click',()=>{
        display.addNumber(button.innerHTML);
    })
});

//addEventListener para los botones de operadores
btnOperators.forEach(button =>{
    button.addEventListener('click',()=>display.compute(button.value))
});
