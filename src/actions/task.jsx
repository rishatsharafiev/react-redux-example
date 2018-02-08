import { TASK_BROWSE_REQUEST } from 'constants/task'

export const changePage = page => ({ type: TASK_BROWSE_REQUEST, payload: { page } })
export default () => {}
