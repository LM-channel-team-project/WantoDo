import { combineReducers, createStore } from 'redux';
import profileReducer, {
  createProfile,
  deleteProfile,
  editProfile,
  editSetting,
} from 'store/reducer/profile';
import tasksReducer, { addTask, deleteTask, updateTask, updateTasks } from 'store/reducer/tasks';
import modalReducer, { toggleModal, toggleTaskFormModal, closeAllModal } from 'store/reducer/modal';
import tokenReducer, { pushToken, removeToken } from 'store/reducer/token';
import tagsReducer, { getTags, addTag, updateTag, deleteTag } from 'store/reducer/tags';

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
  closeAllModal,
  pushToken,
  removeToken,
  updateTasks,
  getTags,
  addTag,
  updateTag,
  deleteTag,
};

export default store;
