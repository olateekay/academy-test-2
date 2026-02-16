let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filters button");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  const searchText = searchInput.value.toLowerCase();

  tasks
    .filter(task => {
      if (currentFilter === "active") return !task.completed;
      if (currentFilter === "completed") return task.completed;
      return true;
    })
    .filter(task => task.text.toLowerCase().includes(searchText))
    .forEach((task, index) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = task.text;
      if (task.completed) span.classList.add("completed");

      span.addEventListener("click", () => toggleTask(index));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteTask(index));

      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

searchInput.addEventListener("input", renderTasks);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

renderTasks();
