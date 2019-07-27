import '../../plugins/index'
import Sidebar from '../master/sidebar'
import HeaderMaster from '../master/header/index'
import FooterMaster from '../master/footer/index'
import appStore from '../../store/app'
import conf from '../../config'
import http from '../../services/http'

//debugger
export default {
    name: 'app',
    components: {
        Sidebar,
        HeaderMaster,
        FooterMaster
    },
    mounted() {
        $(this.$el).find('#launching .progress .progress-bar').animate({
            width: '98%'
        }, 'slow');
    },
    computed: {
        appName() {
            return conf.app_name
        },
        auth() {
            return appStore.state.auth
        },
        appInited() {
            return appStore.state.inited
        },
        useEmptyLayout() {
            return appStore.state.useEmptyLayout
        },
        hideSidebar() {
            return appStore.state.hideSidebar
        }
    }
}