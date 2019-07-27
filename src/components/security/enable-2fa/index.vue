<template>
    <div class="">
        <label class="switch">
           <a @click.prevent="enable" v-if="!enabled" href="#" class="button btn-large round btn-border btn-primary btn-hover investor btn-bounce">Enable 2FA</a>
            <a @click.prevent="disable" v-else  href="#" class="btn btn-danger">Disable 2FA</a>
        </label>
        <enable-2fa-modal ref="enableModal" />
        <disable-2fa-modal ref="disableModal" />
    </div>
</template>
<style scoped>
.inline {
  display: inline-block;
}
</style>

<script src="./index.js"></script>