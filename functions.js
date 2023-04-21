import { taskInput, taskList } from './constants.js';

export function showPosts() {
    // оголошуємо змінну яка буде використовуватись для списку завдань
    let tasks;

    // перевіряємо чи є у localStorage вже якісь завдання
    if (localStorage.getItem('tasks') !== null) {
        // якщо вони там є - витягуємо їх і присвоюємо змінній
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        // якщо їх там нема - присвоюємо змінній значення порожнього масиву
        tasks = []
    }

    // для кожної задачі яка є
    tasks.forEach((task) => {
        // створюємо елемент списку
        const li = document.createElement('li');
        // додаємо йому класс
        li.classList.add('task');
        // всередині цього елементу списку додаємо опис завдання
        li.innerHTML = task;

        // сторюємо кнопку для видалення
        const button = document.createElement('div');
        // додаємо їй клас
        button.classList.add('remove-task');
        // всередину кнопку додаємо значення х
        button.innerHTML = 'x';
        // записуємо кнопку після всього, що є всередині елементу списку
        li.append(button);
        
        // записуємо цей елемент в кінець списку
        taskList.append(li);
    })
}

// створюємо таску
export function addTask(event) {
    // зупиняємо поведінку браузера за замовчуванням
    event.preventDefault();
    // отримуємо значення з інпута taskInput
    const value = taskInput.value;

    // якщо значення в інпуті порожнє  - то не додаємо нове завдання
    if (value.trim() === '') {
        return null;
    }

    // створюємо елемент списку
    const li = document.createElement('li');
    // додаємо йому класс
    li.classList.add('task');
    // всередині цього елементу списку додаємо опис завдання
    li.innerHTML = value;

    // сторюємо кнопку для видалення
    const button = document.createElement('div');
    // додаємо їй клас
    button.classList.add('remove-task');
    // всередину кнопку додаємо значення х
    button.innerHTML = 'x';
    // записуємо кнопку після всього, що є всередині елементу списку
    li.append(button);
    
    // записуємо цей елемент в кінець списку
    taskList.append(li);

    // викликаємо функцію яка буде додавати завдання до Local Storage
    storeTasksInLocalStorage(value);
    // очищуємо вміст інпуту для створення завдання
    taskInput.value = '';
}

function storeTasksInLocalStorage(task) {
    // оголошуємо змінну яка буде використовуватись для списку завдань
    let tasks;

    // перевіряємо чи є у localStorage вже якісь завдання
    if (localStorage.getItem('tasks') !== null) {
        // якщо вони там є - витягуємо їх і присвоюємо змінній
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        // якщо їх там нема - присвоюємо змінній значення порожнього масиву
        tasks = []
    }

    // додаємо до списку нове завдання
    tasks.push(task);

    // зберігаємо список завданнь в Local Storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// видалити якусь конкретну таску
export function deleteTask(event) {
    // якщо ми клікнули по хрестику  - тоді
    if (event.target.classList.contains('remove-task')) {
        // пересвідчуємось чи юзер справді хоче видалити цей елемент
        if(confirm('Ви впевнені що хочете видалити цей елемент?')) {
            // видаляємо цей елемент списку, в якому знаходиться хрестик
            event.target.parentElement.remove();
            // викликаємо функцію яка буде видаляти завдання з Local Storage
            removeTaskFromLocalStorage(event.target.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskElement) {
   // оголошуємо змінну яка буде використовуватись для списку завдань
   let tasks;

   // перевіряємо чи є у localStorage вже якісь завдання
   if (localStorage.getItem('tasks') !== null) {
       // якщо вони там є - витягуємо їх і присвоюємо змінній
       tasks = JSON.parse(localStorage.getItem('tasks'));
   } else {
       // якщо їх там нема - присвоюємо змінній значення порожнього масиву
       tasks = []
   }

   // фільтруємо таски і повертаємо ті, які проходять умову
    const filteredTasks = tasks.filter((task) => {
        if(task !== taskElement.firstChild.textContent) {
            return task
        }
    })

    // запусиємо нові задачі в Local Storage
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

// видалити всі таски
export function removeAllTasks() {
    if(confirm('Ви впевнені що хочете видалити всі елементи?')) {
        // видаляємо весь контент всередині списку
        taskList.innerHTML = '';
        // видалити всі елементи з Local Storage
        removeAllTaskFromLocalStorage();
    }
}

function removeAllTaskFromLocalStorage() {
    // чистимо Local Storage
    localStorage.clear()
}

export function filterTasks(event) {
    // отримуємо всі елементи списку
    const itemList = document.querySelectorAll('.task');
    // отримуємо значення інпуту "Пошук завдань" і робимо його в нижньому регістрі
    const searchQuery = event.target.value.toLowerCase();

    // проходимось по кожному елементу завдань
    itemList.forEach((item) => {
        // отримуємо текст завдання
        const itemValue = item.firstChild.textContent.toLowerCase();
        
        // перевіряємо чи текст завдання має в собі значення інпута "Пошук завдань"
        if (itemValue.includes(searchQuery)) {
            item.classList.remove('hidden');
            // якщо має, то display = list-item
            // item.style.display = 'flex';
        } else {
            // якщо ні - ховаємо це елемент списку
            item.classList.add('hidden');
            // item.style.display = 'none';
        }
    })
}