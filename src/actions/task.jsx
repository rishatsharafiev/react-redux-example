import {SET_NAME} from 'constants/task'

export function setTaskName(name = '') {
  return {
    type: SET_NAME,
    name,
  }
}
