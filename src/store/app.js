import route from "../misc/route";
import router from "../config/router";
import authService, { UserInfo } from "../services/auth";
import Vue from "vue";
import Vuex from "vuex";
import conf from "../config";
import _ from "lodash";
import tracking from "../misc/tracking";
import generic from "../misc/generic";
import { runInThisContext } from "vm";

Vue.use(Vuex);

export const APP_MUTATION = {
  changed_router: "changed_router",
  init_app_finished: "init_app_finished",
  check_bonus_available: "check_bonus_available",
  update_realtime_wallet: "update_realtime_wallet",
  update_realtime_wallet_unit: "update_realtime_wallet_unit",
  update_realtime_wallet_id: "update_realtime_wallet_id",
  start_realtime_wallet: "start_realtime_wallet",
  stop_realtime_wallet: "stop_realtime_wallet",
  init_token: "init_token",
  set_token: "set_token",
  //account
  update_profile: "update_profile",
  //language
  change_language: "change_language",
  update_2fa: "update_2fa",
  hide_sidebar: 'hide_sidebar',
  use_empty_layout: 'use_empty_layout',
  set_previous_route: 'set_previous_route'
};

export const AUTH_MUTATION = {
  login_success: "login_success",
  register_success: "register_success",
  logout_success: "logout_success",
  permission_denied: "permission_denied",
  not_auth: "not_auth"
};

export const AUTH_ACTIONS = {
  logout: "logout",
  login: "login",
  verify_login_2fa: "verify_login_2fa",
  register: "register",
  get_user_profile: "get_user_profile",
  check_session: "check_session"
};

export const APP_ACTIONS = {
  set_previous_route: 'set_previous_route'
};

export const LOCAL_STORAGES = {
  ssid: "ssid",
  profile: "profile",
  lang: "lang"
};

function hasRedirectExternal(externalUrl, profile) {
  if (externalUrl && /^http(s)?/.test(externalUrl)) {
    tracking.loginSuccess(profile);
    window.location.href = externalUrl;
    return true;
  }
  return false;
}

