import constants from 'constants/task'
import initialState from './initialState.json'

export default function analyticsReducer(state = initialState.task, action) {
  const {
    name,
  } = action

  switch (action.type) {
    case constants.SET_NAME:
      return { ...state, name }
    default:
      return state
  }
}
