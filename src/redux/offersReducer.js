import {OFFER_CREATED, DELETE_OFFER, FETCH_OFFER, FETCH_OFFERS, FULFILLED, LOGOUT_ACTION, PENDING} from "./actions";

const initialState = {
    content: null,
    loading: false,
    currentPage: null,
    totalPages: null,
    totalElements: null,
    currentOffer: {
        id: 0,
        title: '',
        author: '',
        price: 0
    }
};

const offersReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case FETCH_OFFER + PENDING:
        case FETCH_OFFERS + PENDING:
            return {
                ...state,
                loading: true
            };
        case FETCH_OFFERS + FULFILLED:
            return {
                ...state,
                content: payload.content,
                loading: false,
                currentPage: payload.number + 1,
                totalPages: payload.totalPages,
                totalElements: payload.totalElements,
            };
        case FETCH_OFFER + FULFILLED:
            return {
                ...state,
                currentOffer: {
                    ...payload
                }
            };
        case LOGOUT_ACTION + PENDING:
        case OFFER_CREATED:
        case DELETE_OFFER + FULFILLED:
            return initialState;
        default:
            return state
    }
};

export default offersReducer;

