import { call, take, put, all, fork, cancel, cancelled } from 'redux-saga/effects'
import {
  SHOP_BROWSE_INIT, SHOP_BROWSE_REQUEST,
  SHOP_BROWSE_REQUEST_ERROR, SHOP_BROWSE_REQUEST_SUCCESS,
  SHOP_BROWSE_CLEAR,
} from 'constants/shop'
import { CITY_BROWSE_REQUEST_SUCCESS } from 'constants/city'
import { LOGOUT_REQUEST } from 'constants/auth'
import shopApi from 'api/shop'

export function* shopBrowseWait() {
  while (true) {
    yield take(CITY_BROWSE_REQUEST_SUCCESS)
    yield put({ type: SHOP_BROWSE_CLEAR })
    yield put({ type: SHOP_BROWSE_INIT })
  }
}

export function* shopBrowse() {
  yield take(SHOP_BROWSE_INIT)
  while (true) {
    const action_request = yield take(SHOP_BROWSE_REQUEST)
    const { cityId } = action_request.payload
    const shop = yield fork(shopBrowseFork, cityId)
    const action = yield take([
      LOGOUT_REQUEST, SHOP_BROWSE_REQUEST_SUCCESS, SHOP_BROWSE_REQUEST_ERROR,
    ])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(shop)
    }
  }
}

export function* shopBrowseFork(cityId) {
  try {
    const { response, error } = yield call(shopApi.browse, cityId)
    if (response && response.data) {
      yield put({ type: SHOP_BROWSE_REQUEST_SUCCESS, payload: { ...response.data } })
    } else if (error) {
      yield put({
        type: SHOP_BROWSE_REQUEST_ERROR,
        payload: { ...error.response.data },
        error: true,
      })
    }
  } catch (error) {
    yield put({ type: SHOP_BROWSE_REQUEST_ERROR, payload: { error }, error: true })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export default function* shopSaga() {
  yield all([
    fork(shopBrowseWait),
    fork(shopBrowse),
  ])
}
