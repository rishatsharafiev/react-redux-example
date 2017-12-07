import { all, call } from 'redux-saga/effects'
import { loginFlow, registerFlow, setRole, logoutFlow } from 'sagas/auth'

export default function* rootSaga() {
  yield all([
    call(loginFlow),
    call(registerFlow),
    call(setRole),
    call(logoutFlow),
  ])
}
