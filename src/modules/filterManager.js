import { addWeeks, isBefore, format, isAfter } from "date-fns";

const createFilterManager = (storages) => {
    const allTasksStorage = storages['Main Storages']["All Tasks"];

    /**
     * Checks if task's deadline is today
     * @param {object} task Task object
     * @returns {boolean} true if task's deadline is today, otherwise false
     */
    function deadlineIsToday(task) {
        const today = format(new Date(), 'MM/dd/yyyy')
        if (task.deadline === today) return true;
        return false;
    }

    /**
     * Filters allTasks array of main storages object by tasks with deadline matching today's date
     * @param {object} storages Main storages object
     */
    function filterToday(storages) {
        storages['Main Storages']["Today"] = allTasksStorage.filter((task) => deadlineIsToday(task));
    }

    /**
     * Checks if task's deadline is within this week
     * @param {object} task Task object
     * @returns {boolean} true if task's deadline is within this week, otherwise false
     */
    function deadlineIsThisWeek(task) {
        const nextWeek = addWeeks(new Date(), 1);
        const today = new Date();
        if (isBefore(task.deadline, nextWeek) && isAfter(task.deadline, today)) return true;
        return false;
    }

    /**
     * Filters allTasks array of main storages object by tasks with deadline within this week
     * @param {object} storages Main storages object
     */
    function filterThisWeek(storages) {
        storages['Main Storages']['This Week'] = allTasksStorage.filter((task) => deadlineIsThisWeek(task));
    }

    return {
        filterToday,
        filterThisWeek,
    }
};

export default createFilterManager;