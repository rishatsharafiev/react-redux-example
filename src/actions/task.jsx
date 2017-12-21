import { TASK_LIST_REQUEST } from 'constants/task'

export const changeCurrentPage = page => ({ type: TASK_LIST_REQUEST, payload: { page } })
export default () => {}
