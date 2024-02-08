import createFilterManager from "./modules/filterManager";
import createStorageManager from "./modules/storageManager";
import createDisplayController from "./modules/displayController";
import './style.css';
import createTaskManager from "./modules/taskManager";


const domElements = {
    directoryButtons: document.querySelectorAll('.directory-btn'),

    createProjectInputContainer: document.querySelector('#create-project-input-container'),
    createProjectButton: document.querySelector('#create-project-btn'),
    createProjectSubmitButton: document.querySelector('#submit-project-btn'),

    createTaskButton: document.querySelector('#create-task-btn'),
    createTaskInputContainer: document.querySelector('#create-task-input-container'),
    createTaskSubmitButton: document.querySelector('#submit-task-btn'),

    mainStoragesList: document.querySelector('.main-storages-list'),
    projectList: document.querySelector('.project-list'),

    taskList: document.querySelector('.task-list'),
    statusButtons: document.querySelectorAll('.staus-btn'),
};






const taskManager = createTaskManager();
const storageManager = createStorageManager();
const storages = storageManager.getStorages()
const filterManager = createFilterManager(storages);
const displayController = createDisplayController(domElements, storageManager);


const init = () => {
    displayController.displayMainStorages(storages['Main Storages']);
    displayController.displayProjects(storages['Projects']);
    setTimeout(() => {
        const allTasksButton = document.querySelector('#All-Tasks');
        allTasksButton.click();
    }, 0);
}

const createNewTask = () => {
    const title = document.querySelector('#create-task-title').value;
    const deadline = document.querySelector('#create-task-deadline').value;

    console.log(deadline);

    const storage = displayController.getCurrentDirectoryName();
    const task = taskManager.createTask(title, deadline, storage)
    if (storages['Main Storages'][storage]) {
        storageManager.addTaskToStorage(task, storage, 'Main Storages');
    } else if (storages['Projects'][storage]) {
        storageManager.addTaskToStorage(task, storage, 'Projects');
    } else {
        console.error('Could not find project storage');
    }
}


domElements.createTaskSubmitButton.addEventListener('click', () => {
    createNewTask();
    let directory = displayController.getCurrentDirectoryName();
    if (directory === 'All Tasks' || directory === 'Today' || directory === 'This Week') {
        displayController.displayTasks(storages['Main Storages'][directory]);
    } else {
        displayController.displayTasks(storages['Projects'][directory]);
    }
    document.querySelector('#create-task-title').value = '';
    document.querySelector('#create-task-deadline').value = '';
})

const createNewProject = () => {
    const title = document.querySelector('#create-project-title').value;
    storageManager.createProjectStorage(title);
    displayProjects(storages['Projects']);
}

init();