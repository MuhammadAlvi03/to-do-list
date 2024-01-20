import { addWeeks, isBefore } from 'date-fns';


/**
 * Checks if task's deadline is today
 * @param {object} task Task object
 * @returns {boolean} true if task's deadline is today, otherwise false
 */
function deadlineIsToday(task) {
    const today = new Date().toLocaleDateString();
    if (task.deadline === today) return true;
    return false;
}

/**
 * Filters allTasks array of main storages object by tasks with deadline matching today's date
 * @param {object} storages Main storages object
 */
export function filterToday(storages) {
    const todayArr = [];
    const allTasks = storages.allTasks;
    todayArr.push(allTasks.filter(task => deadlineIsToday(task)));
    storages.today = todayArr;
}


/**
 * Checks if task's deadline is within this week
 * @param {object} task Task object
 * @returns {boolean} true if task's deadline is within this week, otherwise false
 */
function deadlineIsThisWeek(task) {
    const nextWeek = addWeeks(new Date(), 1);
    if (isBefore(task.deadline, nextWeek)) return true;
    return false;
}

/**
 * Filters allTasks array of main storages object by tasks with deadline within this week
 * @param {object} storages Main storages object
 */
export function filterThisWeek(storages) {
    const thisWeekArr = [];
    const allTasks = storages.allTasks
    thisWeekArr.push(allTasks.filter(task => deadlineIsThisWeek(task)));
    storages.thisWeek = thisWeekArr;
}
