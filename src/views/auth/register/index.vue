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
            <form class="colorWhite" v-if="!registerSuccess" @submit.prevent="register()" :disabled="disabled">
              <h2 class="text-center font-weight-bold my-3">{{ $t('Sign up') }}</h2>
              <div class="form-group m-b-none">
                <div class="row">
                  <div class="col-md-6 m-b-sm mb-sm-0 mb-2">
                    <input v-model="model.firstname" type="text" title="First" placeholder="First Name" name="firstname" id="firstname" class="form-control">
                  </div>
                  <div class="col-md-6 m-b-md mb-sm-0 mb-2">
                    <input v-model="model.lastname" type="text" title="Last" placeholder="Last Name" name="lastname" id="lastname" class="form-control">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <select v-model="model.country" name="country" id="country" class="form-control">
                  <option value="">-Country-</option>
                  <option v-for="c in countries" :value="c.code" :key="c.code">{{c.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="model.email" placeholder="Email">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" v-model="model.password" placeholder="Password">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" v-model="model.confirmPassword" placeholder="Confirm Password">
              </div>
              <!-- <div class="form-group">
                <input type="text" class="form-control authControl" v-model="model.referrerCode" placeholder="Referrer code">
              </div> -->
              <div class="form-group">
                <div class="custom-control custom-checkbox my-1 mr-sm-2">
                  <input type="checkbox" v-model="model.accept" id="accept" class="custom-control-input">
                  <label class="custom-control-label" for="accept">
                    <small class="colorGray">
                      Accept the
                      <a class="colorGray underline" @click.prevent="viewTermService" href="#">terms and conditions</a>
                    </small>
                  </label>
                </div>
              </div>
              <div class="form-group text-center">
                <recaptcha v-model="model.recaptcha" :instance="captchaInstance" />
              </div>
              <button type="submit" class="btn button btn-large btn-active w-100" :disabled="disabled">Register Now</button>
            </form>
            <div v-else class="colorGray text-center">
              <h4>Register success!</h4>
              <p>
                A verification link have sent to
                <a class="colorWhite" :href="`mailto:${model.email}`">{{model.email}}</a>. <br> Please wait a few minutes and get verification link to active your account.
              </p>
              <p class="break-word">
                Recover Password: 
                <span class="colorWhite">
                  {{recoverPasswordCode}}
                </span>
              </p>
            </div>
            <p class="text-center my-4 colorWhite">
              <small>
                <span class="colorGray">Already have an account?</span>
                <router-link class="colorWhite underline" :to="loginPath">{{$t('Sign in')}}</router-link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
    <term-modal :instance="termInstance" />
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
.bg {
  background-image: url("../../../assets/images/bg-register.jpg");
}
</style>