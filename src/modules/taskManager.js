const createTaskManager = () => {
    /**
     * Creates Task object
     * @param {string} title Title of task
     * @param {string} deadline Deadline of task
     * @param {string} storage Array within storages object that task should be pushed into
     */
    function Task(title, deadline, storage) {
        this.title = title;
        this.status = "To Do";
        this.deadline = deadline ? deadline : null;
        this.storage = storage ? storage : "All Tasks";
        this.id = Math.random().toString(16).slice(2);
    }

    
    const updateTaskStatus = (task, taskStatus) => {
        task.status = taskStatus;
    };

    return {
        createTask: (title = 'New Task', deadline = null, storage = 'All Tasks') => new Task(title, deadline, storage),
        updateTaskStatus,
    };
};

export default createTaskManager;
