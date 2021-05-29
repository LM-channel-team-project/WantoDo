const PUSH_TOKEN = 'PUSH_TOKEN';
const REMOVE_TOKEN = 'REMOVE_TOKEN';

export const pushToken = (token) => ({ type: PUSH_TOKEN, token });
export const removeToken = () => ({ type: REMOVE_TOKEN });

const reducer = (state = '', action) => {
  let token = state;

  switch (action.type) {
    case PUSH_TOKEN:
      token = action.token;
      break;
    case REMOVE_TOKEN:
      token = '';
      break;
    default:
      break;
  }
  return token;
};

export default reducer;
