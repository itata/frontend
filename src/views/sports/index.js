import appStore, {
    APP_MUTATION
} from "../../store/app"
import sportService from '../../services/sports/sports'

export default {
    data() {
        return {
            data: {
                sportId: 'soccer',
                countryCode: '',
                leagueId: ''
            }
        }
    },
    created() {
        // sportService.getLeagues().then(resp => {
        //    console.log(resp)
        // })
        sportService.getMatches(this.data).then(resp => {
            console.log(resp)
        })
    },
    methods:{
        
    }
}