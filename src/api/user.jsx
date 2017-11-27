import axios from 'axios';

export function getTaskList(name = '') {
  return (dispatch) => {
    dispatch({
      type: constants.SET_NAME,
      name,
    })
  }
}

export default {
  SET_NAME,
}
