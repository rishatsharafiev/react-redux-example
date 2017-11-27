import constants from 'constants/task'

export function setTaskName(name = '') {
  return {
    type: constants.SET_NAME,
    name,
  }
}

export default {
  setTaskName,
}
