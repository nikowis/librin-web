import {
    API_ERROR,
    AUTH_ERROR,
    CLEAR_API_ERROR,
    CLEAR_AUTH_ERROR,
    CLEAR_SERVER_ERROR,
    FULFILLED,
    HIDE_NOTIFICATION,
    HTTP_REQUEST_FINISH,
    HTTP_REQUEST_START,
    GET_TOKEN_ACTION,
    LOGOUT_ACTION,
    SERVER_ERROR,
    SHOW_NOTIFICATION
} from "./actions";

const initialState = {
    apiError: false,
    authError: false,
    error: {},
    errorMessage: '',
    showNotification: false,
    notificationMessage: '',
    pendingRequests: 0,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case HTTP_REQUEST_START:
            return {
                ...state,
                pendingRequests: state.pendingRequests + 1
            };
        case HTTP_REQUEST_FINISH:
            return {
                ...state,
                pendingRequests: state.pendingRequests - 1
            };
        case AUTH_ERROR + FULFILLED:
            return {
                ...state,
                errorMessage: (action.payload.message ? action.payload.message : action.payload.errors[0].defaultMessage),
                error: action.payload,
                authError: true
            };
        case API_ERROR + FULFILLED:
            return {
                ...state,
                errorMessage: JSON.stringify(action.payload),
                error: action.payload,
                apiError: true
            };
        case SERVER_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
                error: action.payload,
                apiError: true
            };
        case GET_TOKEN_ACTION + FULFILLED:
            return {
                ...state,
                authError: false
            };
        case LOGOUT_ACTION:
            return {
                ...state,
                authError: false
            };
        case CLEAR_AUTH_ERROR:
            return {
                ...state,
                authError: false
            };
        case CLEAR_SERVER_ERROR:
        case CLEAR_API_ERROR:
            return {
                ...state,
                apiError: false
            };
        case SHOW_NOTIFICATION:
            return {
                ...state,
                notificationMessage: action.payload,
                showNotification: true
            };
        case HIDE_NOTIFICATION:
            return {
                ...state,
                notificationMessage: '',
                showNotification: false
            };
        default:
            return state
    }
};

export default appReducer;
