import { call, take, put, all } from 'redux-saga/effects'
import axios from 'axios'
import Lockr from 'lockr'
import app from 'api/app'
import {
  APP_INIT, APP_SUCCESS, APP_ERROR,
  TOKEN_INIT, TOKEN_FILLED, TOKEN_EMTPY,
  ROLE_INIT, ROLE_REQUEST, ROLE_REQUEST_SUCCESS, ROLE_REQUEST_ERROR,
  POPUP_SHOW_ERROR,
} from 'constants/app'
import { TASK_LIST_INIT, TASK_INSTANCE_INIT } from 'constants/task'
import { LOGIN_REQUEST_SUCCESS, LOGOUT_REQUEST } from 'constants/auth'

export function* appInit() {
  while (true) {
    const action = yield take([APP_SUCCESS, APP_ERROR])
    if (action.type === APP_SUCCESS) {
      yield put({ type: TASK_LIST_INIT })
      yield put({ type: TASK_INSTANCE_INIT })
    } else if (action.type === APP_ERROR) {
      yield put({ type: POPUP_SHOW_ERROR })
    }
  }
}

export function* appSuccess() {
  const action = yield take(ROLE_REQUEST_SUCCESS)
  yield put({ ...action, type: APP_SUCCESS })
}

export function* appError() {
  const action = yield take(ROLE_REQUEST_ERROR)
  yield put({ ...action, type: APP_ERROR })
}

export function* tokenInit() {
  while (true) {
    yield take([APP_INIT, LOGIN_REQUEST_SUCCESS, LOGOUT_REQUEST])
    yield put.resolve({ type: TOKEN_INIT })
    yield take(TOKEN_INIT)
    const token = yield call([Lockr, Lockr.get], 'token')
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      yield put({ type: TOKEN_FILLED, payload: { token } })
    } else {
      yield put({ type: TOKEN_EMTPY, payload: {}, error: true })
    }
  }
}

export function* roleInit() {
  while (true) {
    yield take(TOKEN_FILLED)
    yield put.resolve({ type: ROLE_INIT })
    yield take(ROLE_INIT)
    yield put.resolve({ type: ROLE_REQUEST })
    try {
      const { response, error } = yield call(app.authenticatedUser)
      if (response && response.data) {
        yield put({ type: ROLE_REQUEST_SUCCESS, payload: { ...response } })
      } else if (error) {
        yield put({ type: ROLE_REQUEST_ERROR, payload: { ...error }, error: true })
      }
    } catch (error) {
      // network error
      yield put({ type: ROLE_REQUEST_ERROR, payload: { error }, error: true })
    }
  }
}

export default function* appSaga() {
  yield all([
    call(appInit),
    call(appSuccess),
    call(appError),
    call(tokenInit),
    call(roleInit),
  ])
}
