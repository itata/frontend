import appStore, { AUTH_ACTIONS } from "../../../store/app";
import notify from "../../../services/notify";
import router from "../../../config/router";
export default {
    data() {
        return {
            loading: false,
            code: "",
            validateCode: "",
            errorTitle: "Login fail",
            onHidden: null,
            redirectExternal: "",
            profilePath: router.profile.path,
            resp: null
        };
    },
    mounted() {
        $(this.$el).on("shown.bs.modal", () => {
            if (this.$refs.codeRef) {
                $(this.$refs.codeRef).focus();
            }
        });
        $(this.$el).on("hidden.bs.modal", () => {
            if (typeof this.onHidden === "function") {
                this.onHidden(this.resp);
            }
        });
    },
    methods: {
        show(validateCode = "", onHidden, redirectExternal) {
            this.code = "";
            this.resp = null;
            this.validateCode = validateCode;
            this.onHidden = onHidden;
            this.redirectExternal = redirectExternal;
            $(this.$el).modal("show");
        },
        submit() {
            if (!this.code) {
                notify.error(this.errorTitle, "2FA Code is empty");
                return;
            }
            this.loading = true;
            appStore
                .dispatch(AUTH_ACTIONS.verify_login_2fa, {
                    validateCode: this.validateCode,
                    code: this.code,
                    redirectExternal: this.redirectExternal
                })
                .then(resp => {
                    this.loading = false;
                    this.resp = resp;
                    if (resp.error) {
                        notify.error(
                            this.errorTitle,
                            resp.errorMsg || "2FA Code is invalid"
                        );
                    }
                });
        }
    }
};