import {
  ADD_TAG,
  MERGE_TAGS,
  REMOVE_TAG,
  SELECT_TAG,
  SET_TAGS,
  UPDATE_TAG
} from "./TagActionTypes";

import * as api from "./api";

export function addTag(tag) {
  return {
    type: ADD_TAG,
    payload: tag
  };
}

export const createTag = (account_id, tag) => {
  console.log("TODO: create tag", account_id, tag);
  return dispatch => {
    api
      .createTag(account_id, tag)
      .then(tag => {
        dispatch(addTag(tag));
      })
      .catch(error => console.log(error));
  };
};

export function mergeTags(arr) {
  return {
    type: MERGE_TAGS,
    payload: arr
  };
}

export function removeTag(label) {
  return {
    type: REMOVE_TAG,
    payload: label
  };
}

export function selectTag(id) {
  return {
    type: SELECT_TAG,
    payload: id
  };
}

export function setTags(tags) {
  return {
    type: SET_TAGS,
    payload: tags
  };
}

export function updateTag(tag) {
  return {
    type: UPDATE_TAG,
    payload: tag
  };
}
