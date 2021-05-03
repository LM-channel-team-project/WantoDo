import { combineReducers, createStore } from 'redux';
import profileReducer, {
  createProfile,
  deleteProfile,
  editProfile,
  getProfile,
} from '../reducer/profile';
import tasksReducer, { addTask, deleteTask, updateTask } from '../reducer/tasks';
import modalReducer, { toggleModal, toggleTaskFormModal } from '../reducer/modal';

const rootReducer = combineReducers({
  profile: profileReducer,
  tasks: tasksReducer,
  modal: modalReducer,
});

const store = createStore(rootReducer);

export const actionCreators = {
  createProfile,
  getProfile,
  editProfile,
  deleteProfile,
  addTask,
  updateTask,
  deleteTask,
  toggleModal,
  toggleTaskFormModal,
};

export default store;
