const createStorageManager = () => {
    /**
     * Main storage object to keep references to storages, initially contains 'All Tasks'
     */
    const storages = {
        "All Tasks": [],
    };

    /**
     * Creates a new storage (array) and adds it to storages object
     * @param {string} storageName Name of storage to create
     * @returns {Array} Empty array representing the new storage
     */
    const createStorage = (storageName) => {
        storages[storageName] = [];
        return storages[storageName];
    };

    /**
     * Adds a task to a target storage, or allTasks storage if no storage is given
     * @param {object} task Task object to add to storage
     * @param {string} storageName Name of target storage in which the task will be added
     */
    const addTaskToStorage = (task, storageName = "All Tasks") => {
        let storage = storages[storageName];
        storage.push(task);
    };

    /**
     * Deletes a task from storage array
     * @param {string} taskID ID of task to delete
     * @param {string} storageName Name of storage in which task is stored
     */
    const deleteTaskFromStorage = (taskID, storageName) => {
        const storage = storages[storageName];
        const taskIndex = storage.findIndex((task) => task.id === taskID);
        storage.splice(taskIndex, 1);
    };

    return {
        createStorage,
        addTaskToStorage,
        deleteTaskFromStorage,
        getStorages: () => storages,
    };
};

export default createStorageManager;