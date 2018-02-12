import { TASK_BROWSE_REQUEST, TASK_ADD_REQUEST } from 'constants/task'
import { CITY_BROWSE_INIT } from 'constants/city'
import { VERIFICATION_BROWSE_REQUEST } from 'constants/verification'

export const changePage = page => ({ type: TASK_BROWSE_REQUEST, payload: { page } })
export const getCities = () => ({ type: CITY_BROWSE_INIT })
export const getVerifications = () => ({ type: VERIFICATION_BROWSE_REQUEST })
export const addTask = page => ({ type: TASK_ADD_REQUEST, payload: { page } })
