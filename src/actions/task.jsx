import { TASK_BROWSE_INIT, TASK_ADD_REQUEST } from 'constants/task'
import { CITY_BROWSE_INIT } from 'constants/city'
import { SHOP_BROWSE_REQUEST } from 'constants/shop'
import { VERIFICATION_BROWSE_INIT } from 'constants/verification'

export const changePage = page => ({ type: TASK_BROWSE_INIT, payload: { page } })
export const getCities = () => ({ type: CITY_BROWSE_INIT })
export const getShopsByCityId = cityId => ({ type: SHOP_BROWSE_REQUEST, payload: { cityId } })
export const getVerifications = () => ({ type: VERIFICATION_BROWSE_INIT })
export const addTask = task => ({ type: TASK_ADD_REQUEST, payload: { task } })
