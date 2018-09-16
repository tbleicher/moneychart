import {
  ADD_TAG,
  MERGE_TAGS,
  REMOVE_TAG,
  SELECT_TAG,
  SET_TAGS,
  UPDATE_TAG
} from "./TagActionTypes";

export function addTag(tag) {
  return {
    type: ADD_TAG,
    payload: tag
  };
}

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
