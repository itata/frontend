<template>
    <div class="h-100">
        <div class="container-fluid animated slideInDown h-100">
            <div class="row h-100" v-loading="loading">
                <div class="col-sm-3 bg im-bg im-806-1800"></div>
                <div class="col-sm-9 d-flex align-items-center justify-content-center" v-loading="loading">
                    <div class="close-page" @click.prevent="close">
                        <span class="pe pe-7s-close"></span>
                    </div>
                    <div class="w-45">
                        <div v-if="success" class="colorGray text-center">
                            <h4>Verify success!</h4>
                            <p>
                                Your account has been verified! <br> Please
                                <router-link class="colorWhite" :to="loginPath">Login</router-link> to continue.
                            </p>
                        </div>
                        <form v-else class="colorWhite" @submit.prevent="verify()" :disabled="disabled">
                            <h2 class="text-center font-weight-bold my-3">{{ $t('Verify Account') }}</h2>
                            <p class="text-center">Submit Recaptcha to verify your account</p>
                            <div class="form-group">
                                <input :value="email" type="text" placeholder="Email" class="form-control" id="email" name="email" disabled>
                            </div>
                            <div class="form-group text-center">
                                <recaptcha v-model="recaptcha" :instance="captchaInstance" />
                            </div>
                            <div class="form-group">
                                <button :disabled="disabled" type="submit" class="btn button btn-large btn-active w-100">Verify Now</button>
                            </div>
                        </form>
                        <div class="text-center colorGray">
                            <small>Didn't receive a confirmation email?
                                <router-link class="colorWhite" :to="resendRegisterVerifyPath">Request a new one.</router-link>
                            </small><br>
                            <small>Already has a account?
                                <router-link class="colorWhite" :to="loginPath">Login now!</router-link>
                            </small>
                        </div>
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
