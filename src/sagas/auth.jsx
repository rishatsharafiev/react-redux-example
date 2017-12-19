import { fork, call, take, put, cancelled, cancel, all } from 'redux-saga/effects'
import Lockr from 'lockr'
import auth from 'api/auth'
import routerHistory from 'utils/history'
import { startSubmit, stopSubmit } from 'redux-form'
import {
  APP_INIT,
  TOKEN_INIT, TOKEN_EMTPY,
} from 'constants/app'
import {
  LOGIN_INIT, LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_ERROR,
  REGISTER_INIT, REGISTER_REQUEST, REGISTER_REQUEST_SUCCESS, REGISTER_REQUEST_ERROR,
  LOGOUT_INIT, LOGOUT_REQUEST,
} from 'constants/auth'

export function* loginInit() {
  while (true) {
    yield take(TOKEN_EMTPY)
    yield put.resolve({ type: LOGIN_INIT })
    yield take(LOGIN_INIT)
    const action2 = yield take(LOGIN_REQUEST)
    console.log(action2)
    const task = yield fork(login, '', '')
    const action = yield take([LOGOUT_INIT, LOGIN_REQUEST_ERROR])
    if (action.type === LOGOUT_INIT) {
      yield cancel(task)
    }
  }
}

export function* login(email, password) {
  let errors = {}
  try {
    yield put(startSubmit('login'))
    const { response, error } = yield call(auth.login, email, password)
    if (response && response.data && response.data.token) {
      const { token } = response.data
      yield call([Lockr, Lockr.set], 'token', token)
      yield put({ type: LOGIN_REQUEST_SUCCESS, payload: { token } })
      yield call([routerHistory, routerHistory.push], '/')
    }
    errors = { ...error.response.data }
    yield put({ type: LOGIN_REQUEST_ERROR, payload: { error }, error: true })
    yield put(stopSubmit('login', { _error: errors }))
  } catch (error) {
    // network error
    yield put({ type: LOGIN_REQUEST_ERROR, payload: { error }, error: true })
    yield put(stopSubmit('login', { _error: errors }))
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* registerInit() {
  while (true) {
    yield take(APP_INIT)
    yield put.resolve({ type: REGISTER_INIT })
    yield take(REGISTER_INIT)
    const {
      payload: {
        name, email, password, password_confirmation,
      },
    } = yield take(REGISTER_REQUEST)
    const task = yield fork(register, name, email, password, password_confirmation)
    const action = yield take([REGISTER_INIT, REGISTER_REQUEST_ERROR])
    if (action.type === LOGOUT_INIT) {
      yield cancel(task)
    }
  }
}

export function* register(name, email, password, password_confirmation) {
  let errors = {}
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
    errors = { ...error.response.data }
    yield put({ type: REGISTER_REQUEST_ERROR, payload: { error }, error: true })
    yield put(stopSubmit('register', { _error: errors }))
  } catch (error) {
    // network error
    yield put({ type: REGISTER_REQUEST_ERROR, payload: { error }, error: true })
    yield put(stopSubmit('register', { _error: errors }))
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* logout() {
  while (true) {
    yield take(LOGOUT_INIT)
    yield put.resolve({ type: LOGOUT_REQUEST })
    yield take(LOGOUT_REQUEST)
    // TODO: call logout api
    yield call([Lockr, Lockr.rm], 'token')
    yield put({ type: TOKEN_INIT })
  }
}

export default function* authSaga() {
  yield all([
    call(loginInit),
    call(registerInit),
    call(logout),
  ])
}
