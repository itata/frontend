import generic from "../misc/generic";
export class Profile extends generic.Entity {
    constructor(data, mapping) {
        super(data, {
            id: ["id", generic.String],
            email: ["e", generic.String],
            firstName: ["fn", generic.String],
            lastName: ["ln", generic.String],
            displayName: ["dn", generic.String],
            country: ["c", generic.String],
            referrerCode: ["fc", generic.String],
            referrer: ["f", generic.String],
            f2a: ["2fa", generic.Boolean],
            ...mapping
        });
        this.metrics = [];
        this.extras = {};
    }
}