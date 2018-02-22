import { call, take, put, all, fork, cancel, cancelled } from 'redux-saga/effects'
import {
  VIOLATION_BROWSE_INIT, VIOLATION_BROWSE_REQUEST,
  VIOLATION_BROWSE_REQUEST_ERROR, VIOLATION_BROWSE_REQUEST_SUCCESS,
} from 'constants/violation'
import { LOGOUT_REQUEST } from 'constants/auth'
import violationApi from 'api/violation'

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

export default function* violationSaga() {
  yield all([
    fork(violationBrowseWait),
    fork(violationBrowse),
  ])
}
