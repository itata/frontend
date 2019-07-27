import authService from '../../../services/auth'
import _ from 'lodash'
import Base64 from "base-64";
import router from '../../../config/router'
import notify from '../../../services/notify'
import appStore, { AUTH_ACTIONS, APP_MUTATION, APP_ACTIONS } from "../../../store/app"

export default {
    props: ['code'],
    data() {
        return {
            loading: false,
            success: false,
            recaptcha: '',
            email: '',
            captchaInstance: {},
            loginPath: router.login.path,
            resendRegisterVerifyPath: router.resendVerifyRegisterEmail.path
        }
    },
    computed: {
        disabled() {
            return this.loading ||
                !this.email ||
                !this.recaptcha
        }
    },
    created() {
        appStore.commit(APP_MUTATION.use_empty_layout, true)
    },
    mounted() {
        this.email = this.$route.query.e
        this.code = this.$route.query.c
    },
    methods: {
        verify() {
            this.loading = true
            authService.verifyEmail(this.email, this.code, this.recaptcha).then(resp => {
                if (resp.error) {
                    this.resetRecaptcha()
                    this.success = false
                    notify.error('Verify account fail', resp.errorMsg)
                } else {
                    notify.success('Verify account success', 'Let\'s login and enjoy!')
                    this.$router.push({
                        path: this.loginPath
                    })
                    this.success = true
                }
                this.loading = false
            })
        },
        resetRecaptcha() {
            if (_.isFunction(this.captchaInstance.reset)) {
                this.captchaInstance.reset()
            }
        },
        close() {
            this.$router.push(appStore.state.previousRoute)
        }
    }
}