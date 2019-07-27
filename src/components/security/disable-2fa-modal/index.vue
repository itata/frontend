<template>
    <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <form @submit.prevent="submit()" :disabled="!key || success">
                <div class="modal-content">
                    <div class="panel" v-loading="loading">
                        <div class="panel-body p-none">
                            <div class="modal-header text-center">
                                <h3 class="modal-title">
                                    Disable Google 2FA
                                </h3>
                            </div>
                            <div v-if="!enabled || success" class="modal-body text-center">
                                <h1 class="m-t-lg">
                                    <span class="fa fa-check-circle text-success"></span>
                                </h1>
                                <p class="m-b-lg">
                                    Google 2FA was Disabled
                                </p>
                            </div>
                            <div v-else class="modal-body text-left">
                                <div class="">
                                    <div class="form-group">
                                        <label for="">Login password:</label>
                                        <input ref="passwordRef" v-model="password" type="password" class="form-control" />
                                    </div>
                                    <div class="form-group">
                                        <label for="">2FA Code:</label>
                                        <input ref="codeRef" v-model="code" type="text" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer text-right">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button v-if="!success" :disabled="!code" type="submit" class="btn btn-accent">Confirm Disable 2FA</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script src="./index.js"></script>