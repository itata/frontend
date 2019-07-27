import _ from 'lodash'
import alert from '../services/alert'

export const copyToClipboard = (ele) => {
    if (ele) {
        $(ele).focus().select()
        document.execCommand('copy')
        alert('Copied to clipboard')
        return true
    }
    return false
}

export const buildRouterConfig = (object) => {
    let res = []
    if (_.isObject) {
        for (let k in object) {
            res.push(object[k])
        }
    }
    return res
}

export const resolvePath = (pathConfig, key, value) => {
    return pathConfig.replace(key, value)
}

export const number = {
    between(number, fromValue, toValue) {
        return number >= fromValue && number <= toValue
    }
}

export const buildArrayConfig = (values, names, ignoreValue, extras) => {
    let res = []
    let hasExtras = _.isObject(extras)
    for (let k in values) {
        let val = values[k]
        if (ignoreValue === val) {
            continue
        }
        let item = {
            value: val,
            name: names[val]
        }
        if (hasExtras) {
            for (let ekey in extras) {
                item[ekey] = _.isObject(extras[ekey]) ? extras[ekey][val] : null
            }
        }
        res.push(item)
    }
    return res
}

export const PAGING_DEFAULT = {
    size: 20,
    min_page: 1,
    page: 1,
    total: 0,
    num_items: 2
}

export class Paging {
    constructor(page = PAGING_DEFAULT.page, size = PAGING_DEFAULT.size, total = PAGING_DEFAULT.total, numItems = PAGING_DEFAULT.num_items) {
        this.page = Math.max(PAGING_DEFAULT.min_page, page)
        this.size = size
        this.total = total
        this.minPage = PAGING_DEFAULT.min_page
        this.maxPage = Math.max(this.minPage, Math.ceil(total / size))
        this.items = []
        let min = Math.max(1, page - numItems)
        if (page <= this.maxPage - numItems * 2) {
            min = page - numItems
        } else {
            min = this.maxPage - numItems * 2
        }
        min = Math.max(1, min)
        for (let i = min; i <= min + numItems * 2; i++) {
            if (i > this.maxPage) break
            this.items.push(i)
        }
    }
    get from() {
        return (this.page - 1) * this.size + 1
    }
    get to() {
        return Math.min(this.from + this.size - 1, this.total)
    }
    get empty() {
        return this.items.length <= 1
    }
}

export const commons = {
    paging(page, size, total) {
        return new Paging(page, size, total)
    },
    scrollTop() {
        var body = window.jQuery('html, body')
        body.stop().animate({
            scrollTop: 0
        }, 300, 'swing')
    }
}

export const hexToGrb = (hex) => {
    hex = hex.replace('#', '')
    var bigint = parseInt(hex, 16)
    var r = (bigint >> 16) & 255
    var g = (bigint >> 8) & 255
    var b = bigint & 255
    return r + ',' + g + ',' + b
}

export const formatNumber = (number, defaultText = '') => {
    var arr = `${parseFloat(number || 0) || defaultText}`.split('.')
    return `${arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${arr.length > 1 ? `.${arr[1]}` : ''}`
}


export const formatDecimal = (number, defaultText = '', digrit = 3) => {
    let val = parseFloat(number || 0).toFixed(digrit)
    var arr = `${val || defaultText}`.split('.')
    return `${arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${arr.length > 1 ? `.${arr[1]}` : ''}`
}

export const formatDecimalFloor = (number, maxDigrit = 3) => {
    let val = parseFloat(number || 0).toFixed(maxDigrit)
    val = parseFloat(val)
    var arr = `${val || 0}`.split('.')
    return `${arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${arr.length > 1 ? `.${arr[1]}` : ''}`
}

export const formatDecimalNotRound = (number, defaultText = '', digrit = 8) => {
    let val = parseFloat(number || 0).toFixed(9)
    val = parseFloat(val)
    var arr = `${val || defaultText}`.split('.')
    if (arr.length === 1) {
        return Number(arr[0])
    }
    return Number(arr[0] + '.' + arr[1].substr(0, digrit))
}