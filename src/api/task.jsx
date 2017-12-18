import Lockr from 'lockr'
import request from 'utils/axios'

const tasks = (page) => request({
  url: `/tasks?page${page}`,
  method: 'get',
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${Lockr.get('token', '')}`,
  },
})

export default {
  tasks,
}
