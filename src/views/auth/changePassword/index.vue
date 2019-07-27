<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="panel">
                    <div class="panel-body">
                        <div class="panel-body">
                            <h3 class="m-b-xs">
                                <span class="pe pe-7s-lock text-warning m-r-xs font-w700"></span>
                                Change password
                            </h3>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="panel" v-loading="loading">
                                        <div class="panel-body">
                                            <form @submit.prevent="confirm" :disable="disabled">
                                                <div class="form-group">
                                                    <label>Email</label>
                                                    <input :value="email" type="text" class="form-control" disabled>
                                                </div>
                                                <div class="form-group">
                                                    <label for="old-password">Current password</label>
                                                    <input ref="oldPassword" v-model="model.currentPassword" id="current-password" type="password" class="form-control">
                                                </div>
                                                <div class="form-group">
                                                    <label for="new-password">New password</label>
                                                    <input v-model="model.newPassword" id="new-password" type="password" class="form-control">
                                                </div>
                                                  <div class="form-group">
                                                    <label for="new-password">Confirm new password</label>
                                                    <input v-model="model.confirmNewPassword" id="confirm-new-password" type="password" class="form-control">
                                                </div>
                                                <div v-if="twoFaEnbaled" class="form-group">
                                                    <label for="two-fa-code">2Fa Code</label>
                                                    <input v-model="model.twoFaCode" id="two-fa-code" placeholder="000000" type="text" class="form-control">
                                                </div>
                                                <div class="form-group m-t-lg">
                                                    <button :disabled="disabled" type="submit" class="btn btn-accent m-r-sm">Change password</button>
                                                    <router-link :to="profilePath" class="btn btn-default">Cancel</router-link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.up-left {
  display: block;
  float: left;
  width: 90px;
  margin: 0;
}
.up-right {
  display: block;
  float: left;
  width: calc(100% - 90px);
  margin: 0;
}
</style>
 <script src="./index.js"></script>
 

