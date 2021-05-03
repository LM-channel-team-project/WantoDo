const initialProfile = {
  userName: 'WantoDo',
  email: 'WantoDo.@gmail.com',
  imageURL: '',
  motto: '고생 끝엔 치킨이 기다린다',
  goal: '프로젝트 끝나고 치킨 먹기🍗',
};

const CREATE_PROFILE = 'CREATE_PROFILE';
const GET_PROFILE = 'GET_PROFILE';
const EDIT_PROFILE = 'EDIT_PROFILE';
const DELETE_PROFILE = 'DELETE_PROFILE';

export const createProfile = (profile) => ({ type: EDIT_PROFILE, profile });
export const getProfile = () => ({ type: GET_PROFILE });
export const editProfile = (profile) => ({ type: EDIT_PROFILE, profile });
export const deleteProfile = (userId) => ({ type: EDIT_PROFILE, userId });

const reducer = (state = initialProfile, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CREATE_PROFILE:
      break;
    case GET_PROFILE:
      break;
    case EDIT_PROFILE:
      break;
    case DELETE_PROFILE:
      break;
    default:
      break;
  }
  console.log(newState, 'profile reducer');
  return newState;
};

export default reducer;
