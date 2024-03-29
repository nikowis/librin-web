import {
  API_ERROR,
  AUTH_ERROR,
  CLEAR_API_ERROR,
  CLEAR_AUTH_ERROR,
  CLEAR_SERVER_ERROR,
  FULFILLED,
  GET_TOKEN_ACTION,
  HIDE_NOTIFICATION,
  HTTP_REQUEST_FINISH,
  HTTP_REQUEST_START,
  LOGOUT_ACTION,
  SERVER_ERROR,
  SHOW_NOTIFICATION
} from "redux/actions";
import i18n from 'i18next';

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
                errorMessage: (action.payload.message ? action.payload.message : ( action.payload.errors && action.payload.errors.length > 0 ? action.payload.errors[0].defaultMessage : i18n.t('user.defaultAuthErr'))),
                error: action.payload,
                authError: true
            };
        case API_ERROR:
        case API_ERROR + FULFILLED:
            if (action.payload && action.payload.errors && action.payload.errors.length === 1) {
                return {
                    ...state,
                    errorMessage: action.payload.errors[0].defaultMessage,
                    error: action.payload,
                    apiError: true
                };
            } else {
                return {
                    ...state
                    , errorMessage: action.payload,
                    error: action.payload,
                    apiError: true
                };
            }
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
