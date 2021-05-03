import { combineReducers, createStore } from 'redux';
import profileReducer, {
  createProfile,
  deleteProfile,
  editProfile,
  getProfile,
} from '../reducer/profile';
import tasksReducer, { addTask, deleteTask, updateTask } from '../reducer/tasks';

const rootReducer = combineReducers({
  profile: profileReducer,
  tasks: tasksReducer,
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
};

export default store;
