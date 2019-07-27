import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const SOCKET_MUTATION = {
    socket_connect: 'SOCKET_CONNECT',
    socket_trade: 'SOCKET_TRADE', //market trade
    socket_miniTicker: 'SOCKET_MINITICKER', //market status
    socket_chart: 'SOCKET_CHART', //chart
    socket_depth: 'SOCKET_DEPTH' // sell or buy orders
}

export const socketStore = new Vuex.Store({
    state: {
        buyOrders: [],
        sellOrders: [],
        buyOrSellOrder: {},
        myTrade: [],
        myOpenOrders: [],
        marketTrade: [],
        marketStatus: {},
        chart: {}
    },
    mutations: {
        [SOCKET_MUTATION.socket_connect]: (state, status) => {
            console.log('socket connected')
        },
        [SOCKET_MUTATION.socket_trade](state, data) {
            state.marketTrade = data
        },
        [SOCKET_MUTATION.socket_miniTicker](state, data) {
            state.marketStatus = data
        },
        [SOCKET_MUTATION.socket_chart](state, data) {
            state.chart = data
        },
        [SOCKET_MUTATION.socket_depth](state, data) {
            state.buyOrSellOrder = data
        }
    },
    actions: {
    }
})

export default socketStore
