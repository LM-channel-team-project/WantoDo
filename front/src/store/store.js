import { combineReducers, createStore } from 'redux';
import profileReducer, { createProfile, deleteProfile, editProfile } from '../reducer/profile';
import tasksReducer, { addTask, deleteTask, updateTask, updateTasks } from '../reducer/tasks';
import modalReducer, { toggleModal, toggleTaskFormModal } from '../reducer/modal';
import tokenReducer, { pushToken, removeToken } from '../reducer/token';

const rootReducer = combineReducers({
  profile: profileReducer,
  tasks: tasksReducer,
  modal: modalReducer,
  token: tokenReducer,
});

const store = createStore(rootReducer);

export const actionCreators = {
  createProfile,
  editProfile,
  deleteProfile,
  addTask,
  updateTask,
  deleteTask,
  toggleModal,
  toggleTaskFormModal,
  pushToken,
  removeToken,
  updateTasks,
};

export default store;
