import { all, fork, call, put, takeEvery } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import Lockr from 'lockr'
import {
  AUTH_LOGIN_REQUESTED,
  AUTH_LOGIN_SUCCESSFUL,
  AUTH_LOGIN_FAILED,
  AUTH_REGISTER_REQUESTED,
} from 'constants/auth'
import auth from 'api/auth'
import routerHistory from 'utils/history'

function callSaveToken(action) {
  const token = action.payload.token ? `Bearer ${action.payload.token}` : ''
  Lockr.set('Authorization', token)
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

function* submitLogin() {
  yield takeEvery(AUTH_LOGIN_REQUESTED, callSubmitLogin)
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

function* submitRegister() {
  yield takeEvery(AUTH_REGISTER_REQUESTED, callSubmitRegister)
}

function* saveToken() {
  yield takeEvery(AUTH_LOGIN_SUCCESSFUL, callSaveToken)
}

export default function* rootSaga() {
  yield all([
    fork(submitLogin),
    fork(submitRegister),
    fork(saveToken),
  ])
}
