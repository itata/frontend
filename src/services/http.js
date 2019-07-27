import _ from 'lodash'
import axios from 'axios'
import {
  ERROR_MSG
} from './error'
import conf from '../config'
import notify from './notify'
import appStore, {
  AUTH_MUTATION
} from '../store/app'
import tracking from '../misc/tracking'

export class HttpResponse {
  static error(error, method, url, errorMsg) {
    console.warn(`Error [${method}] to ${url}`, error)
    this.errorObj = _.isObject(error) ? error : {}
    let res = new HttpResponse(this.errorObj, this.errorObj)
    return res
  }
  static success(data) {
    return new HttpResponse(data)
  }
  constructor(data, error, errorObj, msg) {
    data = !_.isNull(data) && !_.isUndefined(data) ? data : {}
    this.error = (data.error ? data.error : error) || false
    this.errorObj = _.isObject(errorObj) ? errorObj : {}
    this.msg = msg
    this.data = data
    if (this.error) {
      tracking.error(`RESPONSE: ${JSON.stringify(data)} \n ERROR_OBJ: ${JSON.stringify(errorObj)} \n ERROR_MSG: ${msg}`)
    }
  }
  get isEmpty() {
    return _.isEmpty(this.data)
  }
  get errorMsg() {
    return ERROR_MSG[this.errorObj.reason] 
            ? ERROR_MSG[this.errorObj.reason] 
            : this.msg 
              ? this.msg 
              : 'Unknown error'
  }
}

const HTTP_METHOD = {
  get: 'get',
  post: 'post',
  delete: 'delete',
  put: 'put'
}

const processHttp = (method, url, data, config) => {
  return axios({
    method: method,
    url: `${conf.api}${url}`,
    data: data,
    withCredentials: true,
    ...config
  }).then(response => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[${method}]`, `${conf.api}${url}`, data || '')
    }
    if (response.status === 401) {
      //unauth
      appStore.commit(AUTH_MUTATION.not_auth)
      return HttpResponse.error(response, method, url)
    }
    if (_.isObject(response) && _.isObject(response.data)) {
      let message = ''
      if (!_.isUndefined(response.data.m)) {
        message = response.data.m
      }
      return new HttpResponse(response.data.data, response.data.code < 1, response.data.error, message)
    } else {
      return HttpResponse.error(response, method, url)
    }
  }).catch(error => {
    if (error.response && error.response.status === 401) {
      notify.error('Session expired or invalid')
      appStore.commit(AUTH_MUTATION.not_auth)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
    } else {
      // Something happened in setting up the request that triggered an Error
    }
    return Promise.resolve(HttpResponse.error(error, method, url, error.message))
  })
}

export const http = {
  get: (url, config) => processHttp(HTTP_METHOD.get, url, config),
  post: (url, data, config) => processHttp(HTTP_METHOD.post, url, data, config),
  put: (url, data, config) => processHttp(HTTP_METHOD.put, url, data, config),
  delete: (url, config) => processHttp(HTTP_METHOD.delete, url, config),
  success: HttpResponse.success,
  error: HttpResponse.error,
  buildParams(object) {
    let res = ''
    if (_.isObject(object)) {
      for (let k in object) {
        let val = object[k]
        if (val === undefined || val === null) {
          val = ''
        }
        if (_.isArray(val)) {
          val = val.join(',')
        }
        res += `${k}=${val}&`
      }
    }
    return res
  }
}

export default http