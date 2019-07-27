import QRCode from 'qrcode'

export default {
    name: 'qr-code',
    props: ['value'],
    data() {
        return {
            canvas: null
        }
    },
    watch: {
        value(value) {
            this.redraw(value)
        }
    },
    mounted() {
        this.canvas = $(this.$el).find('canvas')[0]
        this.redraw(this.value)
    },
    methods: {
        redraw(value) {
            QRCode.toCanvas(this.canvas, value || 'Empty', {
                errorCorrectionLevel: 'H',
                margin: 1,
                scale: 5,
                color: {
                    dark: '#000',
                    light: '#fff'
                }
            }, function (error) {
                if (error) console.error(error)
            })
        }
    }
}