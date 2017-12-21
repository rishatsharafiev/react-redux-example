import initialState from 'reducers/initialState'
import { TASK_LIST_REQUEST, TASK_LIST_REQUEST_SUCCESS, TASK_LIST_REQUEST_ERROR } from 'constants/task'

const tasks = (state = initialState.tasks, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return {
        ...state,
        meta: {
          isLoading: true,
        },
      }
    case TASK_LIST_REQUEST_SUCCESS:
      const {
        data,
        meta: {
          pagination: {
            total,
            count: pageSize,
            current_page: currentPage,
          },
        },
      } = action.payload

      return {
        ...state,
        data,
        meta: {
          total,
          pageSize,
          currentPage,
          isLoading: false,
        },
      }
    case TASK_LIST_REQUEST_ERROR:
      return {
        ...state,
        meta: {
          isLoading: false,
        },
      }
    default:
      return state
  }
}

export default tasks
