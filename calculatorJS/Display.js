class Display{
    constructor(displayPreviousValue,displayCurrentValue){
        this.displayCurrentValue = displayCurrentValue;
        this.displayPreviousValue = displayPreviousValue;
        this.calculator = new Calculator();
        this.operatorType = undefined;
        this.currentValue = '';
        this.previousValue = '';
        this.signos={
            add: '+',
            subtract: '-',
            multiply: '*',
            divide: '/',
            equal: '',
        }
    }

    addNumber(number){
        if(number === '.' && this.currentValue.includes('.')) return;
        this.currentValue = this.currentValue.toString()+ number.toString(); //concatena numeros en un string mostrado en display
        this.printValues();
    }

    erase(){
        this.currentValue = this.currentValue.toString().slice(0,-1);
        this.printValues();
    }

    eraseAll(){
        this.currentValue = '';
        this.previousValue = '';
        this.operatorType = undefined;
        this.printValues();
    }

    printValues(){
        this.displayCurrentValue.textContent = this.currentValue;
        //Verifica si hay un operador, si lo hay se muestra correctamente
        const operatorSymbol = this.operatorType ? this.signos[this.operatorType] : "";  //Si operatorType es true entonces 
        //Mostrar el valor previo y el operador
        this.displayPreviousValue.textContent = `${this.previousValue} ${operatorSymbol}`; //Esto es un template literal: `

    }

    calculate(){
        const previousValue=parseFloat(this.previousValue);     //Parsea la string a numero
        const currentValue=parseFloat(this.currentValue);       //Parsea la string a numero

        //pregunta si el valor de la string parseada es un numero
        if(isNaN(currentValue) || isNaN(previousValue)) return;

        this.currentValue=this.calculator[this.operatorType](previousValue,currentValue);

        if (this.operatorType === 'subtract' && previousValue === currentValue) {
            this.currentValue = 0;
        }
    }

    compute(type){
        // Si el tipo de operador no es 'equal', hacer el cálculo antes de cambiar el operador
        if (this.operatorType !== 'equal') {
            this.calculate();
        }
        // Asignar el nuevo operador y actualizar el valor previo
        this.operatorType = type;
        // Si currentValue es vacío, mantener el valor previo como el valor actual
        this.previousValue = this.currentValue || this.previousValue;
        this.currentValue = '';
        this.printValues();
    }

}