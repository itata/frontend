import auth from '../../../services/auth'
import notify from '../../../services/notify'
import appStore, {
    AUTH_ACTIONS
} from '../../../store/app'
export default {
    name: 'disable-2fa-modal',
    data() {
        return {
            loading: false,
            code: '',
            password: '',
            success: false
        }
    },
    computed: {
        enabled() {
            return appStore.state.profile && appStore.state.profile.twoFaEnabled
        }
    },
    mounted() {
        $(this.$el).on('shown.bs.modal', () => {
            $(this.$refs.passwordRef).focus()
        })
    },
    methods: {
        show() {
            this.code = ''
            this.password = ''
            this.success = false
            $(this.$el).modal('show')
        },
        submit() {
            this.loading = true
            auth.disable2Fa(this.code, this.password).then(resp => {
                if (resp.error) {
                    notify.error('Disable Google 2FA Fail', resp.errorMsg || 'Please check your code and try again!')
                } else if (resp.data) {
                    notify.success('Disable Google 2FA Success')
                    appStore.dispatch(AUTH_ACTIONS.get_user_profile)
                    this.success = true
                } else {
                    notify.error('Disable Google 2FA Fail', 'Please check your code and try again!')
                }
                this.loading = false
            })
        }
    }
}