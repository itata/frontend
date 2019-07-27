
import authHttp from '../auth-http'

const api_root = '/sport'

export const SPORT_ID = {
    soccer : 'soccer',
    tennis: 'tennis'
}

const SportService = {
    getLeagues() {
        return authHttp.get(`${api_root}/leagues`)
    },
    getMatches(params = {}) {
        return authHttp.get(`${api_root}/upcomming/${authHttp.buildParams(params)}`)
    },
    bet(sportId, eventId, betSlip = {}) {
        return authHttp.post(`${api_root}/${sportId}/${eventId}`, betSlip)       
    },
    getHistories(sportId, params = {}) {
        return authHttp.get(`${api_root}/history/${sportId}/${authHttp.buildParams(params)}`)
    }
}

export default SportService