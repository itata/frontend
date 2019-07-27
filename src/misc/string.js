import Base64 from 'base-64'
import CryptoJS from 'crypto-js'

export function hash(string) {
    return Base64.encode(String.fromCharCode.apply(null, CryptoJS.MD5(string).toString().replace(/\r|\n/g, '').replace(/([\da-fA-F]{2}) ?/g, '0x$1 ').replace(/ +$/, '').split(' ')))
}

export default {
    hash
}