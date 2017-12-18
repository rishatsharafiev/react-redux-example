import {
  TASKS_REQUEST_SUCCESS,
  TASKS_REQUEST_ERROR,
  TASKS_GET_PAGE,
} from 'constants/task'

export const getTasks = page => ({ type: TASKS_GET_PAGE, payload })
