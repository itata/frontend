import appStore, {
    AUTH_ACTIONS
} from "../../../store/app";
import router from "../../../config/router";
import conf from "../../../config";
export default {
    data() {
        return {
            homePath: router.home.path
        };
    },
    methods: {
        handleMiniLeftMenu() {
            window.jQuery("body").toggleClass("nav-toggle");
        },
        logout() {
            appStore.dispatch(AUTH_ACTIONS.logout);
        }
    },
    mounted() {
        // Hide all open sub nav menu list
        $(".nav-second").on("show.bs.collapse", function() {
            $(".nav-second.in").collapse("hide");
        });

        // Handle panel toggle
        $(".panel-toggle").on("click", function(event) {
            event.preventDefault();
            var hpanel = $(event.target).closest("div.panel");
            var icon = $(event.target).closest("i");
            var body = hpanel.find("div.panel-body");
            var footer = hpanel.find("div.panel-footer");
            body.slideToggle(300);
            footer.slideToggle(200);

            // Toggle icon from up to down
            icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down");
            hpanel.toggleClass("").toggleClass("panel-collapse");
            setTimeout(function() {
                hpanel.resize();
                hpanel.find("[id^=map-]").resize();
            }, 50);
        });

        // Handle panel close
        $(".panel-close").on("click", function(event) {
            event.preventDefault();
            var hpanel = $(event.target).closest("div.panel");
            hpanel.remove();
        });
    },
    computed: {
        appUrl() {
            return conf.app_url;
        },
        appSiteName() {
            return (conf.app_url || "").replace(/https?:\/\//, "");
        },
        profile() {
            return appStore.state.profile || {};
        },
        social() {
            return conf.social;
        },
        quickLinks() {
            return conf.quick_links;
        }
    }
};