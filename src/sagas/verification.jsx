import { call, take, put, all, fork, cancel, cancelled } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import {
  VERIFICATION_BROWSE_INIT, VERIFICATION_BROWSE_REQUEST,
  VERIFICATION_BROWSE_REQUEST_ERROR, VERIFICATION_BROWSE_REQUEST_SUCCESS,
  VERIFICATION_ADD_REQUEST,
  VERIFICATION_ADD_REQUEST_ERROR, VERIFICATION_ADD_REQUEST_SUCCESS,
} from 'constants/verification'
import { LOGOUT_REQUEST } from 'constants/auth'
import verificationApi from 'api/verification'
import { getVerifications } from 'actions/task'

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

export function* verificationAdd() {
  while (true) {
    const action_request = yield take(VERIFICATION_ADD_REQUEST)
    const { verification } = action_request.payload
    const response = yield fork(verificationAddFork, verification)
    const action = yield take([
      LOGOUT_REQUEST, VERIFICATION_ADD_REQUEST_SUCCESS, VERIFICATION_ADD_REQUEST_ERROR,
    ])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(response)
    }
  }
}

export function* verificationAddFork(verification) {
  let errors = {}
  yield put(startSubmit('verificationAdd'))
  try {
    const { response, error } = yield call(verificationApi.add, verification)
    if (response && response.data) {
      yield put({ type: VERIFICATION_ADD_REQUEST_SUCCESS, payload: { ...response.data } })
      yield put(getVerifications())
    } else if (error) {
      errors = error.response.data
      yield put({
        type: VERIFICATION_ADD_REQUEST_ERROR,
        payload: { ...error.response.data },
        error: true,
      })
    }
    yield put(reset('verificationAdd'))
  } catch (error) {
    yield put({ type: VERIFICATION_ADD_REQUEST_ERROR, payload: { error }, error: true })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
  yield put(stopSubmit('verificationAdd', { _error: errors }))
}

export default function* verificationSaga() {
  yield all([
    fork(verificationBrowseWait),
    fork(verificationBrowse),
    fork(verificationAdd),
  ])
}
