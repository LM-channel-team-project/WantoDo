export const modals = {
  profile: 'profile',
  taskForm: 'taskForm',
  tags: 'tags',
  withdrawal: 'withdrawal',
};

const initialState = {
  [modals.profile]: false,
  [modals.taskForm]: { display: false, taskId: '', task: {} },
  [modals.tags]: false,
  [modals.withdrawal]: false,
};

const TOGGLE_MODAL = 'TOGGLE_MODAL';
const TOGGLE_TASK_FORM_MODAL = 'TOGGLE_TASK_FORM_MODAL';
const CLOSE_ALL_MODALS = 'CLOSE_ALL_MODALS';

export const toggleModal = (target, command) => ({ type: TOGGLE_MODAL, target, command });
export const toggleTaskFormModal = (task, command) => ({
  type: TOGGLE_TASK_FORM_MODAL,
  task,
  command,
});
export const closeAllModal = () => ({ type: CLOSE_ALL_MODALS });

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case TOGGLE_MODAL:
      newState[action.target] = action.command === 'open';
      break;
    case TOGGLE_TASK_FORM_MODAL:
      newState[modals.taskForm].display = action.command === 'open';
      if (action.task) {
        newState[modals.taskForm].taskId = action.task.taskId;
        newState[modals.taskForm].task = action.task.task;
      }
      break;
    case CLOSE_ALL_MODALS:
      Object.keys(newState).forEach((key) => {
        if (typeof newState[key] === 'object') {
          newState[key].display = false;
        } else {
          newState[key] = false;
        }
      });
      break;
    default:
      break;
  }
  console.log(newState);
  return newState;
};

export default reducer;
