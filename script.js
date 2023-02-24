const addNewTaskButton = document.getElementById("addNewTaskButton");

const formToCreateTask = document.getElementById("formToCreateTask");
const taskTitelInput = document.getElementById("taskTitle-input");
const taskDescriptionInput = document.getElementById("taskDescription-input");
const taskTagInput = document.getElementById("taskTag-input");
const taskColorInput = document.getElementById("taskColor-input");
const errorMessage = document.getElementById("errorMessage");

const todoTaskList = document.getElementById("todoTaskList");

let tasks = [];
let idTaskToEdit = -1;

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
    if (idTaskToEdit >= 0) {
      tasks = tasks.map((item, i) => {
        return {
          ...item,
          title: i === idTaskToEdit ? titleValue : item.title,

          description: i === idTaskToEdit ? descriptionValue : item.description,

          tag: i === idTaskToEdit ? tagValue : item.tag,

          color: i === idTaskToEdit ? colorValue : item.color,
        };
      });

      idTaskToEdit = -1;
    } else {
      const task = {
        title: titleValue,
        description: descriptionValue,
        tag: tagValue,
        color: colorValue,
        checked: false,
      };

      tasks.push(task);
    }

    errorMessage.style.display = "none";

    taskTitelInput.value = "";
    taskDescriptionInput.value = "";
    taskTagInput.value = "";

    formToCreateTask.style.display = "none";
    addNewTaskButton.style.display = "block";
  }
}

function renderTask() {
  todoTaskList.innerHTML = "";

  tasks.forEach((item, i) => {
    todoTaskList.innerHTML += ` 
    <li id=${i} style='background-color: ${item.color}'>
      <div class="title-tag-container">
        <h3 id="taskTitle">${item.title}</h3>

        <span id="taskTag" class="tag">${item.tag}</span>
      </div>
      
        <p id="taskDescription">${item.description}</p>
      
        <div class="delete-edit-checked-buttons-container">
          <button type="button" class="deleteButton">
              <img src="Icons/tash.svg" alt="A trash" data-action='delete'/>
          </button>

          <button type="button" class="editButton">
              <img src="Icons/edit.svg" alt="A pen" data-action='edit'/>
          </button>

          <button class="checkedButton ${item.checked ? "taskDone" : ""} 
            "type="button">
              <img src="Icons/checked.svg" alt="A check" data-action='check'/>
          </button>        
        </div>
    </li> `;
  });
}

todoTaskList.addEventListener("click", (e) => {
  const eventTarget = e.target;
  const parentEventTarget = eventTarget.parentNode;
  const grandParent = parentEventTarget.parentNode;
  const grandGrandParent = grandParent.parentNode;

  if (grandParent.classLis === "delete-edit-checked-buttons-container") return;

  const idTask = Number(grandGrandParent.id);
  const action = eventTarget.dataset.action;

  if (action === "check") taskChecked(idTask);
  if (action === "edit") editTask(idTask);
  // if (action === "delete") deleteTask(idTask);
});

function taskChecked(idTask) {
  tasks = tasks.map((item, i) => {
    return {
      ...item,
      checked: i === idTask ? !item.checked : item.checked,
    };
  });

  renderTask();
}

function editTask(idTask) {
  formToCreateTask.style.display = "flex";

  taskTitelInput.value = tasks[idTask].title;
  taskDescriptionInput.value = tasks[idTask].description;
  taskTagInput.value = tasks[idTask].tag;
  taskColorInput.value = tasks[idTask].color;

  idTaskToEdit = idTask;
}
