import http from './auth-http'
import Base64 from 'base-64'
import conf from '../config'
import router from '../config/router'
import generic from '../misc/generic'
import {
    hash
} from '../misc/string'
import _ from 'lodash'
const AUTH = {
    separator: '|||'
}

const apiAuthPrefix = '/auth'

export class UserInfo extends generic.Entity {
    constructor(data) {
        super(data, {
            //profile
            country: ['cc', generic.String],
            createdDatetime: ['createdDatetime', generic.String],
            email: ['e', generic.String],
            firstName: ['fn', generic.String],
            lastName: ['ln', generic.String],
            displayName: ['dn', generic.String],
            recoverPassword:['recoverPassword', generic.String],
            referralCode:['referralCode', generic.String],
            referrer:['referrer', generic.String],
            userId:['uid', generic.Number],
            //affiliateId: ['user_profile.user_affiliate_id', generic.String],
            twoFaEnabled: ['2fa', generic.Boolean],
            //user info
            userName: ['userName', generic.String]
        })
    }
    // get displayName() {
    //     return this.firstName || this.email
    // }
    // get affiliateSharedUrl() {
    //     return `${conf.base_url}${router.register.path}?affiliate=${this.affiliateId || ''}`
    // }
    get fullName() {
        return `${this.firstName || ''} ${this.lastName || ''}`
    }
}

class Prepase2FaResp extends generic.Entity {
    constructor(data) {
        super(data, {
            deepLink: ['uri', generic.String],
            key: ['key', generic.String]
        })
    }
}

class LoginResp extends generic.Entity {
    constructor(data) {
        super(data, {
            require2Fa: ['2fa', generic.Boolean],
            validateCode: ['t', generic.String],
            token:['ssid', generic.String]
        })
        //this.profile = data
    }
    // set profile(value) {
    //     this._profile = new UserInfo(value)
    // }
    // get profile() {
    //     return this._profile
    // }
}

const authService = {
    getEmailFromCode(code) {
        if (code && _.isString(code)) {
            return Base64.decode(code).split(AUTH.separator)[0]
        }
        return null
    },
    getSupportedCountries() {
        return http.get('/user/supportedCountry')
    },
    register(email, password, confirmPassword, firstName, lastName, country, captcha, referrerCode) {
        return http.put(`${apiAuthPrefix}/account/register`, {
            email,
            password: hash(password),
            confirmPassword: hash(confirmPassword),
            firstName,
            lastName,
            country,
            captcha,
            referrerCode
        })
    },
    verifyEmail(email, token, captcha) {
        return http.post(`${apiAuthPrefix}/account/verify-email`, {
            email,
            token,
            captcha
        })
    },
    sendVerifyEmail(email, captcha) {
        return http.post(`${apiAuthPrefix}/account/resend-confirmation-email`, {
            email,
            captcha
        })
    },
    login(email, password, token_captcha) {
        return http.post(`${apiAuthPrefix}/auth/login`, {
            email,
            password: hash(password),
            captcha: token_captcha
        }).then(resp => {
            resp.data = new LoginResp(resp.data.d)
            return resp
        })
    },
    logout() {
        return http.post(`${apiAuthPrefix}/auth/logout`)
    },
    forgotPassword(email, captcha) {
        return http.post(`${apiAuthPrefix}/account/forgot-password`, {
            email,
            captcha
        })
    },
    resetPassword(email, code, new_password, captcha) {
        return http.post(`${apiAuthPrefix}/account/reset-password`, {
            email,
            code,
            new_password: hash(new_password),
            captcha
        })
    },
    changePassword(currentPassword, newPassword, confirmNewPassword, twoFaCode) {
        return http.post(`${apiAuthPrefix}/account/change-password`, {
            currentPassword: hash(currentPassword),
            newPassword: hash(newPassword),
            confirmNewPassword: hash(confirmNewPassword),
            verifyCode: twoFaCode
        })
    },
    getProfile() {
        return http.get(`${apiAuthPrefix}/me/profile`)
                    .then(resp => {
                        resp.data = new UserInfo(resp.data.d)
                        return resp
                    })
    },
    // checkSession() {
    //     return http.post('/account/check-session').then(resp => {
    //         resp.data = new LoginResp(resp.data)
    //         return resp
    //     })
    // },
    // 2fa
    verifyLoginWith2Fa(validateCode, code) {
        return http.post(`${apiAuthPrefix}/auth/login-2fa`, {
            token: validateCode,
            code
        }).then(resp => {
            resp.data = new LoginResp(resp.data.d)
            return resp
        })
    },
    prepare2Fa() {
        return http.get(`${apiAuthPrefix}/2fa/g-authenticator`).then(resp => {
            resp.data = new Prepase2FaResp(resp.data.d)
            return resp
        })
    },
    enable2Fa(code, password) {
        return http.post(`${apiAuthPrefix}/2fa/g-authenticator`, {
            code,
            password: hash(password)
        }).then(resp => {
            if (!resp.error) {
                resp.data = resp.data
            }
            return resp
        })
    },
    disable2Fa(code, password) {
        return http.delete(`${apiAuthPrefix}/2fa/g-authenticator`, {
            code,
            password: hash(password)
        }).then(resp => {
            if (!resp.error) {
                resp.data = resp.data
            }
            return resp
        })
    }
}

export default authService