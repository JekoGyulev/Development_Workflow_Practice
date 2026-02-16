const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    createTaskElement(taskText);
    taskInput.value = "";
    saveTasks();
});


const toggleModeButton = document.getElementById('modeToggle');
toggleModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});


function createTaskElement(taskText, savedData = null) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const categorySelect = document.createElement('select');
    ['Work', 'Personal', 'Urgent'].forEach(category => {
        const option = document.createElement('option');
        option.textContent = category;
        option.value = category;
        categorySelect.appendChild(option);
    });


    if (savedData && savedData.category) {
        categorySelect.value = savedData.category;
    }


    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
    });

    const dueInput = document.createElement('input');
    dueInput.type = 'date';
    const today = new Date().toISOString().split('T')[0];
    dueInput.value = savedData && savedData.dueDate ? savedData.dueDate : today;

    updateTaskColor(li, dueInput.value);

    dueInput.addEventListener("change", () => {
        updateTaskColor(li, dueInput.value);
        saveTasks();
    });


    li.addEventListener('click', (e) => {
        if (e.target !== categorySelect && e.target !== deleteBtn && e.target !== dueInput) {
            li.classList.toggle('completed');
            saveTasks();
        }
    });

    if (savedData && savedData.completed) li.classList.add('completed');

    li.appendChild(categorySelect);
    li.appendChild(dueInput);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}


function updateTaskColor(li, dueDate) {
    const today = new Date().toISOString().split('T')[0];
    li.style.color = dueDate < today ? 'red' : '';
}


function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const category = li.querySelector('select').value;
        const dueDate = li.querySelector('input[type="date"]').value;
        const text = li.childNodes[0].textContent;
        tasks.push({
            text,
            category,
            dueDate,
            completed: li.classList.contains('completed')
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

savedTasks.forEach(task => {
    createTaskElement(task.text, task);
});
