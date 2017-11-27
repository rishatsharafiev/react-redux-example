import constants from 'constants/task'

export function setTaskName(name = '') {
  return (dispatch) => {
    dispatch({
      type: constants.SET_NAME,
      name,
    })
  }
}

export default {
  setTaskName,
}
