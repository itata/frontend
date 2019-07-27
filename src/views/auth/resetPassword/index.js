import authService from '../../../services/auth'
import notify from '../../../services/notify'
import router from '../../../config/router'
import appStore, { APP_MUTATION } from "../../../store/app"
import _ from 'lodash'

export default {
    props: ['code'],
    data() {
        return {
            email: '',
            recaptcha: '',
            password: '',
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
                !this.recaptcha ||
                !this.password
        }
    },
    mounted() {
        this.email = authService.getEmailFromCode(this.code)
    },
    created() {
        appStore.commit(APP_MUTATION.use_empty_layout, true)
    },
    methods: {
        confirm() {
            this.loading = true
            authService.resetPassword(this.email, this.code, this.password, this.recaptcha).then(resp => {
                if (resp.error) {
                    notify.error('Reset password fail', resp.errorMsg)
                    this.resetRecaptcha()
                    this.success = false
                } else {
                    notify.success('Reset password success', 'Let\'s login and enjoy!')
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