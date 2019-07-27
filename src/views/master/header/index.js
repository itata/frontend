import appStore, {
    AUTH_ACTIONS,
    LOCAL_STORAGES,
    APP_ACTIONS,
    APP_MUTATION
} from "../../../store/app";
import router from "../../../config/router";
import conf from "../../../config";
import generic from "../../../misc/generic";

export default {
    data() {
        return {
            homePath: router.home.path,
            loginPath: router.login.path,
            registerPath: router.register.path,
            profilePath: router.profile.path,
            casinoPath: router.casino.path,
            currentLanguageCode: "",
            languages: []
        };
    },
    methods: {
        handleMiniLeftMenu() {
            window.jQuery("body").toggleClass("nav-toggle");
        },
        logout() {
            appStore.dispatch(AUTH_ACTIONS.logout);
        },
        changeLanguage(code) {
            let selectedLang = this.languages.find(
                p => p.code == this.currentLanguageCode
            );
            appStore.commit(APP_MUTATION.change_language, selectedLang);
        }
    },
    mounted() {
 
        $(".detailProfile").on("click", function(event) {
            if( $('.popupInfo').hasClass('active'))
            {
                $('.popupInfo').removeClass('active');
                $(this).removeClass('active');
            }else{
                $('.popupInfo').addClass('active');
                $(this).addClass('active');
            } 
        });
        $(document).on('click', function (e) {
            if ($(e.target).closest(".popupInfo").length === 0 && $(e.target).closest(".detailProfile").length === 0) {
                $('.popupInfo').removeClass('active');
                $(this).removeClass('active');
            }
        });

        //parse language from config
        let me = this;
        let langs = conf.languages.split(",");
        langs.forEach(function(value, index) {
            let cLang = value.split("|");
            me.languages.push({ code: cLang[0], name: cLang[1] });
        });
        this.currentLanguageCode = this.currentLanguage.code;
        
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
        appName() {
            return conf.app_name;
        },
        profile() {  
            return appStore.state.profile || {};
        },
        currentLanguage() {
            return appStore.state.currentLanguage;
        },
        isAuthenticated() { 
            return appStore.state.auth;
        }
    }
};