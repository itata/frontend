<template>
  <div class="h-100">
    <div class="container-fluid animated slideInDown h-100">
      <div class="row h-100">
        <div class="col-sm-3 bg im-bg im-806-1800"></div>
        <div class="col-sm-9 d-flex align-items-center justify-content-center" v-loading="loading">
          <div class="close-page" @click.prevent="close">
            <span class="pe pe-7s-close"></span>
          </div>
          <div class="w-45">
            <form class="colorWhite" @submit.prevent="login()" :disabled="disabled">
              <h2 class="text-center font-weight-bold my-5">{{ $t('Sign in') }}</h2>
              <div class="form-group">
                <input type="text" class="form-control authControl" v-model="model.email" placeholder="Email">
              </div>
              <div class="form-group">
                <input type="password" class="form-control authControl" v-model="model.password" placeholder="Password">
              </div>
              <div class="form-group text-right">
                <small>
                  <router-link class="colorGray underline" :to="forgotPasswordPath">{{$t('Forgot password?')}}</router-link>
                </small>
              </div>
              <div class="form-group text-center">
                <recaptcha v-model="model.recaptcha" :instance="captchaInstance" />
              </div>
              <button type="submit" class="btn button btn-large btn-active w-100" :disabled="disabled">Sign in</button>
            </form>
            <p class="text-center my-4">
              <small>
                <span class="colorGray">Don't have an account?</span>
                <router-link class="colorWhite underline" :to="registerPath">{{$t('Sign up')}}</router-link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
    <verify-2fa-modal ref="verify2FaModal" />
  </div>
</template>
<script src="./index.js"></script>

<style lang="scss" scoped>
.bg {
  background-image: url("../../../assets/images/bg-login.jpg");
}
</style>