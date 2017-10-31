import shortid from 'shortid';

import { 
  ADD_TAG,
  MERGE_TAGS,
  REMOVE_TAG,
  UPDATE_TAG,
  SELECT_TAG,
  SET_TAGS
} from './TagTypes';


const TagsListReducer = (state=[], action) => {
  
  switch (action.type) {
    case ADD_TAG:
      
      return state
        .map(tag => Object.assign({}, tag, { selected: false }))
        .concat([
          Object.assign(action.payload, {id: shortid.generate()})
        ]);

    case MERGE_TAGS:
      return state.concat(action.payload);

    case REMOVE_TAG:
      return state.filter(tag => tag.label !== action.payload);

    case SELECT_TAG:
      return state.map((tag) => {
        if (tag.id === action.payload) {
          return Object.assign({}, tag, { selected: true });
        } else if (tag.selected) {
          return Object.assign({}, tag, { selected: false });
        } else {
          return tag;
        }
      });

    case SET_TAGS:
      return action.payload.slice();
    
    case UPDATE_TAG:
      return state.map((tag) => {
        if (tag.id === action.payload.id) {
          return action.payload;
        } else {
          return tag;
        }
      });

    default:
      return state;
  }
}

export default TagsListReducer;