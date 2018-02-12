import { call, take, put, all, fork, cancel, cancelled } from 'redux-saga/effects'
import {
  VERIFICATION_BROWSE_INIT, VERIFICATION_BROWSE_REQUEST,
  VERIFICATION_BROWSE_REQUEST_ERROR, VERIFICATION_BROWSE_REQUEST_SUCCESS,
} from 'constants/verification'
import { LOGOUT_REQUEST } from 'constants/auth'
import verificationApi from 'api/verification'

export function* verificationBrowseWait() {
  while (true) {
    yield take(VERIFICATION_BROWSE_INIT)
    yield put({ type: VERIFICATION_BROWSE_REQUEST })
  }
}

export function* verificationBrowse() {
  while (true) {
    yield take(VERIFICATION_BROWSE_REQUEST)
    const verification = yield fork(verificationBrowseFork)
    const action = yield take([
      LOGOUT_REQUEST, VERIFICATION_BROWSE_REQUEST_SUCCESS, VERIFICATION_BROWSE_REQUEST_ERROR,
    ])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(verification)
    }
  }
}

export function* verificationBrowseFork() {
  try {
    const { response, error } = yield call(verificationApi.browse)
    if (response && response.data) {
      yield put({ type: VERIFICATION_BROWSE_REQUEST_SUCCESS, payload: { ...response.data } })
    } else if (error) {
      yield put({
        type: VERIFICATION_BROWSE_REQUEST_ERROR,
        payload: { ...error.response.data },
        error: true,
      })
    }
  } catch (error) {
    yield put({ type: VERIFICATION_BROWSE_REQUEST_ERROR, payload: { error }, error: true })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export default function* verificationSaga() {
  yield all([
    fork(verificationBrowseWait),
    fork(verificationBrowse),
  ])
}
