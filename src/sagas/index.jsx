// import api from 'api/auth'
// import { call, put, takeLatest } from `redux-saga/effects`

// function* fetchUser(action) {
//   try {
//     const response = yield call(api.login, action.payload)
//     yield put({type: 'USER_FETCHED'})
//   }

//   const token = response.data.token ? `Bearer ${response.data.token}` : ''
// }

export default function* sagas() {
  // yield takeLatest('USER_REQUESTED', fetchUser)
  console.log('sagas')
  yield null
}
