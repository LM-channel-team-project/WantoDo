import { combineReducers, createStore } from 'redux';
import profileReducer, {
  createProfile,
  deleteProfile,
  editProfile,
  editSetting,
} from '../reducer/profile';
import tasksReducer, { addTask, deleteTask, updateTask, updateTasks } from '../reducer/tasks';
import modalReducer, { toggleModal, toggleTaskFormModal } from '../reducer/modal';
import tokenReducer, { pushToken, removeToken } from '../reducer/token';
import tagsReducer, { getTags, addTag, updateTag, deleteTag } from '../reducer/tags';

const rootReducer = combineReducers({
  profile: profileReducer,
  tasks: tasksReducer,
  modal: modalReducer,
  token: tokenReducer,
  tags: tagsReducer,
});

const store = createStore(rootReducer);

export const actionCreators = {
  createProfile,
  editProfile,
  editSetting,
  deleteProfile,
  addTask,
  updateTask,
  deleteTask,
  toggleModal,
  toggleTaskFormModal,
  pushToken,
  removeToken,
  updateTasks,
  getTags,
  addTag,
  updateTag,
  deleteTag,
};

export default store;
