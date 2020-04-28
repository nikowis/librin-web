import {DELETE_OFFER, FETCH_OFFER, FETCH_OFFERS, FULFILLED, OFFER_CREATED, OFFER_UPDATED, PENDING} from "./actions";
import {insertItem, removeItem} from "../common/array-helper";

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
        case OFFER_UPDATED:
            let updatedOffer = payload;
            let allOffers = state.content;
            const updatedOfferIndex = allOffers ? allOffers.findIndex(offer => offer.id === updatedOffer.id) : null;
            if (allOffers && updatedOfferIndex >= 0) {
                allOffers = removeItem(allOffers, updatedOfferIndex);
                allOffers = insertItem(allOffers, {index: updatedOfferIndex, item: updatedOffer});
            }
            return {
                ...state,
                content: allOffers
            };
        case OFFER_CREATED:
        case DELETE_OFFER + FULFILLED:
        default:
            return state
    }
};

export default offersReducer;

