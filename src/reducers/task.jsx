import initialState from 'reducers/initialState'
import {
  TASK_BROWSE_REQUEST, TASK_BROWSE_REQUEST_SUCCESS, TASK_BROWSE_REQUEST_ERROR,
  TASK_READ_REQUEST, TASK_READ_REQUEST_SUCCESS, TASK_READ_REQUEST_ERROR,
  TASK_STATUS_REQUEST, TASK_STATUS_REQUEST_SUCCESS, TASK_STATUS_REQUEST_ERROR,
} from 'constants/task'
import { SCANNER_RESULT } from 'constants/scanner'

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
        edit: {
          ...state.edit,
          meta: {
            isLoading: true,
          },
        },
      }
    case TASK_READ_REQUEST_SUCCESS:
      const {
        data: readData,
        taskId: readTaskId,
      } = action.payload

      return {
        ...state,
        edit: {
          data: readData,
          meta: {
            taskId: readTaskId,
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
    case TASK_STATUS_REQUEST:
      return {
        ...state,
        edit: {
          ...state.edit,
          meta: {
            isLoading: true,
          },
        },
      }
    case TASK_STATUS_REQUEST_SUCCESS:
      const {
        data: statusData,
        taskId: statusTaskId,
      } = action.payload

      return {
        ...state,
        edit: {
          data: statusData,
          meta: {
            taskId: statusTaskId,
            isLoading: false,
          },
        },
      }
    case TASK_STATUS_REQUEST_ERROR:
      return {
        ...state,
        edit: {
          meta: {
            isLoading: false,
          },
        },
      }
    case SCANNER_RESULT:
      const {
        code,
      } = action.payload
      return {
        ...state,
        edit: {
          ...state.edit,
          data: {
            ...state.edit.data,
            signature: code,
          },
        },
      }
    default:
      return state
  }
}

export default task
