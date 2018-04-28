import { take, put, all, fork, select } from 'redux-saga/effects'
import { change, getFormValues } from 'redux-form'
import { SCANNER_RESULT } from 'constants/scanner'
import { EMPLOYEE_BROWSE_REQUEST } from 'constants/employee'
import { getReadData } from 'selectors/scanner'

export function* scannerResult() {
  while (true) {
    yield take(SCANNER_RESULT)
    const { code } = yield select(getReadData)
    yield put(change('taskEdit', 'signature', code))
    yield put({ type: EMPLOYEE_BROWSE_REQUEST, payload: { code } })
  }
}

export function* scannerChange() {
  let prevSignature = ''
  while (true) {
    const action = yield take('@@redux-form/CHANGE')
    if (action.meta.form === 'taskEdit') {
      const { signature } = yield select(getFormValues('taskEdit'))
      if (signature && prevSignature !== signature && signature.length === 10) {
        prevSignature = signature
        yield put({
          type: EMPLOYEE_BROWSE_REQUEST,
          payload: { code: signature },
        })
      }
    }
  }
}

export default function* scannerSaga() {
  yield all([
    fork(scannerResult),
    fork(scannerChange),
  ])
}
