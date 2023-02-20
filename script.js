const addNewTaskButton = document.getElementById("addNewTaskButton");

const formToCreateTask = document.getElementById("formToCreateTask");
const taskTitelInput = document.getElementById("taskTitle-input");
const taskDescriptionInput = document.getElementById("taskDescription-input");
const taskTagInput = document.getElementById("taskTag-input");
const taskColorInput = document.getElementById("taskColor-input");
const errorMessage = document.getElementById("errorMessage");

const todoTaskList = document.getElementById("todoTaskList");
// const dondeTaskList = document.getElementById("doneTaskList");

let tasks = [];

addNewTaskButton.addEventListener("click", () => {
  addNewTaskButton.style.display = "none";
  formToCreateTask.style.display = "flex";
});

formToCreateTask.addEventListener("submit", (e) => {
  e.preventDefault();

  createTask();
  renderTask();
});

function createTask() {
  const titleValue = taskTitelInput.value;
  const descriptionValue = taskDescriptionInput.value;
  const tagValue = taskTagInput.value;
  const colorValue = taskColorInput.value;

  const emptyTitle = titleValue === "";
  const emptyTag = tagValue === "";

  if (emptyTitle || emptyTag) {
    errorMessage.style.display = "block";
    errorMessage.innerText = "Title and tag inputs can not be empaty";
  } else {
    const task = {
      title: titleValue,
      description: descriptionValue,
      tag: tagValue,
      color: colorValue,
      checked: false,
    };

    tasks.push(task);

    errorMessage.style.display = "none";

    taskTitelInput.value = "";
    taskDescriptionInput.value = "";
    taskTagInput.value = "";
    taskColorInput.value = "#ffffff";

    console.log(task);
    console.log(tasks);
  }
}

function renderTask() {
  todoTaskList.innerHTML = "";

  tasks.forEach((item, i) => {
    todoTaskList.innerHTML += ` 
    <li id=${i} style='background-color: ${item.color}'>
      <div class="title-checkedButton-container">
        <h3 id="taskTitle">${item.title}</h3>

          <button
            id="checkedButtonTask" class="checkedButton ${
              item.checked ? "done" : "unDone"
            }" type="button">
                DONE
          </button>
      </div>
      
        <p id="taskDescription">${item.description}</p>
      
        <div class="tag-editButton-deleteButton-container">
          <span id="taskTag" class="tag">${item.tag}</span>

          <button type="button" class="editButton">EDIT</button>
          <button type="button" class="deleteButton">DELETE</button>
        </div>
    </li> `;
    console.log(i);
  });
}
