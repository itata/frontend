import {
    http,
    HttpResponse
} from './http'
import conf from '../config'
import _ from 'lodash'

const uploadSinglePhoto = (files, onProcess) => {
    var data = new FormData()
    data.append('pdata', files[0])
    var config = {
        onUploadProgress: function (progressEvent) {
            _.isFunction(onProcess) ? onProcess(Math.round((progressEvent.loaded * 100) / progressEvent.total)) : null
        },
        withCredentials: false
    }
    return http.post(conf.upload, data, config).then(({
        error,
        data
    }) => {
        data = data || {}
        data.data = data.data || {}
        if (!error) {
            return http.success(data.data || {})
        } else {
            let errorResp = new HttpResponse()
            errorResp.error = error
            errorResp.data = data
            errorResp.errorMsg = data.data.errorMessage || ''
            return errorResp
        }
    })
}

const initUploadSinglePhoto = () => {
    let inp = document.createElement('input')
    inp.type = 'file'
    inp.className = 'hidden'
    inp.multiple = false
    inp.accept = 'image/*'
    document.body.appendChild(inp)
    let file = window.jQuery(inp)
    return file
}
const inputFileSinglePhoto = initUploadSinglePhoto()
const resetInputFile = (input) => {
    input[0].files = null
    input[0].value = null
    input[0].onFinished = null
}


export const photo = {
    uploadSingle(onProcess, onStart) {
        return new Promise(resolve => {
            resetInputFile(inputFileSinglePhoto)
            inputFileSinglePhoto.off().on('change', function (e) {
                onStart(e.target)
                resolve(uploadSinglePhoto(e.target.files, onProcess))
            })
            inputFileSinglePhoto.click()
        })
    }
}