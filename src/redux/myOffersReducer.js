import {
    CLEAR_CURRENT_MYOFFER,
    DELETE_OFFER,
    EDIT_OFFER,
    FETCH_MY_OFFER,
    FETCH_MY_OFFERS,
    FULFILLED,
    LOGOUT_ACTION,
    OFFER_CREATED,
    OFFER_UPDATED,
    PENDING
} from "./actions";
import {insertItem, removeItem} from "../common/array-helper";
import {processOffer, processOffers} from "./offersReducer";

const initialState = {
    content: null,
    currentPage: null,
    totalPages: null,
    totalElements: null,
    currentOffer: {
        id: 0,
        title: '',
        author: '',
        price: 0
    },
    search: ''
};

const myOffersReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case FETCH_MY_OFFER + PENDING:
        case FETCH_MY_OFFERS + PENDING:
            return {
                ...state,
            };
        case FETCH_MY_OFFERS + FULFILLED:
            let processedContent = processOffers(payload.content);

            return {
                ...state,
                content: processedContent,
                currentPage: payload.number + 1,
                totalPages: payload.totalPages,
                totalElements: payload.totalElements,
                search: window.location.search,
            };
        case EDIT_OFFER:
        case FETCH_MY_OFFER + FULFILLED:
            let processedPayload = processOffer(payload);

            return {
                ...state,
                currentOffer: {
                    ...processedPayload
                }
            };
        case OFFER_UPDATED:
            let updatedOffer = processOffer(payload);
            let allOffers = state.content;
            const updatedOfferIndex = allOffers ? allOffers.findIndex(offer => offer.id === updatedOffer.id) : null;
            if (allOffers && updatedOfferIndex >= 0) {
                allOffers = removeItem(allOffers, updatedOfferIndex);
                allOffers = insertItem(allOffers, {index: updatedOfferIndex, item: updatedOffer});
            }
            return {
                ...state,
                content: allOffers,
                currentOffer: updatedOffer
            };
        case CLEAR_CURRENT_MYOFFER:
            return {
                ...state,
                currentOffer: {
                    ...initialState.currentOffer
                }
            };
        case LOGOUT_ACTION:
        case OFFER_CREATED:
        case DELETE_OFFER + FULFILLED:
            return initialState;
        default:
            return state
    }
};

export default myOffersReducer;

