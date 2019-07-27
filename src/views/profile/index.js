import appStore, {
    APP_ACTIONS,
    APP_MUTATION,
    AUTH_ACTIONS
} from "../../store/app";
import router from "../../config/router";
import countries from "../../misc/countries.json";

export default {
    components: {
    },
    data() {
        return {
            changePasswordPath: router.changePassword.path,
            profilePatch: router.profile.path,
            balancePatch: router.balance.path,
            countries: countries,
        };
    },
    mounted() {
    },
    computed: {
        twoFaEnabled() {
            return appStore.state.profile && appStore.state.profile.twoFaEnabled;
        },
        profile() {
            return appStore.state.profile;
        }
    },
    created: function() {
        appStore.commit(APP_MUTATION.hide_sidebar, true)
    }
};