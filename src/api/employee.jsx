import request from 'utils/axios'

const browse = code => request({
  url: `/employees?personnel_number=${code}`,
  method: 'get',
  responseType: 'json',
})

export default {
  browse,
}
