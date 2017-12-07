import { all, call } from 'redux-saga/effects'
import { loginFlow, registerFlow, appInitFlow, setRoleFlow, logoutFlow } from 'sagas/auth'

export default function* rootSaga() {
  yield all([
    call(setRoleFlow),
    call(loginFlow),
    call(registerFlow),
    call(logoutFlow),
    call(appInitFlow),
  ])
}
