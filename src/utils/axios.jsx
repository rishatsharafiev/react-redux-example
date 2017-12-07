import axios from 'axios'
import config from 'utils/config'

const headers = {
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
  'Content-Type': 'application/json',
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
