<template>
    <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog simple">
            <form @submit.prevent="submit()">
                <div class="modal-content" v-loading="loading">
                    <!-- <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <h5 class="text-center">
                                    Verify Google 2Fa
                                    <br>
                                    <small>Enter Google 2Fa Code to verify login</small>
                                </h5>
                                <div class="form-group">
                                    <label for="">2FA Code</label>
                                    <input ref="codeRef" v-model="code" type="text" placeholder="000000" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer text-right">
                        <button type="button" class="btn" data-dismiss="modal">Close</button>
                        <button :disabled="!code" type="submit" class="btn button btn-active btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script src="./index.js"></script>