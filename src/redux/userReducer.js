import {
    AUTH_ERROR,
    CHANGE_LANG,
    FETCH_USER,
    FULFILLED,
    LOGIN_ACTION,
    LOGOUT_ACTION,
    PENDING,
    UPDATE_USER
} from "./actions";

const initialState = {
    id: null,
    login: null,
    authenticated: false,
    lang: 'en'
};

const userReducer = (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {
        case LOGIN_ACTION + FULFILLED:
            return {
                ...state,
                authenticated: true
            };
        case UPDATE_USER:
        case FETCH_USER + FULFILLED:
            return {
                ...state,
                id: payload.id,
                login: payload.login
            };
        case CHANGE_LANG:
            window.lang = action.payload;
            return {
                ...state,
                lang: action.payload
            };
        case AUTH_ERROR + FULFILLED:
        case LOGOUT_ACTION + PENDING:
            return {
                ...initialState,
                lang: state.lang
            };
        default:
            return state
    }
};

export default userReducer;
