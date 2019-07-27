import appStore, {
    APP_MUTATION
} from "../../store/app"

export default {
    data() {
        return {
        }
    },
    created() {
        appStore.commit(APP_MUTATION.hide_sidebar, true)
    },
    methods:{
        openNewTab(url) {
            window.open(url, '_blank')
        }
    }
}