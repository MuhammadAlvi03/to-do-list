const createDisplayController = (domElements, storageManager) => {
    const storages = storageManager.getStorages();

    const {
        directoryButtons,

        createProjectInputContainer,
        createProjectButton,
        createProjectSubmitButton,
        
        createTaskButton,
        createTaskListItem,
        createTaskInputContainer,
        createTaskSubmitButton,

        mainStoragesList,
        projectList,

        taskList,
        statusButtons,
        
    } = domElements;
    
    const directoryButtonsArr = Array.from(directoryButtons);
    const mainStorageButtonsArr = [];
    const projectStorageButtonsArr = [];
    const statusButtonsArr = Array.from(statusButtons);

    function changeCurrentDirectory(event) {
        directoryButtonsArr.forEach((button) => {
                button.classList.remove('active')
        });
    
        event.target.classList.add('active');
    }

    function getCurrentDirectoryName() {
        const activeButton = directoryButtonsArr.find(button => button.classList.contains('active'));
        return activeButton.textContent;
    }


    function displayMainStorages(mainStorage) {
        while (mainStoragesList.firstChild) {
            mainStoragesList.removeChild(mainStoragesList.firstChild);
        }
        for (let storageName of Object.keys(mainStorage)) {
            let storageItemContainer = document.createElement('li');
            storageItemContainer.classList = 'directory-item-container';
            let storageItem = document.createElement('button');
            storageItem.className = 'directory-btn';
            storageItem.textContent = storageName;
            storageItem.id = storageName.replace(' ', '-');
            directoryButtonsArr.push(storageItem);
            mainStorageButtonsArr.push(storageItem);

            storageItemContainer.appendChild(storageItem);
            mainStoragesList.appendChild(storageItemContainer);
        }
    }

    function displayProjects(projectStorage) {
        while (projectList.firstChild) {
            projectList.removeChild(projectList.firstChild);
        }
        for (let projectName of Object.keys(projectStorage)) {
            let projectItemContainer = document.createElement('li');
            projectItemContainer.className = 'directory-item-container';
            let projectItem = document.createElement('button');
            projectItem.className = 'directory-btn';
            projectItem.textContent = projectName;
            projectItem.id = projectName.replace(' ', '-');
            attachProjectButtonEventListeners(projectItem);
            directoryButtonsArr.push(projectItem);
            projectStorageButtonsArr.push(projectItem);

            projectItemContainer.appendChild(projectItem);
            projectList.appendChild(projectItemContainer);
        }
    }


    function displayTasks(storage) {
        while (taskList.firstChild !== createTaskInputContainer.parentNode) {
            taskList.removeChild(taskList.firstChild);
        }
        if (storage && storage.length) { // added AND operator
            for (let task of storage) {
                let taskItem = document.createElement('li');
                taskItem.className = 'task-item';
    
                let taskTitleContainer = document.createElement('div');
                taskTitleContainer.className = 'task-title';
                taskTitleContainer.textContent = task.title || 'Untitled Task';
    
                let taskStatusContainer = document.createElement('div');
                taskStatusContainer.className = 'task-status-container';
                
                let statusButtonToDo = document.createElement('button'); statusButtonToDo.className = 'status-button to-do-button'; statusButtonToDo.dataset.statusButtonType = 'To Do'; statusButtonToDo.textContent = 'To Do';
                let statusButtonDoing = document.createElement('button'); statusButtonDoing.className = 'status-button doing-button'; statusButtonDoing.dataset.statusButtonType = 'Doing'; statusButtonDoing.textContent = 'Doing';
                let statusButtonDone = document.createElement('button'); statusButtonDone.className = 'status-button done-button'; statusButtonDone.dataset.statusButtonType = 'Done'; statusButtonDone.textContent = 'Done';
                let statusButtonsArr = [];
                statusButtonsArr.push(statusButtonToDo, statusButtonDoing, statusButtonDone);
                statusButtonsArr.forEach(button => {
                    button.addEventListener('click', statusButtonClickHandler);
                })
    
    
                let taskDeadlineContainer = document.createElement('div'); taskDeadlineContainer.className = 'task-deadline';
                taskDeadlineContainer.textContent = task.deadline || 'No Deadline';

                let deleteTaskButton = document.createElement('button'); deleteTaskButton.className = 'delete-task-button';
                deleteTaskButton.textContent = 'X';

                taskItem.dataset.taskid = task.id;
    
                taskStatusContainer.append(...statusButtonsArr);
                taskItem.append(taskTitleContainer, taskStatusContainer, taskDeadlineContainer, deleteTaskButton);
                taskList.insertBefore(taskItem, createTaskInputContainer.parentNode);
            }
        } else {
            createPlaceholderForEmptyStorage();
        }
    }

    function createPlaceholderForEmptyStorage() {
        let noTasksMessage = document.createElement('span');
        noTasksMessage.textContent = 'No Tasks';
        taskList.insertBefore(noTasksMessage, createTaskListItem);
    }

    function updateTaskStatus(event) {
        let taskStatusContainer = event.target.parentNode;
        let statusButtonArr = Array.from(taskStatusContainer.children);
        statusButtonArr.forEach(button => {
            button.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    const attachProjectButtonEventListeners = (button) => {
        button.addEventListener('click', directoryButtonClickHandler);
    }
    
    // click handlers

    const directoryButtonClickHandler = (event) => {
        const button = event.target;
        const storageName = button.id.replace('-', ' ');

        changeCurrentDirectory(event);
        if (storages['Main Storages'][storageName]) {
            displayTasks(storages['Main Storages'][storageName]);
        } else if (storages['Projects'][storageName]) {
            displayTasks(storages['Projects'][storageName]);
        } else {
            console.error('Could not access tasks')
        }
    }

    const createProjectButtonClickHandler = (event) => {
        createProjectInputContainer.classList.remove('hidden')
        createProjectInputContainer.classList.add('active');
        createProjectButton.classList.remove('active');
        createProjectButton.classList.add('hidden');
    }

    const createProjectSubmitButtonClickHandler = (event) => {
        createProjectInputContainer.classList.remove('active');
        createProjectInputContainer.classList.add('hidden');
        createProjectButton.classList.remove('hidden');
    }



    const createTaskButtonClickHandler = (event) => {
        createTaskButton.classList.add('hidden');
        createTaskInputContainer.classList.remove('hidden');
        createTaskInputContainer.classList.add('active');
    }

    const createTaskSubmitButtonClickHandler = (event) => {
        createTaskInputContainer.classList.remove('active');
        createTaskInputContainer.classList.add('hidden');
        createTaskButton.classList.remove('hidden');
    }

    // wip
    const statusButtonClickHandler = (event) => {
        const taskID = event.target.parentNode.parentNode.dataset.taskid;
        const storageName = directoryButtonsArr.find(button => {
            button.classList.contains('active');
        }).id.replace('-', ' ');

        console.log(taskID);
        updateTaskStatus(task, taskStatus);
    }


    // event listeners

    const attachEventListeners = () => {

        mainStorageButtonsArr.forEach(button => {
            button.addEventListener('click', directoryButtonClickHandler);
        })
    
        createProjectButton.addEventListener('click', createProjectButtonClickHandler);
        createProjectSubmitButton.addEventListener('click', createProjectSubmitButtonClickHandler);
        createTaskButton.addEventListener('click', createTaskButtonClickHandler);
        createTaskSubmitButton.addEventListener('click', createTaskSubmitButtonClickHandler);
    
        statusButtonsArr.forEach(button => {
            button.addEventListener('click', statusButtonClickHandler);
        })

    }

    const initDisplay = () => {
        displayMainStorages(storages["Main Storages"]);
        displayProjects(storages["Projects"]);
        setTimeout(() => {
            const allTasksButton = document.querySelector("#All-Tasks");
            
            allTasksButton.click();
        }, 0);
    }


    return {
        displayMainStorages,
        displayProjects,
        displayTasks,
        getCurrentDirectoryName,
        attachProjectButtonEventListeners,
        attachEventListeners,
        initDisplay,
    }
}

export default createDisplayController;