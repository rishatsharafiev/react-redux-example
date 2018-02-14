import request from 'utils/axios'

const browse = cityId => request({
  url: `/shops/?city=${cityId}`,
  method: 'get',
  responseType: 'json',
})

export default {
  browse,
}
