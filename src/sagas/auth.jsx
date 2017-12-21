import { fork, call, take, put, cancelled, cancel, all } from 'redux-saga/effects'
import Lockr from 'lockr'
import auth from 'api/auth'
import routerHistory from 'utils/history'
import { startSubmit, stopSubmit } from 'redux-form'
import {
  APP_INIT, APP_SUCCESS,
  TOKEN_INIT, TOKEN_EMTPY,
} from 'constants/app'
import {
  LOGIN_INIT, LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_ERROR,
  REGISTER_INIT, REGISTER_REQUEST, REGISTER_REQUEST_SUCCESS, REGISTER_REQUEST_ERROR,
  LOGOUT_INIT, LOGOUT_REQUEST,
  AUTHORIZED,
} from 'constants/auth'

export function* loginWait() {
  while (true) {
    yield take([APP_INIT, TOKEN_EMTPY, LOGIN_REQUEST_ERROR])
    yield put({ type: LOGIN_INIT })
  }
}

export function* login() {
  while (true) {
    yield take(LOGIN_INIT)
    const {
      payload: {
        email, password,
      },
    } = yield take(LOGIN_REQUEST)
    const task = yield fork(loginFork, email, password)
    const action = yield take([LOGOUT_REQUEST, LOGIN_REQUEST_ERROR])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(task)
    }
  }
}

export function* loginFork(email, password) {
  try {
    yield put(startSubmit('login'))
    const { response, error } = yield call(auth.login, email, password)
    if (response && response.data && response.data.token) {
      const { token } = response.data
      yield call([Lockr, Lockr.set], 'token', token)
      yield put({ type: LOGIN_REQUEST_SUCCESS, payload: { token } })
      yield call([routerHistory, routerHistory.push], '/')
    }
    const errors = { ...error.response.data }
    yield put({ type: LOGIN_REQUEST_ERROR, payload: { error }, error: true })
    yield put(stopSubmit('login', { _error: errors }))
  } catch (error) {
    // network error
    yield put({ type: LOGIN_REQUEST_ERROR, payload: { error }, error: true })
    yield put(stopSubmit('login', { _error: error }))
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* registerWait() {
  while (true) {
    yield take([APP_INIT, REGISTER_REQUEST_ERROR])
    yield put({ type: REGISTER_INIT })
  }
}

export function* register() {
  while (true) {
    yield take(REGISTER_INIT)
    const {
      payload: {
        name, email, password, password_confirmation,
      },
    } = yield take(REGISTER_REQUEST)
    const task = yield fork(registerFork, name, email, password, password_confirmation)
    const action = yield take([LOGOUT_REQUEST, REGISTER_REQUEST_ERROR])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(task)
    }
  }
}

export function* registerFork(name, email, password, password_confirmation) {
  try {
    yield put(startSubmit('register'))
    const { response, error } = yield call(
      auth.register,
      name,
      email,
      password,
      password_confirmation,
    )
    if (response && response.data && response.data.token) {
      const { token } = response.data
      yield put({ type: REGISTER_REQUEST_SUCCESS, payload: { token } })
      yield call([routerHistory, routerHistory.push], '/login')
    }
    const errors = { ...error.response.data }
    yield put({ type: REGISTER_REQUEST_ERROR, payload: { error }, error: true })
    yield put(stopSubmit('register', { _error: errors }))
  } catch (error) {
    // network error
    yield put({ type: REGISTER_REQUEST_ERROR, payload: { error }, error: true })
    yield put(stopSubmit('register', { _error: error }))
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* authorized() {
  while (true) {
    yield take(LOGIN_REQUEST_SUCCESS)
    yield take(APP_SUCCESS)
    yield put({ type: AUTHORIZED })
  }
}

export function* logoutWait() {
  while (true) {
    yield take(APP_SUCCESS)
    yield put({ type: LOGOUT_INIT })
  }
}

export function* logout() {
  while (true) {
    yield take(LOGOUT_INIT)
    yield take(LOGOUT_REQUEST)
    yield call([Lockr, Lockr.rm], 'token')
    yield put({ type: TOKEN_INIT })
    yield call(routerHistory.push, '/login')
  }
}

export default function* authSaga() {
  yield all([
    fork(loginWait),
    fork(login),
    fork(registerWait),
    fork(register),
    fork(authorized),
    fork(logoutWait),
    fork(logout),
  ])
}
