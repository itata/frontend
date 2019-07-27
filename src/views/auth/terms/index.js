import _ from 'lodash'
export default {
    name: 'term-modal',
    props: ['instance'],
    watch: {
        instance(value) {
            this.initInstance(value)
        }
    },
    mounted() {
        this.initInstance(this.instance)
    },
    methods: {
        initInstance(instance) {
            if (_.isObject(instance)) {
                instance.show = () => this.show()
            }
        },
        show() {
            $(this.$el).modal('show')
        }
    }
}