import _ from 'lodash'
import Highcharts from 'highcharts'
import moment from 'moment'
import {
    formatDecimal
} from '../../../misc/commons'

const DEFAULT_DATA = [0, 0]
const DEFAULT_OPTIONS = {
    chart: {
        type: 'areaspline',
        backgroundColor: null,
        borderWidth: 0,
        margin: [0, -4, 0, -4],
        style: {
            overflow: 'visible'
        }
    },
    title: {
        text: null
    },
    legend: {
        enabled: false
    },
    xAxis: {
        type: 'datetime',
        visible: false
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.2,
            marker: {
                enabled: false
            }
        }
    }
}

export default {
    name: 'sparkline',
    props: ['value', 'options', 'color', 'name', 'unit'],
    data: function () {
        return {
            timeoutId: null
        }
    },
    watch: {
        value(value, oldValue) {
            this.render(value, this.options)
        },
        options(value) {
            if (!_.isEqual(value, this.options)) {
                this.render(this.value, value)
            }
        }
    },
    mounted() {
        this.render(this.value, this.options)
        $(this.$el).on('resize', () => this.rerender())
    },
    computed: {
        containerStyle() {
            return {
                height: '90px',
                ...this.options
            }
        }
    },
    methods: {
        render(value, options) {
            value = _.isArray(value) ? value : DEFAULT_DATA
            let minVal = null
            let maxVal = null
            value.forEach(item => {
                if (!minVal || item[1] < minVal) {
                    minVal = item[1]
                }
                if (!maxVal || item[1] > maxVal) {
                    maxVal = item[1]
                }
            })
            let unit = this.unit || ''
            Highcharts.chart(this.$el, {
                ...DEFAULT_OPTIONS,
                yAxis: {
                    visible: false,
                    min: minVal,
                    max: maxVal
                },
                tooltip: {
                    formatter: function (e) {
                        var s = moment(this.x).calendar()
                        $.each(this.points, function (i, point) {
                            s += `<br/><span style="color:${point.color}">•</span> ${point.series.name}: <b>${unit}${point.y >= 1 ? formatDecimal(point.y, '0', 2) : formatDecimal(point.y, '0', 8)}</b>`
                        })
                        return s
                    },
                    shared: true
                },
                series: [{
                    name: this.name,
                    data: value,
                    color: this.color || '#f7af3e'
                }]
            })
        },
        rerender() {
            clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(() => {
                $(this.$el).highcharts().reflow()
            }, 300)
        }
    }
}