import _ from 'lodash'
import axios from 'axios'
import {
    ERROR_MSG
} from './error'
import conf from '../config'
import appStore, {
    AUTH_MUTATION,
    LOCAL_STORAGES
} from '../store/app'
import notify from './notify'
import generic from "../misc/generic";
import tracking from '../misc/tracking'

export class AuthHttpResponse {
    static error(error, method, url, errorMsg) {
        console.warn(`Error [${method}] to ${url}`, error)
        this.errorObj = _.isObject(error) ? error : {}
        let res = new AuthHttpResponse(this.errorObj, this.errorObj)
        return res
    }
    static success(data) {
        return new AuthHttpResponse(data)
    }
    constructor(data, error, errorObj, msg) {
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
                : this.errorObj.message 
                    ? this.errorObj.message
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
    let ssid = generic.getJsonLocalStorage(LOCAL_STORAGES.ssid)
                ? generic.getJsonLocalStorage(LOCAL_STORAGES.ssid)
                : null
    return axios({
        method: method,
        url: `${conf.api}${url}`,
        data: data,
        withCredentials: false,
        headers : {'Authorization': 'cg '+ ssid},
        ...config
    }).then(response => {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[${method}]`, url, data || '')
        }
        if (response.status === 401) {
            //unauth
            appStore.commit(AUTH_MUTATION.not_auth)
            notify.error('Session expired or invalid')
            return AuthHttpResponse.error(response, method, url)
        }
        if (_.isObject(response) && _.isObject(response.data)) {
            let message = ''
            if (!_.isUndefined(response.data.m)) {
                message = response.data.m
            }
            return new AuthHttpResponse(response.data, !response.data.ok, response.data.error, message)
        } else {
            return AuthHttpResponse.error(response, method, url)
        }
    }).catch(error => {
        if (error.response && error.response.status === 401) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            //notify.error('Session expired or invalid')
            appStore.commit(AUTH_MUTATION.not_auth)
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
        } else {
            // Something happened in setting up the request that triggered an Error
        }
        return Promise.resolve(AuthHttpResponse.error(error, method, url, error.message))
    })
}

export const authHttp = {
    get: (url, config) => processHttp(HTTP_METHOD.get, url, config),
    post: (url, data, config) => processHttp(HTTP_METHOD.post, url, data, config),
    put: (url, data, config) => processHttp(HTTP_METHOD.put, url, data, config),
    delete: (url, config) => processHttp(HTTP_METHOD.delete, url, config),
    success: AuthHttpResponse.success,
    error: AuthHttpResponse.error,
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

export default authHttp