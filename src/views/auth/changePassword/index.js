import authService from '../../../services/auth'
import notify from '../../../services/notify'
import router from '../../../config/router'
import appStore from '../../../store/app'
import _ from 'lodash'

export default {
    data() {
        return {
            loading: false,
            profilePath: router.profile.path,
            success: false,
            model: {
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
                twoFaCode: ''
            }
        }
    },
    computed: {
        email() {
            return appStore.state.profile && appStore.state.profile.email
        },
        disabled() {
            return this.loading && this.model.newPassword && this.model.currentPassword
        },
        twoFaEnbaled() {
            return appStore.state.profile && appStore.state.profile.twoFaEnabled
        }
    },
    mounted() {
        $(this.$refs.currentPassword).focus()
    },
    methods: {
        confirm() {
            this.loading = true
            console.log(this.model);
            if (this.model.newPassword === this.model.confirmNewPassword) {
            authService.changePassword(this.model.currentPassword, this.model.newPassword, this.model.confirmNewPassword, this.model.twoFaCode).then(resp => {
                console.log(resp);
                    if (resp.error) {
                        notify.error('Change password fail', resp.errorMsg)
                    } else {
                        this.model.twoFaCode = ''
                        this.model.currentPassword = ''
                        this.model.newPassword = ''
                        this.model.confirmNewPassword = ''
                        notify.success('Your password has been changed!')
                    }
            })
        } else {
            notify.error('Your password not match!')
        }
        this.loading = false
        }
    }
}