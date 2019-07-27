import generic from "../misc/generic";

export const BET_OPTION = {

}

export const BET_STATUS = {
    
}

export class BetMatch extends generic.Entity {
    constructor(data, mapping) {
        super(data, {
            id: ["id", generic.String],
            ...mapping
        })
    }
}