const taskInput = document.getElementById('taskInput');
const btnAddList = document.getElementById('btnAddList');
const taskContainer = document.querySelector('.taskContainer');

let tasks = [];
let idCounter = 0;

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ id: idCounter++, text, completed: false });
  taskInput.value = '';
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newText = prompt('Edit task:', task.text);
  if (newText !== null && newText.trim()) {
    task.text = newText.trim();
    renderTasks();
  }
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function createTaskElement(task) {
  const todo = document.createElement('div');
  todo.className = 'todo';

  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkBox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => toggleTask(task.id));

  const span = document.createElement('span');
  span.textContent = task.text;
  if (task.completed) {
    span.style.textDecoration = 'line-through';
    span.style.opacity = '0.6';
  }

  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(span);

  const btnsDiv = document.createElement('div');
  btnsDiv.className = 'btns';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'deleteBtn';
  deleteBtn.textContent = 'DELETE';
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  const editBtn = document.createElement('button');
  editBtn.className = 'editBtn';
  editBtn.textContent = 'EDIT';
  editBtn.addEventListener('click', () => editTask(task.id));

  btnsDiv.appendChild(deleteBtn);
  btnsDiv.appendChild(editBtn);

  todo.appendChild(taskDiv);
  todo.appendChild(btnsDiv);

  return todo;
}

function renderTasks() {
  taskContainer.innerHTML = '';
  tasks.forEach(task => {
    taskContainer.appendChild(createTaskElement(task));
  });
}

btnAddList.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
