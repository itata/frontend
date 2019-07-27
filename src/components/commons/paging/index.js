import _ from 'lodash'
import {
    Paging
} from '../../../misc/commons'

export default {
    name: 'paging',
    props: ['value', 'action'],
    data() {
        return {
            model: new Paging()
        }
    },
    watch: {
        value(value) {
            this.setModel(value)
        }
    },
    mounted() {
        this.setModel(this.value)
    },
    methods: {
        setModel(value) {
            if (this.value instanceof Paging) {
                this.model = value
            } else {
                this.model = new Paging()
            }
        },
        selectPage(page) {
            if (_.isFunction(this.action)) {
                this.action(page)
            }
        }
    }
}