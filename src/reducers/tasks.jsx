import initialState from 'reducers/initialState'
import { TASK_BROWSE_REQUEST, TASK_BROWSE_REQUEST_SUCCESS, TASK_BROWSE_REQUEST_ERROR } from 'constants/task'

const tasks = (state = initialState.tasks, action) => {
  switch (action.type) {
    case TASK_BROWSE_REQUEST:
      return {
        ...state,
        meta: {
          isLoading: true,
        },
      }
    case TASK_BROWSE_REQUEST_SUCCESS:
      const {
        data,
        meta: {
          pagination: {
            total,
            per_page: perPage,
            current_page: currentPage,
          },
        },
      } = action.payload

      return {
        ...state,
        data,
        meta: {
          total,
          perPage,
          currentPage,
          isLoading: false,
        },
      }
    case TASK_BROWSE_REQUEST_ERROR:
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
