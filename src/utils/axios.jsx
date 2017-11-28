import axios from 'axios'

const headers = {
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const client = axios.create({
  baseURL: 'http://api.arm.dev/api/',
  headers,
  timeout: 1000,
})

const request = (options, onSuccess, onError) => client(options)
  .then(onSuccess)
  .catch(onError)

export default request
