import conf from '../../../config'
import auth from '../../../services/auth'
import notify from '../../../services/notify'
import appStore, {
    AUTH_ACTIONS
} from '../../../store/app'
import {
    copyToClipboard
} from '../../../misc/commons'

export default {
    name: 'enable-2fa-modal',
    data() {
        return {
            loading: false,
            appUrl: {
                android: conf.ga_url_android,
                appStore: conf.ga_url_app_store,
                windowPhone: conf.ga_url_window_phone,
                desktop: conf.ga_url_desktop
            },
            deepLink: '',
            key: '',
            code: '',
            password:'',
            success: false,
            backedUp: false
        }
    },
    computed: {
        enabled() {
            return appStore.state.profile && appStore.state.profile.twoFaEnabled
        }
    },
    mounted() {
        $(this.$el).on('shown.bs.modal', () => {
            $(this.$refs.codeRef).focus()
        })
    },
    methods: {
        show() {
            this.prepare()
            $(this.$el).modal('show')
        },
        submit() {
            if (!this.code) {
                notify.error('Enable Google 2FA Fail', 'Authentication Code is empty!')
            }
            if (!this.key || !this.backedUp) {
                return
            }
            this.loading = true
            auth.enable2Fa(this.code, this.password).then(resp => {
                if (resp.error || !resp.data) {
                    notify.error('Enable Google 2FA Fail', resp.errorMsg || 'Please check your code and try again!')
                } else if (resp.data) {
                    appStore.dispatch(AUTH_ACTIONS.get_user_profile)
                    this.success = true
                    notify.success('Enable Google 2FA Success')
                } else {
                    notify.error('Enable Google 2FA Fail', 'Please check your code and try again!')
                }
                this.loading = false
            })
        },
        prepare() {
            this.backedUp = false
            this.key = ''
            this.code = ''
            this.password = ''
            this.deepLink = ''
            this.success = false
            this.loading = true
            auth.prepare2Fa().then(resp => {
                if (resp.error) {
                    notify.error('Prepare Google 2FA Fail', resp.errorMsg)
                }
                this.key = resp.data.key
                this.deepLink = resp.data.deepLink
                this.loading = false
            })
        },
        copyKey() {
            copyToClipboard(this.$refs.keyEl)
        }
    }
}