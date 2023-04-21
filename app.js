import { 
    form, 
    clearBtn, 
    filter, 
    taskList 
} from './constants.js';

import {
    showPosts,
    addTask,
    deleteTask,
    removeAllTasks,
    filterTasks
} from './functions.js';

// Workshop - Modules. TODO

// слухачі подій
// запускаємо функцію showPosts коли весь HTML загружений
document.addEventListener('DOMContentLoaded', showPosts);
// запускаємо функцію addTask коли відправляємо форму (клікаємо на кнопку "Додати завдання")
form.addEventListener('submit', addTask);
// запускаємо функцію deleteTask коли клік попадає на список <ul>
taskList.addEventListener('click', deleteTask);
// запускаємо функцію після кліку на кнопку "Видалити всі елементи"
clearBtn.addEventListener('click', removeAllTasks);
// запускаємо функцію filterTasks після того як ввідпускаємо клавішу (тоді, коли фокус в інпуті "Пошук завдань")
filter.addEventListener('keyup', filterTasks);
