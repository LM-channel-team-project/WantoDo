const initialProfile = {
  userName: '',
  email: '',
  imageURL: '',
  motto: '',
};

const CREATE_PROFILE = 'CREATE_PROFILE';
const GET_PROFILE = 'GET_PROFILE';
const EDIT_PROFILE = 'EDIT_PROFILE';
const DELETE_PROFILE = 'DELETE_PROFILE';

export const createProfile = (profile) => ({ type: CREATE_PROFILE, profile });
export const getProfile = () => ({ type: GET_PROFILE });
export const editProfile = (profile) => ({ type: EDIT_PROFILE, profile });
export const deleteProfile = (userId) => ({ type: DELETE_PROFILE, userId });

const reducer = (state = initialProfile, action) => {
  let newState;

  switch (action.type) {
    case CREATE_PROFILE:
      newState = { ...state, ...action.profile };
      break;
    case GET_PROFILE:
      newState = { ...state };
      break;
    case EDIT_PROFILE:
      newState = { ...state };
      break;
    case DELETE_PROFILE:
      newState = { ...state };
      break;
    default:
      newState = { ...state };
      break;
  }

  return newState;
};

export default reducer;
