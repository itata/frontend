import appStore, {
  APP_ACTIONS,
  APP_MUTATION,
  AUTH_ACTIONS
} from "../../store/app";
import router from "../../config/router";

export default {
  components: {
  },
  data() {
    
    return {
      changePasswordPath: router.changePassword.path,
      profilePatch: router.profile.path,
      balancePatch: router.balance.path,
    };
  },
  created() {
    appStore.commit(APP_MUTATION.hide_sidebar, true)
  },
}