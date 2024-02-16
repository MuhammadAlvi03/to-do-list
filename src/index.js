import createFilterManager from "./modules/filterManager";
import createStorageManager from "./modules/storageManager";
import createDisplayController from "./modules/displayController";
import "./style.css";
import createTaskManager from "./modules/taskManager";
import { format, parseISO, parse } from "date-fns";

const domElements = {
    directoryButtons: document.querySelectorAll(".directory-btn"),

    createProjectInputContainer: document.querySelector(
        "#create-project-input-container"
    ),
    createProjectButton: document.querySelector("#create-project-btn"),
    createProjectSubmitButton: document.querySelector("#submit-project-btn"),

    createTaskButton: document.querySelector("#create-task-btn"),
    createTaskListItem: document.querySelector(".task-creation-list-item"),
    createTaskInputContainer: document.querySelector(
        "#create-task-input-container"
    ),
    createTaskSubmitButton: document.querySelector("#submit-task-btn"),

    mainStoragesList: document.querySelector(".main-storages-list"),
    projectList: document.querySelector(".project-list"),
    
    taskList: document.querySelector(".task-list"),
    statusButtons: document.querySelectorAll(".staus-btn"),
};


const taskManager = createTaskManager();
const storageManager = createStorageManager();
const storages = storageManager.getStorages();
const filterManager = createFilterManager(storages);
const displayController = createDisplayController(domElements, storageManager);

const init = () => {    
    displayController.initDisplay();
    const todayDirectoryButton = document.querySelector("#Today");
    todayDirectoryButton.addEventListener("click", () => {
        filterManager.filterToday(storages);
        console.log(storages);
    });

    const thisWeekDirectoryButton = document.querySelector('#This-Week');
    thisWeekDirectoryButton.addEventListener('click', () => {
        filterManager.filterThisWeek(storages);
        console.log(storages);
    })

    displayController.attachEventListeners();
};

const createNewTask = () => {
    const titleInput = document.querySelector("#create-task-title");
    const title = titleInput.value !== '' ? titleInput.value : 'Untitled Task';
    const deadlineInput = document.querySelector("#create-task-deadline");
    const deadline = deadlineInput.value !== '' ? format(parseISO(deadlineInput.value), 'MM/dd/yyyy') : 'No Deadline';
    const storage = displayController.getCurrentDirectoryName();
    const task = taskManager.createTask(title, deadline, storage);

    storageManager.addTaskToMap(task);
    
    if (storages["Main Storages"][storage]) {
        storageManager.addTaskToStorage(task, storage, "Main Storages");
    } else if (storages["Projects"][storage]) {
        storageManager.addTaskToStorage(task, storage, "Projects");
    } else {
        console.error("Could not find project storage");
    }
};

domElements.createTaskSubmitButton.addEventListener("click", () => {
    createNewTask();
    let directory = displayController.getCurrentDirectoryName();
    if (
        directory === "All Tasks" ||
        directory === "Today" ||
        directory === "This Week"
    ) {
        displayController.displayTasks(storages["Main Storages"][directory]);
    } else {
        displayController.displayTasks(storages["Projects"][directory]);
    }
    document.querySelector("#create-task-title").value = "";
    document.querySelector("#create-task-deadline").value = "";
});

domElements.createProjectSubmitButton.addEventListener("click", () => {
    createNewProject();
    document.querySelector("#create-project-title").value = "";
});

const createNewProject = () => {
    const title = document.querySelector("#create-project-title").value;
    storageManager.createProjectStorage(title);
    displayController.displayProjects(storages["Projects"]);
};




init();
