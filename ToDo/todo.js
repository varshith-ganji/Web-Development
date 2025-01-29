let todos = [];

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}



function addTodo() {
    const input = document.getElementById('todo-input');
    const todoText = input.value.trim();
    const prioritySelect = document.getElementById('priority-select');
    const priority = prioritySelect.value;
    if (todoText && priority) {
        todos.push({
            id: Date.now(),
            text: todoText,
            completed: false,
            priority: priority
        });
        input.value = '';
        prioritySelect.selectedIndex = 0;
        saveTodos();
        renderTodos();
    } else {
        if (!priority) {
            alert('Please select a priority level');
        }
    }
}


function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function toggleComplete(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
}

function editTodo(id) {
    const todoItem = todos.find(todo => todo.id === id);
    const listItem = document.querySelector(`[data-id="${id}"]`);
    const priority = todoItem.priority;

    listItem.innerHTML = `
        <input type="text" class="edit-input" value="${todoItem.text}">
         <select class="edit-priority">
            <option value="low" ${priority === 'low' ? 'selected' : ''}>Low</option>
            <option value="medium" ${priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="high" ${priority === 'high' ? 'selected' : ''}>High</option>
        </select>
        <button onclick="saveEdit(${id})">Save</button>
        <button onclick="renderTodos()">Cancel</button>
    `;
}

function saveEdit(id) {
    const editInput = document.querySelector('.edit-input');
    const editPriority = document.querySelector('.edit-priority');
    const newText = editInput.value.trim();
    const newPriority = editPriority.value;

    if (newText) {
        todos = todos.map(todo =>
            todo.id === id ? { ...todo, text: newText, priority: newPriority } : todo
        );
        saveTodos();
        renderTodos();
    }
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.classList.add(`priority-${todo.priority}`);
        li.dataset.id = todo.id;
        li.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <div>
                <button onclick="toggleComplete(${todo.id})">
                    ${todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button onclick="editTodo(${todo.id})">Edit</button>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}
document.addEventListener('DOMContentLoaded', loadTodos);

function clearAllTodos() {
    todos = [];
    localStorage.removeItem('todos');
    renderTodos();
}