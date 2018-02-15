import initialState from 'reducers/initialState'
import {
  TASK_BROWSE_REQUEST, TASK_BROWSE_REQUEST_SUCCESS, TASK_BROWSE_REQUEST_ERROR,
  TASK_READ_REQUEST, TASK_READ_REQUEST_SUCCESS, TASK_READ_REQUEST_ERROR,
} from 'constants/task'

const task = (state = initialState.task, action) => {
  switch (action.type) {
    case TASK_BROWSE_REQUEST:
      return {
        ...state,
        browse: {
          ...state.browse,
          meta: {
            isLoading: true,
          },
        },
      }
    case TASK_BROWSE_REQUEST_SUCCESS:
      const {
        data: browserData,
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
        browse: {
          data: browserData,
          meta: {
            total,
            perPage,
            currentPage,
            isLoading: false,
          },
        },
      }
    case TASK_BROWSE_REQUEST_ERROR:
      return {
        ...state,
        browse: {
          meta: {
            isLoading: false,
          },
        },
      }
    case TASK_READ_REQUEST:
      return {
        ...state,
        read: {
          ...state.read,
          meta: {
            isLoading: true,
          },
        },
      }
    case TASK_READ_REQUEST_SUCCESS:
      const {
        data: readData,
        taskId,
      } = action.payload

      return {
        ...state,
        edit: {
          data: readData,
          meta: {
            taskId,
            isLoading: false,
          },
        },
      }
    case TASK_READ_REQUEST_ERROR:
      return {
        ...state,
        edit: {
          meta: {
            isLoading: false,
          },
        },
      }
    default:
      return state
  }
}

export default task
