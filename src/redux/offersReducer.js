import {CREATE_OFFER, DELETE_OFFER, FETCH_OFFERS, FULFILLED, LOGOUT_ACTION, PENDING} from "./actions";

const initialState = {
    content: null,
    loading: false,
    currentPage: null,
    totalPages: null,
    totalElements: null
};

const offersReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case FETCH_OFFERS + PENDING:
            return {
                ...state,
                loading: true
            };
        case FETCH_OFFERS + FULFILLED:
            return {
                content: payload.content,
                loading: false,
                currentPage: payload.number + 1,
                totalPages: payload.totalPages,
                totalElements: payload.totalElements,
            };
        case LOGOUT_ACTION + PENDING:
        case CREATE_OFFER:
        case DELETE_OFFER + FULFILLED:
            return initialState;
        default:
            return state
    }
};

export default offersReducer;

