<template>
    <div class="h-100">
        <div class="container-fluid animated slideInDown h-100">
            <div class="row h-100">
                <div class="col-sm-3 bg im-bg im-806-1800"></div>
                <div class="col-lg-9 d-flex align-items-center justify-content-center" v-loading="loading">
                    <div class="close-page" @click.prevent="close">
                        <span class="pe pe-7s-close"></span>
                    </div>
                    <div class="w-45">
                        <div v-if="success" class="colorGray text-center">
                            <h4>Request a new password success!</h4>
                            <p>
                                A verification link have sent to your email inbox. <br> Please wait a few minutes and get verification link to reset your password.
                            </p>
                        </div>
                        <form class="colorWhite" v-else @submit.prevent="confirm()" :disabled="disabled">
                            <h2 class="text-center font-weight-bold my-3">{{ $t('Forgot password') }}</h2>
                            <div class="form-group">
                                <input v-model="email" type="email" title="Please enter you email" placeholder="Email" value="" name="email" id="email" class="form-control" autofocus>
                            </div>
                            <div class="form-group text-center">
                                <recaptcha v-model="recaptcha" :instance="captchaInstance" />
                            </div>
                            <div class="form-group">
                                <button :disabled="disabled" type="submit" class="btn button btn-large btn-active w-100">Resend email</button>
                            </div>
                        </form>
                        <p class="text-center colorWhite">
                            <small>
                                <span class="colorGray">Already have a account?</span>
                                <router-link class="colorWhite underline" :to="loginPath">Login now!</router-link>
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
  background-image: url("../../../assets/images/bg-register.jpg");
}
</style>

