const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement('li');
    li.textContent = taskText;

    const categorySelect = document.createElement('select');

    ['Work', 'Personal', 'Urgent'].forEach(category => {
        const option = document.createElement('option');
        option.textContent = category;
        option.value = category;
        categorySelect.appendChild(option);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
    });

    li.addEventListener('click', (e) => {
        if (e.target !== categorySelect && e.target !== deleteBtn ) {
            li.classList.toggle('completed');
        }
    });

    li.appendChild(categorySelect);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = "";
});


const toggleModeButton = document.getElementById('modeToggle');

toggleModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});







