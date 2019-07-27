<template>
    <div class="h-100">
        <div class="container-fluid animated slideInDown h-100">
            <div class="row h-100" v-loading="loading">
                <div class="col-sm-3 bg im-bg im-806-1800"></div>
                <div class="col-lg-9 d-flex align-items-center justify-content-center" v-loading="loading">
                    <div class="close-page" @click.prevent="close">
                        <span class="pe pe-7s-close"></span>
                    </div>
                    <div class="w-45">
                        <div v-if="success" class="colorGray text-center">
                            <h4>Request a new password success!</h4>
                            <p>
                                Your account has been reset password. <br> Please
                                <router-link class="colorWhite" :to="loginPath">Login</router-link> to continue.
                            </p>
                        </div>
                        <form class="colorWhite" v-else @submit.prevent="confirm()" :disabled="disabled">
                            <h2 class="text-center font-weight-bold">{{ $t('Reset Password') }}</h2>
                            <p class="colorGray text-center">Enter a new password and don't forget them</p>
                            <div class="form-group">
                                <input :value="email" type="email" placeholder="Email" title="Please enter you email" name="email" id="email" class="form-control" disabled>
                            </div>
                            <div class="form-group">
                                <input v-model="password" type="password" placeholder="New password" title="Enter you new password" name="password" id="password" class="form-control" autofocus>
                            </div>
                            <div class="form-group text-center">
                                <recaptcha v-model="recaptcha" :instance="captchaInstance" />
                            </div>
                            <div class="form-group">
                                <button :disabled="disabled" type="submit" class="btn button btn-large btn-active w-100">Reset Password</button>
                            </div>
                        </form>
                        <p class="text-center colorGray">
                            <small>Already have a account?
                                <router-link class="colorWhite" :to="loginPath">Login now!</router-link>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
.bg {
  background-image: url("../../../assets/images/bg-login.jpg");
}
</style>