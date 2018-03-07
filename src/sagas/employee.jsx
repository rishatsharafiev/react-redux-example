import { call, take, put, all, fork, cancel, cancelled } from 'redux-saga/effects'
import { change } from 'redux-form'
import {
  EMPLOYEE_BROWSE_REQUEST, EMPLOYEE_BROWSE_REQUEST_SUCCESS, EMPLOYEE_BROWSE_REQUEST_ERROR,
} from 'constants/employee'
import { LOGOUT_REQUEST } from 'constants/auth'
import employeeApi from 'api/employee'

export function* employeeBrowse() {
  while (true) {
    const action_request = yield take(EMPLOYEE_BROWSE_REQUEST)
    const { code } = action_request.payload
    const task = yield fork(employeeBrowseFork, code)
    const action = yield take([
      LOGOUT_REQUEST, EMPLOYEE_BROWSE_REQUEST_SUCCESS, EMPLOYEE_BROWSE_REQUEST_ERROR,
    ])
    if (action.type === LOGOUT_REQUEST) {
      yield cancel(task)
    }
  }
}

export function* employeeBrowseFork(code) {
  try {
    const { response, error } = yield call(employeeApi.browse, code)
    if (response && response.data) {
      if (response.data.data.length >= 1) {
        const employee = response.data.data[0]
        yield put({ type: EMPLOYEE_BROWSE_REQUEST_SUCCESS, payload: { employee } })
        yield put(change('taskEdit', 'employee', employee.full_name))
      }
    } else if (error) {
      yield put({
        type: EMPLOYEE_BROWSE_REQUEST_ERROR,
        payload: { employee: { full_name: 'Сотрудник не найден' } },
        error: true,
      })
    }
  } catch (error) {
    yield put({ type: EMPLOYEE_BROWSE_REQUEST_ERROR, payload: { error }, error: true })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export default function* scannerSaga() {
  yield all([
    fork(employeeBrowse),
  ])
}
