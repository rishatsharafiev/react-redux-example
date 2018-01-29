import { call, take, put, all, fork } from 'redux-saga/effects'
import axios from 'axios'
import Lockr from 'lockr'
import appApi from 'api/app'
import {
  APP_INIT, APP_SUCCESS, APP_ERROR,
  TOKEN_INIT, TOKEN_FILLED, TOKEN_EMTPY,
  ROLE_INIT, ROLE_REQUEST, ROLE_REQUEST_SUCCESS, ROLE_REQUEST_ERROR,
  POPUP_SHOW_ERROR,
} from 'constants/app'
import { TASK_LIST_INIT, TASK_INSTANCE_INIT } from 'constants/task'
import { LOGIN_REQUEST_SUCCESS, LOGOUT_INIT, LOGOUT_REQUEST, AUTHORIZED } from 'constants/auth'

export function* appAuthorized() {
  while (true) {
    yield take(AUTHORIZED)
    yield put({ type: TASK_LIST_INIT })
    yield put({ type: TASK_INSTANCE_INIT })
  }
}

export function* appSuccess() {
  while (true) {
    const action = yield take(ROLE_REQUEST_SUCCESS)
    yield put({ ...action, type: APP_SUCCESS })
  }
}

export function* appError() {
  while (true) {
    const action = yield take(ROLE_REQUEST_ERROR)
    if (action.type === ROLE_REQUEST_ERROR) {
      yield call([Lockr, Lockr.rm], 'token')
    }
    yield put({ ...action, type: APP_ERROR })
  }
}

export function* popupShowError() {
  while (true) {
    const action = yield take(APP_ERROR)
    yield put({ ...action, type: POPUP_SHOW_ERROR })
    // TODO: popup mechanism implementaion
  }
}

export function* logoutInit() {
  while (true) {
    yield take(APP_ERROR)
    yield put({ type: LOGOUT_INIT })
    yield put({ type: LOGOUT_REQUEST })
  }
}

export function* tokenWait() {
  while (true) {
    yield take([APP_INIT, LOGIN_REQUEST_SUCCESS, APP_ERROR])
    yield put({ type: TOKEN_INIT })
  }
}

export function* tokenApply() {
  while (true) {
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

export function* roleTokenFilled() {
  while (true) {
    yield take(TOKEN_FILLED)
    yield put({ type: ROLE_INIT })
  }
}

export function* roleWait() {
  while (true) {
    yield take(ROLE_INIT)
    yield put({ type: ROLE_REQUEST })
  }
}

export function* role() {
  while (true) {
    yield take(ROLE_REQUEST)
    try {
      const { response, error } = yield call(appApi.authenticatedUser)
      if (response && response.data) {
        yield put({ type: ROLE_REQUEST_SUCCESS, payload: { ...response.data } })
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
    fork(appAuthorized),
    fork(appSuccess),
    fork(appError),
    fork(popupShowError),
    fork(logoutInit),
    fork(tokenWait),
    fork(tokenApply),
    fork(roleTokenFilled),
    fork(roleWait),
    fork(role),
  ])
}
