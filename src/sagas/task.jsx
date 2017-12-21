import { call, take, put, all, fork, cancel, cancelled } from 'redux-saga/effects'
import {
  TASK_LIST_INIT, TASK_LIST_REQUEST,
  TASK_LIST_REQUEST_SUCCESS, TASK_LIST_REQUEST_ERROR,
} from 'constants/task'
import { LOGOUT_REQUEST } from 'constants/auth'
import taskApi from 'api/task'

export function* taskListWait() {
  while (true) {
    yield take(TASK_LIST_INIT)
    yield put({ type: TASK_LIST_REQUEST, payload: { page: 1 } })
  }
}

export function* taskList() {
  while (true) {
    const action_request = yield take(TASK_LIST_REQUEST)
    const { page } = action_request.payload
    const task = yield fork(taskListFork, page)
    const action = yield take([LOGOUT_REQUEST, TASK_LIST_REQUEST_SUCCESS, TASK_LIST_REQUEST_ERROR])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(task)
    }
  }
}


export function* taskListFork(page) {
  try {
    const { response, error } = yield call(taskApi.list, page)
    if (response && response.data) {
      yield put({ type: TASK_LIST_REQUEST_SUCCESS, payload: { ...response.data } })
    } else if (error) {
      yield put({ type: TASK_LIST_REQUEST_ERROR, payload: { ...error.response.data }, error: true })
    }
  } catch (error) {
    yield put({ type: TASK_LIST_REQUEST_ERROR, payload: { error }, error: true })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export default function* taskSaga() {
  yield all([
    fork(taskListWait),
    fork(taskList),
  ])
}
