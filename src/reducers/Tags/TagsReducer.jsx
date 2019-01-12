import {
  ADD_TAG,
  MERGE_TAGS,
  REMOVE_TAG,
  UPDATE_TAG,
  SELECT_TAG,
  SET_TAGS
} from "./TagActionTypes";

const TagsListReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TAG:
      return state
        .map(tag => (tag.selected ? { ...tag, selected: false } : tag))
        .concat({ ...action.payload, selected: true });

    case MERGE_TAGS:
      return state.concat(action.payload);

    case REMOVE_TAG:
      return state.filter(tag => tag.label !== action.payload);

    case SELECT_TAG:
      return state.map(tag => {
        if (tag.id === action.payload) {
          return { ...tag, selected: true };
        } else if (tag.selected) {
          return { ...tag, selected: false };
        } else {
          return tag;
        }
      });

    case SET_TAGS:
      console.log("SET_TAGS", action.payload.length);
      return [...action.payload];

    case UPDATE_TAG:
      return state.map(tag => {
        if (tag.id === action.payload.id) {
          return action.payload;
        } else {
          return tag;
        }
      });

    default:
      return state;
  }
};

export default TagsListReducer;