export const appStore = new Vuex.Store({
  state: {
    auth: !conf.auth,
    currentLanguage: generic.getJsonLocalStorage(LOCAL_STORAGES.lang) || null,
    inited: false,
    lastedRouteNotAuth: "",
    profile: new UserInfo(),
    token: generic.getJsonLocalStorage(LOCAL_STORAGES.ssid) || null,
    currentRoute: {},
    navigations: [route.navigation.registerLink(router.home)],
    enable2Fa: false,
    hideSidebar: false,
    useEmptyLayout: false,
    previousRoute: '/',
    authRoutes: [router.login.path,
                router.register.path,
                router.forgotPassword.path,
                router.verifyRegister.path,
                router.resendVerifyRegisterEmail.path,
                router.resetPassword.path]
  },
  mutations: {
    [APP_MUTATION.update_2fa]: (state, data) => {
      state.enable2Fa = data;
    },
    [APP_MUTATION.set_previous_route]: (state, path) => {
      state.previousRoute = path
    },
    [APP_MUTATION.hide_sidebar]: (state, data) => {
      state.hideSidebar = data
    },
    [APP_MUTATION.use_empty_layout]: (state, data) => {
      state.useEmptyLayout = data
    },
    [APP_MUTATION.init_token]: state => {
      state.token = generic.getJsonLocalStorage(LOCAL_STORAGES.ssid) || null;
    },
    [APP_MUTATION.update_profile]: (state, data) => {
      state.auth = true;
      state.profile = data;
    },
    [APP_MUTATION.change_language]: (state, data) => {
      state.currentLanguage = data;
      generic.setJsonLocalStorage(LOCAL_STORAGES.lang, data);
      Vue.i18n.set(data.code);
    },
    [APP_MUTATION.set_token]: (state, token) => {
      generic.setJsonLocalStorage(LOCAL_STORAGES.ssid, token);
      state.token = token;
    },
    [APP_MUTATION.start_realtime_wallet]: state => {
      state.realtimeWalletAvaliable = true;
    },
    [APP_MUTATION.changed_router]: (state, current) => {
      state.currentRoute = current;
    },
    [APP_MUTATION.init_app_finished]: state => {
      state.inited = true;
    },
    [AUTH_MUTATION.login_success]: (state, token) => {
      if (token) {
        state.auth = true
        generic.setJsonLocalStorage(LOCAL_STORAGES.ssid, token)
        state.token = token
      }
    },
    [AUTH_MUTATION.register_success]: (state, profile) => { },
    [AUTH_MUTATION.not_auth]: (state, currentRoute) => {
      if (currentRoute && currentRoute.meta && currentRoute.meta.auth) {
        state.lastedRouteNotAuth = currentRoute;
      }
      state.auth = false;
      state.profile = null;
      state.token = null;
      generic.removeLocalStorage(LOCAL_STORAGES.profile);
      generic.removeLocalStorage(LOCAL_STORAGES.ssid);
    }
  },
  actions: {
    [APP_ACTIONS.set_previous_route]: (context, data) => {
      if (data) {
        if (!context.state.authRoutes.includes(data.path) && !data.meta.auth) {
          context.commit(APP_MUTATION.set_previous_route, data.path)
        }
      }
    },
    [AUTH_ACTIONS.get_user_profile]: context => {
      return authService.getProfile().then(resp => {
        if (!resp.error) {
          context.commit(APP_MUTATION.update_profile, resp.data)
          context.commit(AUTH_MUTATION.login_success, undefined)
        } else {
          context.commit(AUTH_MUTATION.not_auth, resp.data);
        }
        return resp;
      });
    },
    // [AUTH_ACTIONS.check_session]: (context, userId) => {
    //   return authService.checkSession().then(resp => {
    //     if (!resp.error) {
    //       context.commit(AUTH_MUTATION.login_success, resp.data.profile)
    //     } else {
    //       context.commit(AUTH_MUTATION.not_auth, resp.data)
    //     }
    //     return resp
    //   })
    // },
    [AUTH_ACTIONS.logout]: context => {
      return authService.logout().then(resp => {
        context.commit(AUTH_MUTATION.not_auth);
        //context.dispatch(APP_ACTIONS.stop_realtime_wallet);
        return resp;
      });
    },
    [AUTH_ACTIONS.login]: (context, payload = {}) => {
      const {
        email,
        password,
        recaptcha,
        redirectExternal
      } = _.isObject(payload) ? payload : {};
      return authService.login(email, password, recaptcha).then(resp => {
        if (resp.error) {
          //context.dispatch(APP_ACTIONS.stop_realtime_wallet)
        } else if (!resp.data.require2Fa && !hasRedirectExternal(redirectExternal, resp.data)) {
          context.commit(AUTH_MUTATION.login_success, resp.data.token)
          context.dispatch(AUTH_ACTIONS.get_user_profile)
        }
        return resp
      })
    },
    [AUTH_ACTIONS.verify_login_2fa]: (context, payload) => {
      const {
        code,
        validateCode,
        redirectExternal
      } = _.isObject(payload) ?
          payload :
          {};
      return authService.verifyLoginWith2Fa(validateCode, code).then(resp => {
        if (resp.error) {
        } else if (!hasRedirectExternal(redirectExternal, resp.data)) {
          context.commit(AUTH_MUTATION.login_success, resp.data.token)
          context.dispatch(AUTH_ACTIONS.get_user_profile)
        }
        return resp
      })
    },
    [AUTH_ACTIONS.register]: (context, payload = {}) => {
      const {
        email,
        password,
        confirmPassword,
        firstname,
        lastname,
        country,
        recaptcha,
        referrerCode
      } = _.isObject(payload) ? payload : {};
      return authService
        .register(email, password, confirmPassword, firstname, lastname, country, recaptcha, referrerCode)
        .then(resp => {
          if (!resp.error) {
            context.commit(AUTH_MUTATION.register_success, resp.data);
          }
          return resp;
        });
    }
  }
});

export default appStore;