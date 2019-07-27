import moment from 'moment'
export default {
    name: 'datetime-picker',
    props: ['value', 'placeholder', 'class'],
    data: function () {
        return {
            instance: null,
            displayValue: '',
            cachedValue: 0,
            cachedShowValue: 0,
            FORMATTER: 'DD/MM/YYYY HH:mm'
        }
    },
    watch: {
        value(value) {
            if (this.cachedValue !== value) {
                this.instance.data('DateTimePicker').date(new Date(this.value))
            }
        }
    },
    mounted() {
        this.cachedValue = this.value
        this.instance = window.jQuery(this.$el).datetimepicker({
                date: moment(this.value),
                format: this.FORMATTER,
                ignoreReadonly: true,
                toolbarPlacement: 'top',
                showClose: true,
                tooltips: {
                    today: 'Hôm nay',
                    clear: 'Xoá',
                    close: 'Đóng',
                    selectMonth: 'Chọn tháng',
                    prevMonth: 'Tháng trước',
                    nextMonth: 'Tháng sau',
                    selectYear: 'Chọn năm',
                    prevYear: 'Năm trước',
                    nextYear: 'Năm sau',
                    selectDecade: 'Chọn thập kỷ',
                    prevDecade: 'Thập kỷ trước',
                    nextDecade: 'Thập kỷ sau',
                    prevCentury: 'Thế kỷ trước',
                    nextCentury: 'Thế kỷ sau',
                    incrementHour: 'Tăng giờ',
                    pickHour: 'Chọn giờ',
                    decrementHour: 'Giảm giờ',
                    incrementMinute: 'Tăng phút',
                    pickMinute: 'Chọn phút',
                    decrementMinute: 'Giảm phút',
                    incrementSecond: 'Tăng giây',
                    pickSecond: 'Chọn giây',
                    decrementSecond: 'Giảm giây'
                }
            })
            .on('dp.change', (e) => {
                let val = +e.date
                if (val !== this.value) {
                    this.$emit('input', val)
                    this.cachedValue = val
                }
            })
            .on('dp.show', (e) => {
                this.cachedShowValue = this.cachedValue
            })
            .on('dp.hide', (e) => {
                this.$emit('hide', this.cachedValue)
                if (this.cachedShowValue !== this.cachedValue) {
                    this.$emit('hide:change', this.cachedValue)
                }
            })
    },
    computed: {
        displayValue() {
            return this.notformat ? this.valueString : this.formatNumber(this.valueString)
        },
        allowKeys() {
            let res = [46, 8, 9, 27, 13, 110]
            if (this.decimal && this.inputValue.indexOf('.') < 0) {
                res.push(190)
            }
            return res
        }
    },
    methods: {
        formatNumber(numberStr) {
            var arr = `${numberStr || ''}`.split('.')
            return `${arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${arr.length > 1 ? `.${arr[1]}` : ''}`
        },
        getValueString(formatedNumber) {
            return (formatedNumber || '').replace(/,/g, '')
        },
        fixNumber(numberStr) {
            return this.formatNumber(this.notformat ? numberStr : parseFloat(numberStr))
        }
    }
}