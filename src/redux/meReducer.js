import {AUTH_ERROR, CHANGE_LANG, FETCH_ME, FULFILLED, GET_TOKEN_ACTION, LOGOUT_ACTION, UPDATE_USER} from "./actions";

const initialState = {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    username: null,
    exchange: null,
    shipment: null,
    selfPickup: null,
    selfPickupCity: null,
    authenticated: false,
    lang: 'pl',
    authToken: null
};

const meReducer = (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {
        case GET_TOKEN_ACTION + FULFILLED:
            return {
                ...state,
                authenticated: true,
                authToken: payload.access_token
            };
        case UPDATE_USER:
        case FETCH_ME + FULFILLED:
            return {
                ...state,
                ...payload
            };
        case CHANGE_LANG:
            return {
                ...state,
                lang: action.payload
            };
        case AUTH_ERROR + FULFILLED:
        case LOGOUT_ACTION:
            return {
                ...initialState,
                lang: state.lang
            };
        default:
            return state
    }
};

export default meReducer;
