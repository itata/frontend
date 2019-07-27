import {
    UserInfo
} from '../services/auth'
import moment from 'moment'
export default {
    loginSuccess(profile) {
        if (profile instanceof UserInfo && window.mixpanel) {
            if (window.mixpanel.identify) {
                window.mixpanel.identify(profile.username)
            }
            if (window.mixpanel.people && window.mixpanel.people.set) {
                window.mixpanel.people.set({
                    '$email': profile.email,
                    '$created': moment(profile.created).format('YYYY-MM-DD HH:mm:ss'),
                    '$last_login': new Date()
                })
            }
        }
    },
  
    loadBalance(btcAmount, ethAmount) {
        if (window.mixpanel && window.mixpanel.people && window.mixpanel.people.set) {
            window.mixpanel.people.set({
                'ETH Balance': btcAmount,
                'BTC Balance': ethAmount
            })
        }
    },
    error(err) {
        if (window.trackJs && window.trackJs.track) {
            // window.trackJs.track(err)
        }
    }
}