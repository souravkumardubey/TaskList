// define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// load all event listeners

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);
    // add task event
    form.addEventListener('submit',addTask);
    // remove a particular task
    taskList.addEventListener('click',removeTask);
    // clear all task
    clearBtn.addEventListener('click',clearTasks);
    // filter through elements
    filter.addEventListener('keyup',filterTasks);

}

// add task function
function addTask(e) {

    if ( taskInput.value === '' ) {
        alert('Add a task');
        return;
    }

    // create li element

    const li = document.createElement('li');
    li.className = 'collection-item'

    // create text-node and append to the li

    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    // icon HTML
    link.innerHTML = '<i class = "fa fa-remove" ></i>';

    // append the link to the li
    li.appendChild(link);
    // console.log(li);

    // append li to the ul
    taskList.appendChild(li);

    // Store in local storage

    storeTasksInLocalStorage(taskInput.value); 

    // clear input
    taskInput.value = '';
    e.preventDefault();
}

// Store in Local Storage

function storeTasksInLocalStorage(task) {
    let tasks;
    if ( localStorage.getItem('tasks') === null ) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// get tasks from LS 

function getTasks() {
    let tasks;
    if ( localStorage.getItem('tasks') === null ) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task){
        // create li element

        const li = document.createElement('li');
        li.className = 'collection-item'

        // create text-node and append to the li

        li.appendChild(document.createTextNode(task));

        // create new link element

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        // icon HTML
        link.innerHTML = '<i class = "fa fa-remove" ></i>';

        // append the link to the li
        li.appendChild(link);
        // console.log(li);

        // append li to the ul
        taskList.appendChild(li);

    })

}

// remove task

function removeTask(e) {
    // console.log("hello");

    if ( e.target.parentElement.classList.contains('delete-item') ) {
        
        if ( confirm("Are you sure ?") ) {
            
            e.target.parentElement.parentElement.remove();

            // remove from LS

            removeTaskFromLocalStorage(e.target.parentElement.parentElement
            );

        }

    }

}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if ( localStorage.getItem('tasks') === null ) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task , index){
        if ( taskItem.textContent == task ) {
            tasks.splice(index,1)
        }
    })

    localStorage.setItem('tasks',JSON.stringify(tasks));

}

function clearTasks() {
    
    // taskList.innerHTML = ''; //short way

    // const toDelete = document.getElementsByClassName('collection');
    // console.log(toDelete);
    // toDelete.remove();

    // faster
    // console.log(taskList);
    while ( taskList.firstChild ) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear tasks from LS

    clearTasksFromLocalStorage();

}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// filter tasks

function filterTasks(e) {
    
    const text = e.target.value.toLowerCase();
    const itemTasks = document.querySelectorAll('.collection-item');

    itemTasks.forEach(function(task){

        const item = task.firstChild.textContent;

        if ( item.toLowerCase().indexOf(text) != -1 ) {

            task.style.display = 'block';

        } else {

            task.style.display = 'none';

        }

    });

}


