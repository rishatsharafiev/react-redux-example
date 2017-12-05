import { all, fork, call, put, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import Lockr from 'lockr'
import {
  AUTH_LOGIN_REQUESTED,
  AUTH_LOGIN_SUCCESSFUL,
  AUTH_LOGIN_FAILED,
  AUTH_REGISTER_REQUESTED,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESSFUL,
  AUTH_SET_TOKEN,
} from 'constants/auth'
import {
  setToken,
  setRole,
} from 'actions/auth'
import auth from 'api/auth'
import routerHistory from 'utils/history'

function* callAuthenticatedUser() {
  const { response, error } = yield call(auth.authenticatedUser)
  if (response) {
    yield put(setRole(response.data))
  } else {
    console.log(error)
  }
}

function* callSaveToken(action) {
  const token = action.payload.token ? `Bearer ${action.payload.token}` : ''
  Lockr.set('Authorization', token)
  if (token) {
    yield put(setToken({ token }))
    redirect()
  }
}

function* callLogout() {
  Lockr.set('Authorization', '')
  yield put({ type: AUTH_LOGOUT_SUCCESSFUL })
  redirect()
}

function redirect() {
  routerHistory.push('/')
}

function* callSubmitLogin(action) {
  yield put(startSubmit('login'))
  let errors = {}
  const { response, error } = yield call(auth.login, action.payload)
  if (response && response.data && response.data.token) {
    yield put({ type: AUTH_LOGIN_SUCCESSFUL, payload: response.data })
  } else {
    yield put({ type: AUTH_LOGIN_FAILED })
    errors = { ...error.response.data }
  }
  yield put(stopSubmit('login', { _error: errors }))
}

function* callSubmitRegister(action) {
  yield put(startSubmit('register'))
  let errors = {}
  const { response, error } = yield call(auth.register, action.payload)
  if (response) {
    yield call(routerHistory.push, '/')
  } else {
    errors = { ...error.response.data }
  }
  yield put(stopSubmit('register', { _error: errors }))
}

function* submitLogin() {
  yield takeEvery(AUTH_LOGIN_REQUESTED, callSubmitLogin)
}

function* submitRegister() {
  yield takeEvery(AUTH_REGISTER_REQUESTED, callSubmitRegister)
}

function* saveToken() {
  yield takeEvery(AUTH_LOGIN_SUCCESSFUL, callSaveToken)
}

function* saveRole() {
  yield takeEvery(AUTH_SET_TOKEN, callAuthenticatedUser)
}

function* logoutSaga() {
  yield takeEvery(AUTH_LOGOUT, callLogout)
}

export default function* rootSaga() {
  yield all([
    fork(submitLogin),
    fork(submitRegister),
    fork(saveToken),
    fork(saveRole),
    fork(callAuthenticatedUser),
    fork(logoutSaga),
  ])
}
