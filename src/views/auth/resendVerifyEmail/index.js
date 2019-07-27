import authService from '../../../services/auth'
import notify from '../../../services/notify'
import router from '../../../config/router'
import appStore, { APP_MUTATION } from "../../../store/app"
import _ from 'lodash'

export default {
    data() {
        return {
            email: '',
            recaptcha: '',
            captchaInstance: {},
            loading: false,
            loginPath: router.login.path,
            success: false
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
    methods: {
        confirm() {
            this.loading = true
            authService.sendVerifyEmail(this.email, this.recaptcha).then(resp => {
                if (resp.error) {
                    notify.error('Resend verification email fail', resp.errorMsg)
                    this.success = false
                    this.resetRecaptcha()
                } else {
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