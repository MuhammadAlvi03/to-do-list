const createStorageManager = () => {
    /**
     * Main storage object to keep references to storages, initially contains 'All Tasks'
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
     * Creates a new project storage (array) within storages object
     * @param {string} projectName Name of project storage to create
     * @returns {Array} Empty array representing the new storage
     */
    const createProjectStorage = (projectName) => {
        storages['Main Storages'][projectName] = [];
        return storages['Main Storages'][projectName];
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
     * Deletes a task from storage array
     * @param {string} taskID ID of task to delete
     * @param {string} storageName Name of storage in which task is stored
     */
    const deleteTaskFromStorage = (taskID, storageName, storageType = 'Main Storages') => {
        const storage = storages[storageType][storageName];
        const taskIndex = storage.findIndex((task) => task.id === taskID);
        storage.splice(taskIndex, 1);
    };


    return {
        createProjectStorage,
        addTaskToStorage,
        deleteTaskFromStorage,
        getStorages: () => storages,
    };
};

export default createStorageManager;