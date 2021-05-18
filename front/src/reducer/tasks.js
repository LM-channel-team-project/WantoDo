const UPDATE_TASKS = 'UPDATE_TASKS';
const ADD_TASK = 'ADD_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';

export const updateTasks = (tasks) => ({ type: UPDATE_TASKS, tasks });
export const addTask = (taskId, task) => ({ type: ADD_TASK, taskId, task });
export const updateTask = (taskId, task) => ({ type: UPDATE_TASK, taskId, task });
export const deleteTask = (id) => ({ type: DELETE_TASK, id });

const reducer = (state = {}, action) => {
  let tasks = { ...state };

  switch (action.type) {
    case UPDATE_TASKS:
      tasks = action.tasks;
      break;
    case ADD_TASK:
      tasks[action.taskId] = { ...action.task, checked: false };
      break;
    case UPDATE_TASK:
      tasks[action.taskId] = action.task;
      break;
    case DELETE_TASK:
      delete tasks[action.id];
      break;
    default:
      break;
  }

  return tasks;
};

export default reducer;
