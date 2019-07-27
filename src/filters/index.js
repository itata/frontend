import Vue from 'vue'
import {
    formatNumber,
    formatDecimalFloor,
    formatDecimal,
    formatDecimalNotRound
} from '../misc/commons'
import moment from 'moment'
import CrytoCoinAmount from '../misc/crypto-coin-amount'

const CC_VALUE_MAX_DIGRIT = 10

const bigNumberFormat = (number) => {
    let res = formatDecimalFloor(number, 1)
    if (number > 1000000000) {
        res = `${formatDecimalFloor(number / 1000000000, 2)}B`
    } else if (number > 1000000) {
        res = `${formatDecimalFloor(number / 1000000, 2)}M`
    } else if (number > 1000) {
        res = `${formatDecimalFloor(number / 1000, 2)}K`
    }
    return res
}

Vue.filter('number', function (number, defaultText = '0') {
    if (CrytoCoinAmount.isInstance(number)) {
        number = CrytoCoinAmount.ccaToNumber(number)
    }
    return formatNumber(number, defaultText)
})
Vue.filter('decimal', function (number, digrit = 3) {
    return formatDecimalFloor(number, digrit)
})
Vue.filter('decimalNotRound', function (number, digrit = 8) {
    return formatDecimalNotRound(number, '', digrit)
})
Vue.filter('ccvalue', function (number) {
    if (CrytoCoinAmount.isInstance(number)) {
        number = CrytoCoinAmount.ccaToNumber(number)
    }
    if (number > 1000000000) {
        return bigNumberFormat(number)
    }
    let valInt = parseInt(number || '0')
    return formatDecimal(number, 0, CC_VALUE_MAX_DIGRIT - `${valInt}`.length)
})
Vue.filter('ccbigvalue', function (number) {
    if (CrytoCoinAmount.isInstance(number)) {
        number = CrytoCoinAmount.ccaToNumber(number)
    }
    if (number > 100000) {
        return bigNumberFormat(number)
    }
    let valInt = parseInt(number || '0')
    return formatDecimalFloor(number, CC_VALUE_MAX_DIGRIT - `${valInt}`.length)
})
Vue.filter('usdvalue', function (number) {
    if (CrytoCoinAmount.isInstance(number)) {
        number = CrytoCoinAmount.ccaToNumber(number)
    }
    let res = formatDecimalFloor(number, 6)
    if (number > 1000000000) {
        res = `${formatDecimal(number / 1000000000, 0, 2)}B`
    } else if (number > 1000000) {
        res = `${formatDecimal(number / 1000000, 0, 2)}M`
    } else if (number > 1000) {
        res = `${formatDecimal(number / 1000, '0', 2)}K`
    }
    return res
})
Vue.filter('phonenumber', function (phone) {
    return `${phone || ''}`.replace(/^84/, '0').replace(/(\d{3})(\d{3})$/, ' $1 $2')
})
Vue.filter('datetime', function (time) {
    return time ? moment(time).format('MM/DD/YYYY hh:mm A') : ''
})
Vue.filter('date', function (time) {
    return time ? moment(time).format('MM/DD/YYYY') : ''
})
Vue.filter('time', function (time) {
    return time ? moment(time - 10000).format('hh:mm A') : ''
})