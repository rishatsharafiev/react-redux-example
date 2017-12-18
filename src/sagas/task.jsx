import { fork, call, take, put, cancelled, cancel } from 'redux-saga/effects'
import { APP_INIT_SUCCESS } from 'constants/auth'
import { TASKS_REQUEST_SUCCESS, TASKS_REQUEST_ERROR } from 'constants/task'
import task from 'api/task'

export function* getTasksFlow() {
  while (true) {
    let errors = {}
    yield take(APP_INIT_SUCCESS)
    const { response, error } = yield call(tasks.tasks)
    if (response && response.data) {
      yield put({ type: TASKS_REQUEST_SUCCESS , payload: { ...response.data } })
    }
    // show errror popup
    if (error) {
      errors = { ...error.response.data }
    }
    yield put({ type: TASKS_REQUEST_ERROR, payload: errors, error: true })
  }
}

export function* test() {
  yield 'test'
}
