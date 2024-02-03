/**
 * Creates Task object
 * @param {string} title Title of task
 * @param {string} storage Name of array within storages object that task should be pushed into
 * @param {string} deadline Deadline of task
 */
export function Task(title, storage = null, deadline = null) {
    this.title = title;
    this.status = "To Do";
    this.deadline =  deadline ? deadline.toLocaleDateString() : null;
    this.storage = storage ? storage : 'allTasks';
    this.id = Math.random().toString(16).slice(2);
}
