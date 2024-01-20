/**
 * Main storage object to keep references to storages, initially contains allTasks
 */
export const storages = {
    allTasks: [],
}

/**
 * Creates a new storage (array) and adds it to storages object
 * @param {string} storageName Name of storage to create
 * @returns {Array} Empty array representing the new storage
 */
export function createStorage(storageName) {
    storages[storageName] = [];
    return storages[storageName];
}

/**
 * Adds a task to a target storage, or allTasks storage if no storage is given
 * @param {object} task Task object to add to storage
 * @param {string} storageName Name of target storage in which the task will be added
 */
export function addTaskToStorage(task, storageName = 'allTasks') {
    let storage = storages[storageName] ? storages[storageName] : createStorage(storageName);
    storage.push(task);
}

/**
 * Deletes a task from storage array
 * @param {string} taskID ID of task to delete
 * @param {string} storageName Name of storage in which task is stored
 */
export function deleteTaskFromStorage(taskID, storageName = 'allTasks') {
    const storage = storages[storageName];
    const taskIndex = storage.findIndex(task => task.id === taskID);
    storage.splice(taskIndex, 1);
}

