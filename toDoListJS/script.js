const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");

//Contenedor de tareas
const taskContainer = document.getElementById("taskContainer");

const setDate = () =>{
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es',{day:'numeric'});
    dateText.textContent = date.toLocaleString('es',{weekday:'long'});
    dateMonth.textContent = date.toLocaleString('es',{month:'long'});
    dateYear.textContent = date.toLocaleString('es', {year: 'numeric'});
};

const addNewTask = event => {
    event.preventDefault();
    //se toma el input del taskText como value
    const { value } = event.target.taskText;
    if(!value) return;

    const task = document.createElement('div');
    task.classList.add('task','roundBorder');

    const text = document.createElement('p');
    text.innerText=value;
    task.appendChild(text); 
    
    const icons = document.createElement('div');
    icons.classList.add('icons');

    let complete = document.createElement('i');
    complete.classList.add('bi','bi-check-circle-fill','icon-complete');   
    let erase = document.createElement('i');
    erase.classList.add('bi','bi-trash3-fill','icon-erase');

    icons.append(complete,erase);
    task.appendChild(icons);
    
    complete.addEventListener('click',changeTaskState);
    erase.addEventListener('click',eraseTask);

    taskContainer.prepend(task);
    event.target.reset();

};

//Cambio de class al elemento Task de done a toDo
const changeTaskState = event => {
    event.stopPropagation();
    const task = event.target.closest('.task');
    task.classList.toggle('done');   
}

//Elimina el task del elemento taskContainer
const eraseTask = event =>{
    event.stopPropagation();
    const task = event.target.closest('.task');
    task.remove(); 
}

const order = () => {
    const done = [];
    const toDo = [];
    //Childnodes
    taskContainer.childNodes.forEach (el => {
        el.classList.contains('done')? done.push(el) : toDo.push(el) ;
    })
    return  [...toDo, ...done];
}

const renderOrderedTasks = () => {
    order().forEach(el => taskContainer.appendChild(el));
}

setDate();