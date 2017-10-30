import { 
  ADD_ACCOUNT,
  SELECT_ACCOUNT
} from './AccountActionTypes';

export function addAccount(account) {
  return {
    type: ADD_ACCOUNT,
    payload: account
  }
}

export function selectAccount(id) {
  return {
    type: SELECT_ACCOUNT,
    payload: id
  }
}