import appStore, { AUTH_ACTIONS, APP_MUTATION, APP_ACTIONS } from "../../../store/app"
import notify from "../../../services/notify"
import router from "../../../config/router"
import _ from "lodash"
import Verify2faLogin from "../verify2faLogin/index"

export default {
    props: ["redirect"],
    data() {
        return {
            loading: false,
            captchaInstance: {},
            model: {
                email: "",
                password: "",
                recaptcha: ""
            },
            resendRegisterVerifyPath: router.resendVerifyRegisterEmail.path,
            registerPath: router.register.path,
            profilePath: router.profile.path,
            //twoFactorPath: router.twoFactor.path,
            forgotPasswordPath: router.forgotPassword.path
        };
    },
    components: {
        "verify-2fa-modal": Verify2faLogin
    },
    computed: {
        disabled() {
            return this.loading || !this.model.email || !this.model.password || !this.model.recaptcha;
        }
    },
    methods: {
        login() {
            if (!this.model.email) {
                notify.error("Email can not be empty");
                return;
            }
            if (!this.model.password) {
                notify.error("Password can not be empty");
                return;
            }
            this.loading = true;
            appStore
                .dispatch(AUTH_ACTIONS.login, {
                    ...this.model,
                    redirectExternal: this.redirect
                })
                .then(resp => {
                    if (resp.error && !resp.data.require2Fa) {
                        notify.error("Login fail", resp.errorMsg)
                        //reset recaptcha
                        this.resetCaptcha()
                    } else if (resp.data.require2Fa) {
                        this.$refs.verify2FaModal.show(
                            resp.data.validateCode,
                            vresp => {
                                if (!vresp || vresp.error) {
                                    this.resetCaptcha()
                                }
                                // this.$router.push(this.profilePath);
                            },
                            this.redirect
                        );
                    }
                    this.loading = false
                });
        },
        resetCaptcha() {
            if (_.isFunction(this.captchaInstance.reset)) {
                this.captchaInstance.reset()
            }
        },
        close() {
            this.$router.push(appStore.state.previousRoute)
        }
    },
    created: function() {
        appStore.commit(APP_MUTATION.use_empty_layout, true)
    }
};