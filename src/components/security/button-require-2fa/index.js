import conf from '../../../config'

export default {
    name: 'disable-2fa-modal',
    data() {
        return {
            loading: false,
            code: '',
            success: false
        }
    },
    computed: {
        enabled() {
            return false
        }
    },
    mounted() {},
    methods: {
        show() {
            $(this.$el).modal('show')
        },
        submit() {}
    }
}