import {
  ADD_TAG,
  MERGE_TAGS, 
  REMOVE_TAG,
  SELECT_TAG,
  UPDATE_TAG,
} from './TagTypes';

export function addTag(tag) {
  return {
    type: ADD_TAG,
    payload: tag,
  }
}

export function mergeTags(arr) {
  return {
    type: MERGE_TAGS,
    payload: arr,
  }
}

export function removeTag(label) {
  return {
    type: REMOVE_TAG,
    payload: label,
  }
}

export function selectTag(id) {
  return {
    type: SELECT_TAG,
    payload: id,
  }
}

export function updateTag(tag) {
  return {
    type: UPDATE_TAG,
    payload: tag,
  }
}