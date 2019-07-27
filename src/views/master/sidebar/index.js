import appStore, {
    AUTH_ACTIONS
} from '../../../store/app'
import router from '../../../config/router'

export default {
    data() {
        return {
            shareAffiliateInstance: {},
            requestBonusInstance: {},
            profileRoute: router.profile
        }
    },
    mounted: function() {
 
        $('.titleItem').click(function() { 
            resetAll(); 
         $(this).addClass('active'); 
         $(this).siblings().css({ 'display': 'block' });
        });

        $('.itemChild').click(function() {    
         $(this).siblings().css({ 'display': 'block' });
         $(this).addClass('active');
        });
        $('.selectItem').click(function() { 
            $('.selectItem').each(function(i, obj) { 
                $(this).removeClass('selected');
            });    
            $(this).addClass('selected');
        });
 
        function resetAll() {
            // reset active
            $('.titleItem').each(function(i, obj) {
                // $(this).removeClass('itemActive');
                $(this).removeClass('active');
                $(this).siblings().css({ 'display': 'none' });
                $(this).find('.itemChild').siblings().css({ 'display': 'none' });
                console.log($(this).find('.itemChild')); 
            });
            $('.child').each(function(i, obj) {
                $(this).css({ 'display': 'none' });
            });
            $('.itemChild').each(function(i, obj) {
                $(this).siblings().css({ 'display': 'none' });
                $(this).removeClass('active');
            });  
        }  
    },
    computed: {
        navigations() {
            return appStore.state.navigations
        },
        bonusAvailable() {
            return appStore.state.bonusAvailable
        },
        twoFaEnabled() {
            return appStore.state.profile && appStore.state.profile.twoFaEnabled
        }
    },
    methods: {
        isActive(navigation) {
            return appStore.state.currentRoute.path === navigation.path
        },
        navigate(nav) {
            if (nav) {
                $('body').removeClass('nav-toggle')
                this.$router.push(nav.path)
            }
        },
        requestBonus() {
            if (this.requestBonusInstance.show) {
                this.requestBonusInstance.show()
            }
        },
        logout() {
            appStore.dispatch(AUTH_ACTIONS.logout)
        },
        shareAffiliate() {
            if (this.shareAffiliateInstance.show) {
                this.shareAffiliateInstance.show()
            }
        }
    }
}