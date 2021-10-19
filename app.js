const inputTaskField = document.querySelector("#input-task");
const addTaskBtn = document.querySelector("#add-task-button");
const taskUlList = document.querySelector("ul");

initTasks();

function initTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (const task of tasks){
        addTaskToTaskUlList(task.text, task.isDone);
    }
}

function addTaskToTaskUlList(text, isDone) {
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.checked = isDone;
    input.addEventListener("change", toggleLineThrough);

    const span = document.createElement("span");
    span.classList.add("task");
    span.innerText = text;
    if (isDone) {
        span.classList.add("line-through");
    }

    const label = document.createElement("label");
    label.append(input, span);

    const button = document.createElement("button");
    button.classList.add("delete-btn");
    button.addEventListener("click", removeTaskHandler);

    const div = document.createElement("div");
    div.classList.add("task-item");
    div.append(label, button);

    let newLi = document.createElement("li");
    newLi.append(div);

    taskUlList.append(newLi);
}


addTaskBtn.addEventListener("click", () => {
    addTaskBtn.setAttribute("disabled", "true");

    const text = inputTaskField.value;

    if (text) {
        addTaskToTaskUlList(text);
        saveNewTaskToLocalStorage(text, false);
    }

    inputTaskField.value = ""
    addTaskBtn.removeAttribute("disabled")
});

function toggleLineThrough(event) {
    const inputNode = event.target;
    const labelNode = inputNode.parentNode;
    let spanNode = labelNode.lastChild;
    const isDone = spanNode.classList.toggle("line-through");

    // update local storage data
    // const isDone = spanNode.classList.contains("line-through");
    const text = spanNode.innerText;
    updateTaskInLocalStorage(text, isDone);
}

function removeTaskHandler(event) {
    const btn = event.target;
    const divTaskItem = btn.parentNode;
    const li = divTaskItem.parentNode;
    // remove from DOM
    li.remove();
    // remove from localStorage
    const label = divTaskItem.firstChild;
    const span = label.lastChild;
    const task = span.innerText;
    removeTaskFromLocalStorage(task);
}

function updateTaskInLocalStorage(text, isDone) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIdx = tasks.findIndex((t) => t.text == text);

    tasks[taskIdx] = {
        text,
        isDone
    };

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveNewTaskToLocalStorage(text, isDone) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const task = {
        text,
        isDone
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((el) => el.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

