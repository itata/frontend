<template>
    <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <form @submit.prevent="submit()" :disabled="!key || success">
                <div class="modal-content">
                    <div class="panel" v-loading="loading">
                        <div class="panel-body p-none">
                            <div class="modal-header text-center">
                                <h3 class="modal-title font-w500">
                                    Google Authenticator
                                </h3>
                            </div>
                            <div class="modal-body text-left">
                                <div class="">
                                    <div class="row my-3">
                                        <div class="col-lg-3">
                                            Google QR and key:
                                            <i class="fa fa-info-circle icon colorWarning" aria-hidden="true"></i>
                                        </div>
                                        <div class="col-lg-6">
                                            <qr-code :value="deepLink" />
                                        </div>
                                    </div>
                                    <div class="row my-3">
                                        <div class="col-lg-3">
                                            Backup key:
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="input-group">
                                                <input ref="keyEl" :value="key" type="text" class="form-control" readonly>
                                                <a @click.prevent="copyKey" href="#" class="input-group-addon">
                                                    <i class="fa fa-files-o text-warning"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row my-3">
                                        <div class="col-lg-3 my-auto">
                                            Login password:
                                        </div>
                                        <div class="col-lg-6">
                                            <input type="password" v-model="password" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row my-3">
                                        <div class="col-lg-3 my-auto">
                                            2FA code:
                                        </div>
                                        <div class="col-lg-6">
                                            <input type="text" v-model="code" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row my-3">
                                        <div class="col-lg-3">
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="backedUp">
                                                <label class="custom-control-label" for="customCheck1">I have backed up my 16-digit key.</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row my-3">
                                        <div class="col-lg-3">
                                        </div>
                                        <div class="col-lg-6">
                                            <button class="btn btnInfo btnPrimary" v-if="!success" :disabled="!key || !code || !password || !backedUp">Enable Google Authenticator</button>
                                        </div>
                                    </div>
                                    <p class="textInfo">
                                        <i class="fa fa-info-circle icon colorWarning" aria-hidden="true"></i>
                                        this key is used to retrieve your ga when you change or lose your phone. please save and back up the key before binding ga.
                                    </p>
                                </div>
                            </div>
                            <div class="modal-footer text-right">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button v-if="!success" :disabled="!key || !code || !password || !backedUp" type="submit" class="btn btn-accent">Enable 2FA</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script src="./index.js"></script>