import { all, fork, call, take, put, cancelled, cancel } from 'redux-saga/effects'
import Lockr from 'lockr'
import { startSubmit, stopSubmit } from 'redux-form'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from 'constants/auth'
import routerHistory from 'utils/history'
import auth from 'api/auth'

function* authorize(email, password) {
  let errors = {}
  try {
    yield put(startSubmit('login'))
    const { response, error } = yield call(auth.login, email, password)
    if (response && response.data && response.data.token) {
      const { token } = response.data
      yield put({ type: LOGIN_SUCCESS, token })
      yield call([Lockr, Lockr.set], 'token', token)
      yield routerHistory.push('/')
      return token
    }
    errors = { ...error.response.data }
    yield put({ type: LOGIN_ERROR, error })
    yield put(stopSubmit('login', { _error: errors }))
  } catch (error) {
    // network error
    yield put({ type: LOGIN_ERROR, error })
    yield put(stopSubmit('login', { _error: errors }))
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
  return false
}

// function* registerFlow() {
//   yield 'register'
// }

function* loginFlow() {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUEST)
    const task = yield fork(authorize, email, password)
    const action = yield take([LOGOUT, LOGIN_ERROR])
    if (action.type === LOGOUT) {
      yield cancel(task)
      yield routerHistory.push('/')
      yield call([Lockr, Lockr.rm], 'token')
    }
  }
}

function* logoutFlow() {
  while (true) {
    yield take(LOGOUT)
    yield call([Lockr, Lockr.rm], 'token')
    yield routerHistory.push('/')
  }
}

export default function* rootSaga() {
  yield all([
    call(loginFlow),
    call(logoutFlow),
  ])
}
