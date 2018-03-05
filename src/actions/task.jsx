import {
  TASK_BROWSE_INIT, TASK_ADD_REQUEST,
  TASK_READ_INIT, TASK_EDIT_REQUEST,
  TASK_STATUS_INIT,
} from 'constants/task'
import { CITY_BROWSE_INIT } from 'constants/city'
import { SHOP_BROWSE_REQUEST } from 'constants/shop'
import {
  VERIFICATION_BROWSE_INIT, VERIFICATION_ADD_REQUEST, VERIFICATION_REMOVE_REQUEST,
  VERIFICATION_DIALOG_OPEN, VERIFICATION_DIALOG_CLOSE,
} from 'constants/verification'
import {
  VIOLATION_BROWSE_INIT, VIOLATION_ADD_REQUEST, VIOLATION_REMOVE_REQUEST,
  VIOLATION_DIALOG_OPEN, VIOLATION_DIALOG_CLOSE,
} from 'constants/violation'
import moment from 'utils/moment'

export const changePage = page => ({ type: TASK_BROWSE_INIT, payload: { page } })
export const getCities = () => ({ type: CITY_BROWSE_INIT })
export const getShopsByCityId = cityId => ({ type: SHOP_BROWSE_REQUEST, payload: { cityId } })
export const getVerifications = () => ({ type: VERIFICATION_BROWSE_INIT })
export const getViolations = () => ({ type: VIOLATION_BROWSE_INIT })
export const addTask = (task) => {
  const newTask = { ...task, planned_at: moment(task.planned_at).format('YYYY-MM-DD HH:mm:ss') }
  return { type: TASK_ADD_REQUEST, payload: { task: newTask } }
}
export const editTask = (task) => {
  const newTask = { ...task, planned_at: moment(task.planned_at).format('YYYY-MM-DD HH:mm:ss') }
  return { type: TASK_EDIT_REQUEST, payload: { task: newTask } }
}
export const getTaskById = taskId => ({ type: TASK_READ_INIT, payload: { taskId } })
export const updateStatus = status => ({ type: TASK_STATUS_INIT, payload: { status } })
export const openVerificationDialog = () => ({ type: VERIFICATION_DIALOG_OPEN })
export const closeVerificationDialog = () => ({ type: VERIFICATION_DIALOG_CLOSE })
export const addVerification = verification => ({
  type: VERIFICATION_ADD_REQUEST,
  payload: { verification },
})
export const removeVerification = verificationId => ({
  type: VERIFICATION_REMOVE_REQUEST,
  payload: { verificationId },
})
export const openViolationDialog = () => ({ type: VIOLATION_DIALOG_OPEN })
export const closeViolationDialog = () => ({ type: VIOLATION_DIALOG_CLOSE })
export const addViolation = violation => ({
  type: VIOLATION_ADD_REQUEST,
  payload: { violation },
})
export const removeViolation = violationId => ({
  type: VIOLATION_REMOVE_REQUEST,
  payload: { violationId },
})
