import Vue from "vue";
import Router from "vue-router";
import route from "./misc/route";
import axios from "axios";

//import moment from 'moment'
Vue.use(Router);

import App from "./views/app";
import router from "./config/router";
import appStore, {
  APP_MUTATION,
  APP_ACTIONS,
  AUTH_ACTIONS,
  AUTH_MUTATION,
  LOCAL_STORAGES
} from "./store/app";
import socketService from "./services/socket";
import authService from "./services/auth";
import conf from "./config";
import "./components";
import "./directives";
import "./filters";
//vue localization
import vuexI18n from "vuex-i18n";
import translateEN from "./config/lang/en.json";
import translateUs from "./config/lang/us.json";

import Vuebar from "vuebar";
import {
  generic
} from "./misc/generic";
import VueClipboards from 'vue-clipboards';
Vue.use(VueClipboards);

import VueTabs from "vue-nav-tabs";
Vue.use(VueTabs);

Vue.use(Vuebar);

const initApp = () => {
  const vueRouter = new Router({
    mode: "history",
    routes: [
      ...route.buildConfig(router),
      {
        path: "*",
        redirect: router.error404.path
      }
    ]
  });

  //home is sport bet page
  // vueRouter.beforeEach((to, from, next) => {
  //   if (to.path === router.home.path) {
  //     next(router.sportsbet.path)
  //   } else {
  //     next()
  //   }
  // })

  vueRouter.afterEach((to, from) => {
    $("html, body")
      .animate({
        scrollTop: 0
      },
        "fast"
      )
      .removeClass("modal-open");
    $(".modal").modal("hide");
    $(".modal-backdrop").remove();
    appStore.commit(APP_MUTATION.changed_router, to);
    //disconnect socket
    socketService.disconnectSocket();
    appStore.commit(APP_MUTATION.use_empty_layout, false)
    appStore.dispatch(APP_ACTIONS.set_previous_route, from)
  });

  //localize
  Vue.use(vuexI18n.plugin, appStore);
  Vue.i18n.add("en", translateEN);
  Vue.i18n.add("us", translateUs);

  if (!generic.getJsonLocalStorage(LOCAL_STORAGES.lang)) {
    const dLang = conf.default_language.split("|");
    appStore.commit(APP_MUTATION.change_language, {
      code: dLang[0],
      name: dLang[1]
    });
  } else {
    appStore.commit(
      APP_MUTATION.change_language,
      generic.getJsonLocalStorage(LOCAL_STORAGES.lang)
    );
  }

  //auth
  if (conf.auth) {
    let DEFAULT_ROUTE_PATH = router.home.path
    let LOGIN_PATH = router.login.path
    vueRouter.onReady(() => {
      appStore.subscribe((mutations, store) => {
        switch (mutations.type) {
          case AUTH_MUTATION.login_success:
            {
              let redirect = store.lastedRouteNotAuth || vueRouter.currentRoute
              if (redirect.meta.auth) {
                vueRouter.push(redirect.fullPath || redirect.path)
              }
              else {
                let redirectTo = redirect.query && redirect.query.redirect 
                                  ? redirect.query.redirect 
                                  : redirect.path && !appStore.state.authRoutes.includes(redirect.path)
                                    ? redirect.path
                                    : DEFAULT_ROUTE_PATH
                vueRouter.push(redirectTo)
              }
              break
            }
          case AUTH_MUTATION.not_auth:
            {
              let redirect = store.lastedRouteNotAuth || vueRouter.currentRoute
              if (redirect.meta.auth && redirect.path !== LOGIN_PATH) {
                vueRouter.push({
                  path: LOGIN_PATH,
                  query: {
                    redirect: redirect.fullPath || redirect.path
                  }
                })
              }
              break
            }
        }
      })

      appStore.dispatch(AUTH_ACTIONS.get_user_profile).then(() => {
        vueRouter.beforeEach((to, from, next) => {
          if (to.matched.some(record => record.meta.auth) && !appStore.state.auth) {
            appStore.commit(AUTH_MUTATION.not_auth, to)
            next({
              path: LOGIN_PATH,
              query: {
                redirect: to.fullPath
              }
            })
          } else if (appStore.state.auth && to.path === LOGIN_PATH) {
            next({
              path: appStore.store && appStore.store.lastedRouteNotAuth ? appStore.store.lastedRouteNotAuth.path : DEFAULT_ROUTE_PATH
            })
          } else {
            next()
          }
        })
        appStore.commit(APP_MUTATION.init_app_finished)
      })

    })
  } else {
    appStore.commit(APP_MUTATION.init_app_finished)
  }

  return new Vue({
    el: "#app",
    router: vueRouter,
    template: "<app />",
    components: {
      App
    }
  });
};

export default initApp();