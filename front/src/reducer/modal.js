export const modals = {
  profile: 'profile',
  taskForm: 'taskForm',
};

const initialState = {
  [modals.profile]: false,
  [modals.taskForm]: { display: false, content: '' },
};

const TOGGLE_MODAL = 'TOGGLE_MODAL';
const TOGGLE_TASK_FORM_MODAL = 'TOGGLE_TASK_FORM_MODAL';

export const toggleModal = (target) => ({ type: TOGGLE_MODAL, target });
export const toggleTaskFormModal = (content) => ({ type: TOGGLE_TASK_FORM_MODAL, content });

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case TOGGLE_MODAL:
      newState[action.target] = !newState[action.target];
      break;
    case TOGGLE_TASK_FORM_MODAL:
      newState[modals.taskForm].display = !newState[modals.taskForm].display;
      newState[modals.taskForm].content = action.content;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
