import Logger from '../util/Logger'
import {
    func
} from '../misc'
import _ from 'lodash'

const _instance = {
    is_auth: true,
    is_registered: false,
    user_info: null,
    on_auth: [],
    onAuth(fn) {
        if (_.isFunction(fn)) {
            _instance.on_auth = func.mergeFuncQueues(_instance.on_auth, fn)
        }
    },
    auth(isAuth, isRegistered) {
        Logger.info(`Request auth auth=${isAuth}, registed=${isRegistered}`)
        _instance.is_auth = isAuth
        _instance.is_registered = isRegistered
        func.executeFuncQueues(_instance.on_auth, [_instance.is_auth, _instance.is_registered])
    }
}

class AuthConfig {
    constructor() {
        this.userInfo = {}
    }
    get isAuth() {
        return _instance.is_auth
    }
    get userInfo() {
        return _instance.user_info
    }
    onAuth(fn) {
        _instance.onAuth(fn)
        _instance.auth(_instance.is_auth, _instance.is_registered)
    }
}

export default new AuthConfig()