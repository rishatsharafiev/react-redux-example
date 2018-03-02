import { call, take, put, all, fork, cancel, cancelled } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import {
  VIOLATION_BROWSE_INIT, VIOLATION_BROWSE_REQUEST,
  VIOLATION_BROWSE_REQUEST_ERROR, VIOLATION_BROWSE_REQUEST_SUCCESS,
  VIOLATION_ADD_REQUEST,
  VIOLATION_ADD_REQUEST_ERROR, VIOLATION_ADD_REQUEST_SUCCESS,
} from 'constants/violation'
import { LOGOUT_REQUEST } from 'constants/auth'
import violationApi from 'api/violation'
import { getViolations } from 'actions/task'

export function* violationBrowseWait() {
  while (true) {
    yield take(VIOLATION_BROWSE_INIT)
    yield put({ type: VIOLATION_BROWSE_REQUEST })
  }
}

export function* violationBrowse() {
  while (true) {
    yield take(VIOLATION_BROWSE_REQUEST)
    const VIOLATION = yield fork(violationBrowseFork)
    const action = yield take([
      LOGOUT_REQUEST, VIOLATION_BROWSE_REQUEST_SUCCESS, VIOLATION_BROWSE_REQUEST_ERROR,
    ])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(VIOLATION)
    }
  }
}

export function* violationBrowseFork() {
  try {
    const { response, error } = yield call(violationApi.browse)
    if (response && response.data) {
      yield put({ type: VIOLATION_BROWSE_REQUEST_SUCCESS, payload: { ...response.data } })
    } else if (error) {
      yield put({
        type: VIOLATION_BROWSE_REQUEST_ERROR,
        payload: { ...error.response.data },
        error: true,
      })
    }
  } catch (error) {
    yield put({ type: VIOLATION_BROWSE_REQUEST_ERROR, payload: { error }, error: true })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* violationAdd() {
  while (true) {
    const action_request = yield take(VIOLATION_ADD_REQUEST)
    const { violation } = action_request.payload
    const response = yield fork(violationAddFork, violation)
    const action = yield take([
      LOGOUT_REQUEST, VIOLATION_ADD_REQUEST_SUCCESS, VIOLATION_ADD_REQUEST_ERROR,
    ])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(response)
    }
  }
}

export function* violationAddFork(violation) {
  let errors = {}
  yield put(startSubmit('violationAdd'))
  try {
    const { response, error } = yield call(violationApi.add, violation)
    if (response && response.data) {
      yield put({ type: VIOLATION_ADD_REQUEST_SUCCESS, payload: { ...response.data } })
      yield put(getViolations())
    } else if (error) {
      errors = error.response.data
      yield put({
        type: VIOLATION_ADD_REQUEST_ERROR,
        payload: { ...error.response.data },
        error: true,
      })
    }
    yield put(reset('violationAdd'))
  } catch (error) {
    yield put({ type: VIOLATION_ADD_REQUEST_ERROR, payload: { error }, error: true })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
  yield put(stopSubmit('violationAdd', { _error: errors }))
}

export default function* violationSaga() {
  yield all([
    fork(violationBrowseWait),
    fork(violationBrowse),
    fork(violationAdd),
  ])
}
