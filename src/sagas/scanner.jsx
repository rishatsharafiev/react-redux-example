import { take, put, all, fork, select } from 'redux-saga/effects'
import { change } from 'redux-form'
import { SCANNER_RESULT } from 'constants/scanner'
import { getReadData } from 'selectors/scanner'

export function* scannerResult() {
  while (true) {
    yield take(SCANNER_RESULT)
    const { code } = yield select(getReadData)
    yield put(change('taskEdit', 'signature', code))
  }
}

export default function* scannerSaga() {
  yield all([
    fork(scannerResult),
  ])
}
