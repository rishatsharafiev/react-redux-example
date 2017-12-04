import { SET_NAME } from 'constants/task'
import initialState from 'reducers/initialState'

export default function analyticsReducer(state = initialState.task, action) {
  const {
    name,
  } = action

  switch (action.type) {
    case SET_NAME:
      return { ...state, name }
    default:
      return state
  }
}
