const createStorageManager = () => {
    /**
     * Main storage object to keep references to storages
     */
    const storages = {
        'Main Storages': {
            'All Tasks': [],
            'Today': [],
            'This Week': []
        },
        'Projects': {}
    };

    /**
     * Map to keep references to tasks via task ID
     */
    const taskMap = new Map();

    /**
     * Creates a new project storage (array) within storages object
     * @param {string} projectName Name of project storage to create
     * @returns {Array} Empty array representing the new storage
     */
    const createProjectStorage = (projectName) => {
        storages['Projects'][projectName] = [];
        return storages['Projects'][projectName];
    };

    /**
     * Adds a task to a target storage, or allTasks storage if no storage is given
     * @param {object} task Task object to add to storage
     * @param {string} storageName Name of target storage in which the task will be added
     */
    const addTaskToStorage = (task, storageName = "All Tasks", storageType = 'Main Storages') => {
        let storage = storages[storageType][storageName];
        storage.push(task);
    };


    /**
     * Adds task to taskMap, sets key to task ID and value to the task object
     * @param {object} task Task object
     */
    const addTaskToMap = (task) => {
        if (!taskMap.has(task.id)) {
            taskMap.set(task.id, task);
        } else {
            console.log('Task already in map');
        }
    }

    /**
     * Deletes task from taskMap
     * @param {string} taskID 
     */
    const deleteTaskFromMap = (taskID) => {
        if (taskMap.has(taskID)) {
            taskMap.delete(taskID);
        } else {
            console.log('Could not find task to delete in taskMap')
        }
    }

    /**
     * Deletes a task from storage array
     * @param {string} taskID ID of task to delete
     * @param {string} storageName Name of storage in which task is stored
     */
    const deleteTaskFromStorage = (taskID, storageName, storageType = 'Main Storages') => {
        const storage = storages[storageType][storageName];
        const taskIndex = storage.findIndex((task) => task.id === taskID);
        storage.splice(taskIndex, 1);
    };


    /**
     * Finds a task with a given ID within taskMap
     * @param {string} taskID ID of task to lookup
     * @returns {object} Task object associated with ID
     */
    const findTask = (taskID) => {
        if (taskMap.has(taskID)) {
            return taskMap.get(taskID);
        } else {
            console.log('Could not find task in taskMap')
            return undefined;
        }
    };


    return {
        createProjectStorage,
        addTaskToStorage,
        addTaskToMap,
        deleteTaskFromStorage,
        deleteTaskFromMap,
        findTask,
        getStorages: () => storages,
    };
};

export default createStorageManager;