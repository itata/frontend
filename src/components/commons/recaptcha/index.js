import conf from '../../../config'
import _ from 'lodash'
export default {
    name: 'recaptcha',
    props: ['value', 'instance'],
    data() {
        return {
            renderId: null,
            timeoutId: null,
            destroyed: false
        }
    },
    mounted() {
        if (_.isObject(this.instance)) {
            this.instance.reset = () => this.reset()
        }
        this.render()
    },
    beforeDestroy() {
        this.destroyed = true
        this.clearTimeout()
    },
    methods: {
        clearTimeout() {
            if (this.timeoutId != null) {
                clearTimeout(this.timeoutId)
            }
        },
        render() {
            if (window.grecaptcha && typeof (window.grecaptcha.render) !== 'undefined') {
                $(this.$el).empty()
                this.renderId = window.grecaptcha.render(this.$el, {
                    sitekey: conf.recaptcha_key,
                    callback: (response) => {
                        this.$emit('input', response || '')
                    }
                })
            } else if (!this.destroyed) {
                $(this.$el).html('Loading grecaptcha...')
                this.clearTimeout()
                this.timeoutId = setTimeout(() => this.render(), 1000)
            }
        },
        reset() {
            if (this.renderId !== null) {
                this.$emit('input', '')
                window.grecaptcha.reset(this.renderId)
            }
        }
    }
}