const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const plus = document.querySelector(".plus");

date.textContent = new Date().toLocaleString('en', {weekday: 'long', month: 'short', day: 'numeric'});

let tasks = [];
let localtasks = [];
let taskId = 0;

for (let i = 0; i < localStorage.length; i++) {
    localtasks[i] = localStorage.getItem(i);
}

tasks = localtasks.slice();
localtasks.length = 0;

function addToDo(taskName) {
    if (taskName == '')
        return;
    tasks.push({
        name: taskName,
        closed: false
    });
    localStorage.setItem(taskId, JSON.stringify(tasks[taskId]));
    taskId++;
    render();

}

function render() {
    list.innerHTML = tasks.filter((task) => {
        return true;
    }).map((task, i) => {
        const icon = task.closed
            ? 'fa-check-circle'
            : 'fa-circle-thin';
        const line = task.closed
            ? 'lineThrough'
            : '';
        return `<li class="item">
                <i class="fa ${icon} co" onclick="onToggleStatus(${i})"></i>
                <p class="text ${line} value = ${task.name} "> ${task.name} </p>
                <i class="fa fa-trash-o de" job="delete" onclick="onDelete(${i})"></i>
                </li>`;
    }).join('');
}

function onToggleStatus(index) {
    tasks.map((task, i) => {
        if (i == index) {
            task.closed = !task.closed;
        }
        return task;
    });
    render();
}

function onDelete(index) {
    tasks.splice(index, 1);
    localStorage.removeItem(index);
    render();
}

plus.addEventListener('click', (event) => {
    addToDo(input.value);
    input.value = '';
});

// addToDo('Drink coffe');
// addToDo('Eat egges');
