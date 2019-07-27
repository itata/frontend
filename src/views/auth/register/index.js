import authService from "../../../services/auth";
import countries from "../../../misc/countries.json";
import appStore, { AUTH_ACTIONS, APP_MUTATION } from "../../../store/app";
import router from "../../../config/router";
import notify from "../../../services/notify";
import termModal from "../terms";
import _ from "lodash";
import { ERROR_TYPE } from "../../../services/error";
import conf from "../../../config";

export default {
  components: {
    termModal,
  },
  data() {
    return {
      loading: false,
      loginPath: router.login.path,
      notSupported: false,
      captchaInstance: {},
      reCapchaKey: conf.recaptcha_key,
      termInstance: {},
      registerSuccess: false,
      countries: countries,
      model: {
        email: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
        country: "",
        recaptcha: "",
        referrerCode: "",
        accept: true
      },
      recoverPasswordCode: '',
      loginPath: router.login.path,
      resendRegisterVerifyPath: router.resendVerifyRegisterEmail.path
    };
  },
  created() {
    appStore.commit(APP_MUTATION.use_empty_layout, true)
  },
  computed: {
    disabled() {
      return (
        this.loading ||
        !this.model.email ||
        !this.model.password ||
        !this.model.confirmPassword ||
        !this.model.recaptcha ||
        !this.model.accept ||
        !(this.model.password === this.model.confirmPassword)
      );
    },
    appName: () => conf.app_name
  },
  methods: {
    register() {
      if (!this.model.accept) {
        notify.error("You haven't allow our terms of use and privacy")
        return
      }
      if (this.model.password !== this.model.confirmPassword) {
        notify.error("Your password is not match")
        return
      }
      this.loading = true
      appStore.dispatch(AUTH_ACTIONS.register, this.model).then(resp => {
        if (resp.error) {
          notify.error("Register fail", resp.errorMsg)
          this.resetCaptcha()
        } else {
          this.registerSuccess = true
          notify.success("Register success")
          this.recoverPasswordCode = resp.data.d
          // fbq("track", "CompleteRegistration");
        }
        this.loading = false
      })
    },
    resetCaptcha() {
      if (_.isFunction(this.captchaInstance.reset)) {
        this.captchaInstance.reset()
      }
    },
    viewTermService() {
      if (_.isFunction(this.termInstance.show)) {
        this.termInstance.show()
      }
    },
    close() {
      this.$router.push(appStore.state.previousRoute)
    }
  }
};