import {
    CLEAR_CURRENT_OFFER,
    CLEAR_OFFERS,
    DELETE_OFFER,
    FETCH_OFFER,
    FETCH_OFFERS,
    FULFILLED,
    OFFER_CREATED,
    OFFER_UPDATED,
    VIEW_OFFER
} from "./actions";
import {insertItem, removeItem} from "../common/array-helper";
import {initializeAttachmentFromBase64} from "../common/attachment-utility";

const initialState = {
    content: null,
    currentPage: null,
    totalPages: null,
    totalElements: null,
    currentOffer: {
        apiError: null,
        id: 0,
        title: '',
        author: '',
        price: 0
    },
    search: ''
};

export function processOffer(offer) {
    if(offer.attachment) {
        offer.attachment = initializeAttachmentFromBase64(offer.attachment);
    }
    return offer;
}

export function processOffers(content) {
    content.forEach(offer => {
        processOffer(offer);
    });
    return content;
}

const offersReducer = (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {
        case FETCH_OFFERS + FULFILLED:
            let processedContent = processOffers(payload.content);
            return {
                ...state,
                content: processedContent,
                currentPage: payload.number + 1,
                totalPages: payload.totalPages,
                totalElements: payload.totalElements,
                search: window.location.search,
            };
        case VIEW_OFFER:
        case FETCH_OFFER + FULFILLED:
            if(payload.errors) {
                return {
                    ...state,
                    currentOffer: {
                        ...initialState,
                        apiError: payload.errors[0].defaultMessage
                    }
                };
            }
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
                content: allOffers
            };
        case CLEAR_CURRENT_OFFER:
            return {
                ...state,
                currentOffer: {
                    ...initialState.currentOffer
                }
            };
        case CLEAR_OFFERS:
        case OFFER_CREATED:
        case DELETE_OFFER + FULFILLED:
            return initialState;
        default:
            return state
    }
};

export default offersReducer;

