import Vue from 'vue'
import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io'

//use to set query string
// const DEFAULT_OPTIONS = {
//     query: 'pair=' + 'btc_en'
// }

export const socketService = {
    install(connection, store) {
        if (!connection) {
            throw new Error('[Vue-Socket.io] cannot locate connection')
        }
        let socketIntance = (new Vue()).$socket
        if (!socketIntance) {
            Vue.use(VueSocketio, socketio(connection), store)
        } else {
            socketIntance.connect()
        }
    },
    disconnectSocket() {
        let socketIntance = (new Vue()).$socket
        if (socketIntance) {
            socketIntance.disconnect()
        }
    }
}

export default {
    ...socketService
}