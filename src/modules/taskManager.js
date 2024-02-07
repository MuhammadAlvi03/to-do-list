const createTaskManager = () => {
    /**
     * Creates Task object
     * @param {string} title Title of task
     * @param {string} storage Array within storages object that task should be pushed into
     * @param {string} deadline Deadline of task
     */
    function Task(title, storage, deadline) {
        this.title = title;
        this.status = "To Do";
        this.deadline = deadline ? deadline.toLocaleDateString() : null;
        this.storage = storage ? storage : "All Tasks";
        this.id = Math.random().toString(16).slice(2);
    }

    
    const updateTaskStatus = (task, taskStatus) => {
        task.status = taskStatus;
    };

    return {
        createTask: (title = 'New Task', storage = 'All Tasks', deadline = null) => new Task(title, storage, deadline),
        updateTaskStatus,
    };
};

export default createTaskManager;
