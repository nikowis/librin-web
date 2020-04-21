import {
    DELETE_OFFER,
    EDIT_OFFER,
    FETCH_MY_OFFER,
    FETCH_MY_OFFERS,
    FULFILLED,
    LOGOUT_ACTION,
    OFFER_CREATED,
    PENDING
} from "./actions";

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

const myOffersReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case FETCH_MY_OFFER + PENDING:
        case FETCH_MY_OFFERS + PENDING:
            return {
                ...state,
                loading: true
            };
        case FETCH_MY_OFFERS + FULFILLED:
            return {
                ...state,
                content: payload.content,
                loading: false,
                currentPage: payload.number + 1,
                totalPages: payload.totalPages,
                totalElements: payload.totalElements,
            };
        case EDIT_OFFER:
        case FETCH_MY_OFFER + FULFILLED:
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

export default myOffersReducer;

