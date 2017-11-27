export function setTaskName(name = '') {
  return {
    type: 'TASK_SET_NAME',
    name,
  }
}

export default {
  setTaskName,
}
