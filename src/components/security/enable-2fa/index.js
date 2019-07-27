import appStore from '../../../store/app'

export default {
    name: 'enable-2fa',
    props: ['class', 'placeholder', 'type'],
    data() {
        return {
            loading: true,
            filter: {
                coinSymbol: '',
                page: 1,
                size: 10
            },
            items: [],
            total: 0
        }
    },
    computed: {
        enabled() {
            return appStore.state.profile && appStore.state.profile.twoFaEnabled
        }
    },
    mounted() { },
    methods: {
        toggleF2a(event) {
            event.target.checked = this.enabled;
            if (this.enabled) {
                this.disable()
            } else {
                this.enable()
            }
        },
        enable() {
            if (this.$refs.enableModal) {
                this.$refs.enableModal.show()
            }
        },
        disable() {
            if (this.$refs.disableModal) {
                this.$refs.disableModal.show()
            }
        }
    }
}