const initialProfile = {
  userName: '',
  email: '',
  platform: '',
  imageURL: '',
  motto: '',
  settings: {},
};

const CREATE_PROFILE = 'CREATE_PROFILE';
const EDIT_PROFILE = 'EDIT_PROFILE';
const EDIT_SETTING = 'EDIT_SETTING';
const DELETE_PROFILE = 'DELETE_PROFILE';

export const createProfile = (profile) => ({ type: CREATE_PROFILE, profile });
export const editProfile = (profile) => ({ type: EDIT_PROFILE, profile });
export const editSetting = (settings) => ({ type: EDIT_SETTING, settings });
export const deleteProfile = (userId) => ({ type: DELETE_PROFILE, userId });

const reducer = (state = initialProfile, action) => {
  let profile = { ...state };

  switch (action.type) {
    case CREATE_PROFILE:
      profile = { ...state, ...action.profile };
      break;
    case EDIT_PROFILE:
      profile = { ...state, ...action.profile };
      break;
    case EDIT_SETTING:
      profile = { ...state, settings: action.settings };
      break;
    case DELETE_PROFILE:
      break;
    default:
      break;
  }

  return profile;
};

export default reducer;
