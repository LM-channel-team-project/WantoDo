const initialTask = {
  '4k1g2435hk': {
    level: 0,
    checked: true,
    content: '투두리스트 만들기',
    periods: [Date.now()],
  },
  '4f5j76k2d1': {
    level: 1,
    checked: false,
    content: '컴포넌트 전부 완성하기',
    periods: [new Date('2021-04-21T16:30:00'), new Date('2021-04-22T16:30:00')],
  },
  '3ds45h63o5': {
    level: 2,
    checked: false,
    content: '비즈니스 로직 짜기',
    periods: [new Date('2021-04-21T16:30:00'), new Date('2021-04-23T16:30:00')],
  },
  '16wh4rk43w': {
    level: 3,
    checked: false,
    content: '프로젝트 마치고 치킨 먹기',
    periods: [new Date('2021-04-23T16:30:00'), new Date('2021-04-24T16:30:00')],
  },
};

const ADD_TASK = 'ADD_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';

export const addTask = (task) => ({ type: ADD_TASK, task });
export const updateTask = (task) => ({ type: UPDATE_TASK, task });
export const deleteTask = (id) => ({ type: DELETE_TASK, id });

const reducer = (state = initialTask, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_TASK:
      break;
    case UPDATE_TASK:
      newState[action.task.id] = action.task.content;
      break;
    case DELETE_TASK:
      delete newState[action.id];
      break;
    default:
      break;
  }
  console.log(newState, 'task reducer');
  return newState;
};

export default reducer;
