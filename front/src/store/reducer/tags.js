const GET_TAGS = 'GET_TAGS';
const ADD_TAG = 'ADD_TAG';
const UPDATE_TAG = 'UPDATE_TAG';
const DELETE_TAG = 'DELETE_TAG';

export const getTags = (tags) => ({ type: GET_TAGS, tags });
export const addTag = (tag) => ({ type: ADD_TAG, tag });
export const updateTag = (tagId, tag) => ({ type: UPDATE_TAG, tagId, tag });
export const deleteTag = (id) => ({ type: DELETE_TAG, id });

const reducer = (state = {}, action) => {
  let tags = { ...state };

  switch (action.type) {
    case GET_TAGS:
      tags = action.tags.reduce((obj, tag) => {
        const copied = { ...obj };
        copied[tag.tagId] = tag;
        return copied;
      }, {});
      break;
    case ADD_TAG:
      tags[''] = { ...action.tag };
      break;
    case UPDATE_TAG:
      tags[action.tagId] = action.tag;
      break;
    case DELETE_TAG:
      delete tags[action.id];
      break;
    default:
      break;
  }

  return tags;
};

export default reducer;
