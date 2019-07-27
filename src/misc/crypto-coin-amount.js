import BigInt from 'big-integer'

const _instance = {
    transfer: 1e18,
    transferX2: 1e36
}

export default class CrytoCoinAmount {
    static get default() {
        return BigInt()
    }
    static numberToCca(number) {
        return BigInt(Math.floor(number * _instance.transfer))
    }
    static isInstance(cca) {
        return cca instanceof BigInt
    }
    static ccaToNumber(cca) {
        if (cca instanceof BigInt) {
            return cca.toJSNumber() / _instance.transfer
        }
        return 0
    }
    static multiply(number1, number2) {
        let val = CrytoCoinAmount.numberToCca(number1).multiply(CrytoCoinAmount.numberToCca(number2).toJSNumber()).toJSNumber()
        return val / _instance.transferX2
    }
    static divide(number1, number2) {
        return CrytoCoinAmount.numberToCca(number1).multiply(_instance.transfer).divide(CrytoCoinAmount.numberToCca(number2 || 1).toJSNumber()).toJSNumber() / _instance.transfer
    }
}