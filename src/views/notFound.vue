<template>
    <div class="container-center md animated slideInDown">
        <div class="view-header">
            <div class="header-icon">
                <i class="pe page-header-icon pe-7s-search"></i>
            </div>
            <div class="header-title">
                <h3>404</h3>
                <small>
                    Page Not Found
                </small>
            </div>
        </div>
        <div class="panel panel-filled">
            <div class="panel-body">
                <p>Sorry, but the page you are looking for has note been found. </p>
                <p>Checking the URL request and try again!</p>
            </div>
        </div>
        <div>
            <router-link v-if="!isAuth" :to="loginPath" class="btn btn-accent">Back to Login</router-link>
            <router-link v-else :to="homePath" class="btn btn-accent">Back to Dashboard</router-link>
        </div>
    </div>
</template>
<script>
import appStore from '../store/app'
import router from '../config/router'
export default {
    data() {
        return {
            loginPath: router.login.path,
            homePath: router.home.path
        }
    },
    computed: {
        isAuth() {
            return appStore.state.auth
        }
    },
    mounted() {}
}
</script>