import actionTypes from '../Constant/Constant'

const INITIAL_STATE = {
    USERNAME: null,
    UID: null,
    CLINICDATA: null,
    CLINICS: null,
    TOKENREQUEST: null,
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USERNAME':
            return ({
                ...states,
                USERNAME: action.payload
            })
        case 'UID':
            return ({
                ...states,
                UID: action.payload
            })
        case 'CLINICDATA':
            return ({
                ...states,
                CLINICDATA: action.payload
            })
        case 'CLINICS':
            return ({
                ...states,
                CLINICS: action.payload
            })
        case 'TOKENREQUEST':
            return ({
                ...states,
                TOKENREQUEST: action.payload
            })
        default:
            return states;
    }
}