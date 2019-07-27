import _ from 'lodash'
import commons from '../../../misc/commons'

const CC_NUMBER = {
    digrit: 8
}
export default {
    name: 'cc-number',
    props: ['value', 'not-decimal', 'notformat', 'length', 'max', 'min'],
    data: function () {
        return {
            inputValue: '',
            valueString: '',
            displayValue: ''
        }
    },
    watch: {
        max(value) {
            if (
                _.isNumber(value) &&
                parseFloat(this.getValueString(this.inputValue)) > value
            ) {
                this.$emit('input', value)
            }
        },
        min(value) {
            if (
                _.isNumber(value) &&
                parseFloat(this.getValueString(this.inputValue)) < value
            ) {
                this.$emit('input', value)
            }
        },
        value(value) {
            this.setValue(value)
        }
    },
    mounted() {
        this.setValue(this.value)
        let that = this
        $(this.$el).on('blur', e => {
            this.setValue(this.getValue(this.$el.value), true)
        })
    },
    computed: {},
    methods: {
        setValue() {
            let newValue = this.getValue(this.$el.value)
            if (this.value !== newValue) {
                this.$emit('input', newValue)
            }
            return newValue
        },
        getValue(text = '') {
            text = `${text || ''}`.replace(/,/g, '')
            let val = 0
            if (this.notDecimal) {
                val = parseInt(text || '')
            } else {
                val = parseFloat(text || '')
            }
            if (_.isNaN(val) || !_.isFinite(val)) {
                val = 0
            }
            return val
        },
        format(value) {
            let res = ''
            if (this.notDecimal) {
                res = commons.formatDecimal(value, '0', 0)
            } else {
                res = commons.formatDecimal(value, '0', CC_NUMBER.digrit)
            }
            return res
        }
    }
}