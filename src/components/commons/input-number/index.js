import _ from 'lodash'
import { formatDecimalNotRound } from '../../../misc/commons';
export default {
    name: 'input-number',
    props: ['value', 'decimal', 'notformat', 'length', 'max', 'min', 'customeClass','formatNotRound'],
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
            if (this.formatNotRound) {
                this.setValue(formatDecimalNotRound(value))
            }
            this.setValue(value)
        }
    },
    mounted() {
        this.setValue(this.value)
        let that = this
        $(this.$el)
            .keydown(function (e) {
                that.$el.oldValue = that.$el.value
                that.$el.oldPos = Math.max(this.selectionStart, this.selectionEnd)
                // Allow: backspace, delete, tab, escape, enter and .
                if (
                    that.getAllowKeys().indexOf(e.keyCode) >= 0 ||
                    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Command+A, Command+V, Command+C
                    ((e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 86) &&
                        (e.ctrlKey === true || e.metaKey === true)) ||
                    // Allow: home, end, left, right, down, up
                    (e.keyCode >= 35 && e.keyCode <= 40)
                ) {
                    // let it happen, don't do anything
                    return
                }

                if (that.length && that.getValueString(that.$el.value).length >= that.length) {
                    e.preventDefault()
                }
                // Ensure that it is a number and stop the keypress
                if (
                    (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
                    (e.keyCode < 96 || e.keyCode > 105)
                ) {
                    e.preventDefault()
                }
            })
            .on('blur', e => {
                this.setValue(this.getValue(this.$el.value), true)
            })
            .on('focusin', e => {
                $(e.target).select()
                if(this.customeClass) {
                    $(e.target).parent().addClass(this.customeClass)
                    $(e.target).addClass(this.customeClass)
                }
            })
            .on('focusout', e => {
                if(this.customeClass) {
                    $(e.target).parent().removeClass(this.customeClass)
                    $(e.target).removeClass(this.customeClass)
                }
            })
            .on('keyup', function (e) {
                var selectionStart = this.selectionStart
                var selectionEnd = this.selectionEnd
                if(e.keyCode !== 9) { //Not allow tab
                    if (
                        that.$el.value !== that.$el.oldValue &&
                        that.$el.value.replace(/\.0+$/, '') !==
                        that.$el.oldValue.replace(/\.0+$/, '') &&
                        that.getValue(that.$el.value) !== that.getValue(that.$el.oldValue)
                    ) {
                        that.setValue(that.$el.value)
                        if (selectionEnd === selectionStart) {
                            let pos
                            if (that.$el.oldPos >= that.$el.oldValue.length) {
                                pos = that.$el.value.length
                            } else {
                                pos =
                                    that.$el.value.length -
                                    (that.$el.oldValue.length - that.$el.oldPos)
                            }
                            this.selectionEnd = pos
                            this.selectionStart = pos
                        } else {
                            this.selectionStart = this.selectionEnd =
                                that.$el.value.length -
                                (that.$el.oldValue.length - that.$el.oldPos)
                        }
                    }
                }
            })
    },
    computed: {},
    methods: {
        getAllowKeys() {
            let res = [46, 8, 9, 27, 13, 110]
            if (this.decimal && this.$el.value.indexOf('.') < 0) {
                res.push(190)
            }
            return res
        },
        setValue(value, fixMinMax) {
            if (!this.length && !_.isNumber(value)) {
                value = this.getValue(value || '')
            }
            let validValue = value
            if (fixMinMax) {
                if (_.isNumber(this.max) && value > this.max) {
                    validValue = this.max
                }
                if (_.isNumber(this.min) && value < this.min) {
                    validValue = this.min
                }
            }

            let newVal = this.notformat
                ? this.getValueString(validValue)
                : this.formatNumber(validValue)
            this.$el.value = newVal
            this.inputValue = newVal
            if (this.value !== validValue) {
                this.$emit('input', validValue)
            }
            return newVal
        },
        formatNumber(numberStr) {
            numberStr = `${numberStr || ''}` || ''
            let haveDot =
                numberStr.length && numberStr.indexOf('.') === numberStr.length - 1
            numberStr = `${parseFloat(numberStr || '0')}`
            if (
                numberStr.length &&
                haveDot &&
                numberStr.indexOf('.') !== numberStr.length - 1
            ) {
                numberStr = `${numberStr}.`
            }
            var arr = `${numberStr || '0'}`.split('.')

            return `${arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${arr.length > 1
        ? `.${arr[1]}`
        : ''}`
        },
        getValue(formatedNumber) {
            if (this.notformat) {
                return this.getValueString(formatedNumber)
            }
            
            let res = parseFloat(this.getValueString(formatedNumber))
            return _.isNaN(res) ? 0 : res
        },
        getValueString(formatedNumber) {
            return `${(formatedNumber || '')}`.replace(/,/g, '') || (this.notformat ? '' : '0')
        },
        fixNumber(numberStr) {
            return this.formatNumber(
                this.notformat ? numberStr : parseFloat(numberStr)
            )
        }
    }
}