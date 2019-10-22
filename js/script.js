const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const filters$ = document.getElementById("filters");
const input = document.getElementById("input");
const plus = document.querySelector(".plus");

date.textContent = new Date().toLocaleString('en', {weekday: 'long', month: 'short', day: 'numeric'});

const key = 'ks_todo';
let tasks = JSON.parse(localStorage.getItem(key)) || [];
let currentFilter = 'all';

const filters = [
    {
        label: 'All',
        id: 'all'
    },
    {
        label: 'Active',
        id: 'active'
    },
    {
        label: 'Closed',
        id: 'closed'
    },
];
render();

function updateStorage() {
    localStorage.setItem(key, JSON.stringify(tasks));
}

function render() {
    list.innerHTML = tasks.filter((task) => {
        if (currentFilter == 'closed') {
            return task.closed;
        }
        if (currentFilter == 'active') {
            return !task.closed;
        }
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

function addToDo(taskName) {
    if (taskName == '')
        return;
    tasks.push({
        name: taskName,
        closed: false
    });
    updateStorage();
    render();
}

function onToggleStatus(index) {
    tasks.map((task, i) => {
        if (i == index) {
            task.closed = !task.closed;
        }
        return task;
    });
    updateStorage();
    render();
}

function onDelete(index) {
    tasks.splice(index, 1);
    localStorage.removeItem(index);
    updateStorage();
    render();
}

plus.addEventListener('click', (event) => {
    addToDo(input.value);
    input.value = '';
});

function setFilterById(filterId) {
    currentFilter = filterId;
    renderFilter();
    render();
}

function renderFilter() {
    filters$.innerHTML = filters.map((filter) => {
        const activeClass = currentFilter === filter.id
            ? 'active'
            : '';

        return `
                <li class="nav-item">
                <a class="nav-link ${activeClass}" href="#" onclick="setFilterById('${filter.id}')">
                ${filter.label}
                </a>
                </li>
                `;
    }).join('');
}
renderFilter();
