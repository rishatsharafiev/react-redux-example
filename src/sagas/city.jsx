import { call, take, put, all, fork, cancel, cancelled } from 'redux-saga/effects'
import {
  CITY_BROWSE_INIT, CITY_BROWSE_REQUEST,
  CITY_BROWSE_REQUEST_ERROR, CITY_BROWSE_REQUEST_SUCCESS,
} from 'constants/city'
import { LOGOUT_REQUEST } from 'constants/auth'
import cityApi from 'api/city'

export function* cityBrowseWait() {
  while (true) {
    yield take(CITY_BROWSE_INIT)
    yield put({ type: CITY_BROWSE_REQUEST })
  }
}

export function* cityBrowse() {
  while (true) {
    yield take(CITY_BROWSE_REQUEST)
    const city = yield fork(cityBrowseFork)
    const action = yield take([
      LOGOUT_REQUEST, CITY_BROWSE_REQUEST_SUCCESS, CITY_BROWSE_REQUEST_ERROR,
    ])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(city)
    }
  }
}

export function* cityBrowseFork() {
  try {
    const { response, error } = yield call(cityApi.browse)
    if (response && response.data) {
      yield put({ type: CITY_BROWSE_REQUEST_SUCCESS, payload: { ...response.data } })
    } else if (error) {
      yield put({
        type: CITY_BROWSE_REQUEST_ERROR,
        payload: { ...error.response.data },
        error: true,
      })
    }
  } catch (error) {
    yield put({ type: CITY_BROWSE_REQUEST_ERROR, payload: { error }, error: true })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export default function* citySaga() {
  yield all([
    fork(cityBrowseWait),
    fork(cityBrowse),
  ])
}
