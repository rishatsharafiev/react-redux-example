import {
  TASK_BROWSE_INIT, TASK_ADD_REQUEST,
  TASK_READ_INIT, TASK_EDIT_REQUEST,
} from 'constants/task'
import { CITY_BROWSE_INIT } from 'constants/city'
import { SHOP_BROWSE_REQUEST } from 'constants/shop'
import { VERIFICATION_BROWSE_INIT } from 'constants/verification'
import moment from 'utils/moment'

export const changePage = page => ({ type: TASK_BROWSE_INIT, payload: { page } })
export const getCities = () => ({ type: CITY_BROWSE_INIT })
export const getShopsByCityId = cityId => ({ type: SHOP_BROWSE_REQUEST, payload: { cityId } })
export const getVerifications = () => ({ type: VERIFICATION_BROWSE_INIT })
export const addTask = (task) => {
  const newTask = { ...task, planned_at: moment(task.planned_at).format('YYYY-MM-DD HH:mm:ss') }
  return { type: TASK_ADD_REQUEST, payload: { task: newTask } }
}
export const editTask = (task) => {
  const newTask = { ...task, planned_at: moment(task.planned_at).format('YYYY-MM-DD HH:mm:ss') }
  return { type: TASK_EDIT_REQUEST, payload: { task: newTask } }
}
export const getTaskById = taskId => ({ type: TASK_READ_INIT, payload: { taskId } })
