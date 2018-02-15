import { call, take, put, all, fork, cancel, cancelled } from 'redux-saga/effects'
import { reset } from 'redux-form'
import routerHistory from 'utils/history'
import {
  TASK_BROWSE_INIT, TASK_BROWSE_REQUEST, TASK_BROWSE_REQUEST_SUCCESS, TASK_BROWSE_REQUEST_ERROR,
  TASK_ADD_REQUEST, TASK_ADD_REQUEST_SUCCESS, TASK_ADD_REQUEST_ERROR,
  TASK_READ_INIT, TASK_READ_REQUEST, TASK_READ_REQUEST_SUCCESS, TASK_READ_REQUEST_ERROR,
  TASK_EDIT_REQUEST, TASK_EDIT_REQUEST_SUCCESS, TASK_EDIT_REQUEST_ERROR,
} from 'constants/task'
import { LOGOUT_REQUEST, AUTHORIZED } from 'constants/auth'
import taskApi from 'api/task'

export function* taskBrowseWait() {
  let authorized = false
  while (true) {
    if (authorized) {
      const {
        payload: {
          page,
        },
      } = yield take(TASK_BROWSE_INIT)
      yield put({ type: TASK_BROWSE_REQUEST, payload: { page } })
    } else {
      const actions = yield all([
        take(AUTHORIZED),
        take(TASK_BROWSE_INIT),
      ])
      authorized = true
      const {
        payload: {
          page,
        },
      } = actions[1]
      yield put({ type: TASK_BROWSE_REQUEST, payload: { page } })
    }
  }
}

export function* taskBrowse() {
  while (true) {
    const action_request = yield take(TASK_BROWSE_REQUEST)
    const { page } = action_request.payload
    const task = yield fork(taskBrowseFork, page)
    const action = yield take([
      LOGOUT_REQUEST, TASK_BROWSE_REQUEST_SUCCESS, TASK_BROWSE_REQUEST_ERROR,
    ])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(task)
    }
  }
}

export function* taskBrowseFork(page) {
  try {
    const { response, error } = yield call(taskApi.browse, page)
    if (response && response.data) {
      yield put({ type: TASK_BROWSE_REQUEST_SUCCESS, payload: { ...response.data } })
    } else if (error) {
      yield put({
        type: TASK_BROWSE_REQUEST_ERROR,
        payload: { ...error.response.data },
        error: true,
      })
    }
  } catch (error) {
    yield put({ type: TASK_BROWSE_REQUEST_ERROR, payload: { error }, error: true })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* taskAdd() {
  while (true) {
    const action_request = yield take(TASK_ADD_REQUEST)
    const { task } = action_request.payload
    const response = yield fork(taskAddFork, task)
    const action = yield take([
      LOGOUT_REQUEST, TASK_ADD_REQUEST_SUCCESS, TASK_ADD_REQUEST_ERROR,
    ])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(response)
    }
  }
}

export function* taskAddFork(task) {
  try {
    yield put(reset('taskAdd')) // order of that expression can break code
    const { response, error } = yield call(taskApi.add, task)
    if (response && response.data) {
      yield put({ type: TASK_ADD_REQUEST_SUCCESS, payload: { ...response.data } })
      yield call([routerHistory, routerHistory.push], '/tasks')
    } else if (error) {
      yield put({
        type: TASK_ADD_REQUEST_ERROR,
        payload: { ...error.response.data },
        error: true,
      })
    }
  } catch (error) {
    yield put({ type: TASK_ADD_REQUEST_ERROR, payload: { error }, error: true })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* taskReadWait() {
  let authorized = false
  while (true) {
    if (authorized) {
      const {
        payload: {
          taskId,
        },
      } = yield take(TASK_READ_INIT)
      yield put({ type: TASK_READ_REQUEST, payload: { taskId } })
    } else {
      const actions = yield all([
        take(AUTHORIZED),
        take(TASK_READ_INIT),
      ])
      authorized = true
      const {
        payload: {
          taskId,
        },
      } = actions[1]
      yield put({ type: TASK_READ_REQUEST, payload: { taskId } })
    }
  }
}

export function* taskRead() {
  while (true) {
    const action_request = yield take(TASK_READ_REQUEST)
    const { taskId } = action_request.payload
    const response = yield fork(taskReadFork, taskId)
    const action = yield take([
      LOGOUT_REQUEST, TASK_READ_REQUEST_SUCCESS, TASK_READ_REQUEST_ERROR,
    ])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(response)
    }
  }
}

export function* taskReadFork(taskId) {
  try {
    const { response, error } = yield call(taskApi.read, taskId)
    if (response && response.data) {
      yield put({ type: TASK_READ_REQUEST_SUCCESS, payload: { ...response.data, taskId } })
      // put new updated task in state
    } else if (error) {
      yield put({
        type: TASK_READ_REQUEST_ERROR,
        payload: { ...error.response.data },
        error: true,
      })
    }
  } catch (error) {
    yield put({ type: TASK_READ_REQUEST_ERROR, payload: { error }, error: true })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* taskEdit() {
  while (true) {
    const action_request = yield take(TASK_EDIT_REQUEST)
    const { taskId, task } = action_request.payload
    const response = yield fork(tasEditFork, taskId, task)
    const action = yield take([
      LOGOUT_REQUEST, TASK_EDIT_REQUEST_SUCCESS, TASK_EDIT_REQUEST_ERROR,
    ])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(response)
    }
  }
}

export function* tasEditFork(taskId, task) {
  try {
    const { response, error } = yield call(taskApi.edit, taskId, task)
    if (response && response.data) {
      yield put({ type: TASK_EDIT_REQUEST_SUCCESS, payload: { ...response.data } })
      // put new updated task in state
    } else if (error) {
      yield put({
        type: TASK_EDIT_REQUEST_ERROR,
        payload: { ...error.response.data },
        error: true,
      })
    }
  } catch (error) {
    yield put({ type: TASK_EDIT_REQUEST_ERROR, payload: { error }, error: true })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export default function* taskSaga() {
  yield all([
    fork(taskBrowseWait),
    fork(taskBrowse),
    fork(taskAdd),
    fork(taskReadWait),
    fork(taskRead),
    fork(taskEdit),
  ])
}
