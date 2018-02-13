import { call, take, put, all, fork, cancel, cancelled } from 'redux-saga/effects'
import {
  TASK_BROWSE_INIT, TASK_BROWSE_REQUEST,
  TASK_BROWSE_REQUEST_SUCCESS, TASK_BROWSE_REQUEST_ERROR,
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

export default function* taskSaga() {
  yield all([
    fork(taskBrowseWait),
    fork(taskBrowse),
  ])
}
