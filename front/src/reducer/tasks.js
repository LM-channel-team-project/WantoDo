import generateId from '../utils/id-generator';

const UPDATE_TASKS = 'UPDATE_TASKS';
const ADD_TASK = 'ADD_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';

export const updateTasks = (tasks) => ({ type: UPDATE_TASKS, tasks });
export const addTask = (task) => ({ type: ADD_TASK, task });
export const updateTask = (task) => ({ type: UPDATE_TASK, task });
export const deleteTask = (id) => ({ type: DELETE_TASK, id });

const reducer = (state = {}, action) => {
  let tasks = { ...state };

  switch (action.type) {
    case UPDATE_TASKS:
      tasks = action.tasks;
      break;
    case ADD_TASK:
      tasks[generateId()] = { ...action.task, checked: false };
      break;
    case UPDATE_TASK:
      tasks[action.task.id] = action.task.content;
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
