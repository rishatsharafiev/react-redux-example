import axios from 'axios'
import config from 'utils/config'
import Lockr from 'lockr'

const headers = {
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: Lockr.get('Authorization', ''),
}

const client = axios.create({
  baseURL: config.api,
  headers,
  timeout: 1000,
})

const request = options =>
  client(options)
    .then(response => ({ response }))
    .catch(error => ({ error }))

export default request
