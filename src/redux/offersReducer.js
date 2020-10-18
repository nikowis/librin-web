import {
  CHANGE_OFFERS_FILTER,
  CLEAR_CURRENT_OFFER,
  CLEAR_OFFERS,
  DELETE_OFFER,
  FETCH_MAINVIEW_OFFERS,
  FETCH_OFFER,
  FETCH_USERVIEW_OFFERS,
  FULFILLED,
  OFFER_CREATED,
  OFFER_UPDATED,
  REPLACE_OFFERS_FILTER,
  RESET_OFFERS_FILTER,
  VIEW_OFFER,
} from "./actions";
import {insertItem, removeItem} from "../common/array-helper";
import {initializeAttachmentUrl} from "../common/attachment-utility";
import {CREATED_AT_SORT, DEFAULT_PAGE_SIZE, DESC_SORT,} from "../common/app-constants";

const initialOffersView = {
  content: null,
  currentPage: null,
  totalPages: null,
  totalElements: null,
  currentFilter: {
    page: null,
    title: null,
    author: null,
    owner: null,
    categories: null,
    condition: null,
    statuses: null,
    sort: null,
    size: null,
  },
  newFilter: {
    page: 1,
    title: null,
    author: null,
    owner: null,
    categories: null,
    condition: null,
    statuses: null,
    sort: CREATED_AT_SORT + "," + DESC_SORT,
    size: DEFAULT_PAGE_SIZE,
  },
};

export const MAIN_VIEW = 'mainView';
export const USER_VIEW = 'userView';

const initialState = {
  [MAIN_VIEW]: initialOffersView,
  [USER_VIEW]: initialOffersView,
  currentOffer: {
    id: 0,
    title: "",
    author: "",
    price: 0,
  },
};

export function processOffer(offer) {
  if (offer.photo) {
    offer.photo = initializeAttachmentUrl(offer.photo);
  }
  if (offer.photos && offer.photos.length > 0) {
    offer.photos = offer.photos.map((att) =>
      initializeAttachmentUrl(att)
    );
  }
  return offer;
}

export function processOffers(content) {
  content.forEach((offer) => {
    processOffer(offer);
  });
  return content;
}

const offersReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case FETCH_MAINVIEW_OFFERS + FULFILLED: {
      let processedContent = processOffers(payload.content);
      return {
        ...state,
        [MAIN_VIEW]: {
          ...state[MAIN_VIEW],
          content: processedContent,
          currentPage: payload.number + 1,
          totalPages: payload.totalPages,
          totalElements: payload.totalElements,
          currentFilter: Object.assign({}, state[MAIN_VIEW].newFilter),
        },
      };
    }
    case FETCH_USERVIEW_OFFERS + FULFILLED: {
      let processedContent = processOffers(payload.content);
      return {
        ...state,
        [USER_VIEW]: {
          ...state[USER_VIEW],
          content: processedContent,
          currentPage: payload.number + 1,
          totalPages: payload.totalPages,
          totalElements: payload.totalElements,
          currentFilter: Object.assign({}, state[USER_VIEW].newFilter),
        },
      };
    }
    case VIEW_OFFER:
    case FETCH_OFFER + FULFILLED:
      let processedPayload = processOffer(payload);

      return {
        ...state,
        currentOffer: {
          ...processedPayload,
        },
      };
    case OFFER_UPDATED: {
      let updatedOffer = processOffer(payload);
      return {
        ...state,
        [MAIN_VIEW]: {
          ...state[MAIN_VIEW],
          content: updateOfferInList(state[MAIN_VIEW].content, updatedOffer),
        },
        userView: {
          ...state[USER_VIEW],
          content: updateOfferInList(state[USER_VIEW].content, updatedOffer),
        }
      };
    }
    case CLEAR_CURRENT_OFFER:
      return {
        ...state,
        currentOffer: {
          ...initialState.currentOffer,
        },
      };
    case CHANGE_OFFERS_FILTER: {
      validatePageParam(payload);
      const view = action.view;
      return {
        ...state,
        [view] : {
          ...state[view],
          newFilter: Object.assign({}, state[view].newFilter, payload),
        }
      };
    }
    case REPLACE_OFFERS_FILTER: {
      validatePageParam(payload);
      const view = action.view;
      return {
        ...state,
        [view] : {
          ...state[view],
          newFilter: Object.assign({}, initialState[view].newFilter, payload),
        }
      };
    }
    case RESET_OFFERS_FILTER: {
      const view = action.view;
      return {
        ...state,
        [view] : {
          ...state[view],
          newFilter: { ...initialState[view].newFilter },
        }
        
      };
    }
    case CLEAR_OFFERS:
    case OFFER_CREATED:
    case DELETE_OFFER + FULFILLED:
      return initialState;
    default:
      return state;
  }
};

export default offersReducer;

function updateOfferInList(allOffers, updatedOffer) {
  const updatedOfferIndex = allOffers
    ? allOffers.findIndex((offer) => offer.id === updatedOffer.id)
    : null;
  if (allOffers && updatedOfferIndex >= 0) {
    allOffers = removeItem(allOffers, updatedOfferIndex);
    allOffers = insertItem(allOffers, {
      index: updatedOfferIndex,
      item: updatedOffer,
    });
  }
  return allOffers;
}

function validatePageParam(payload) {
  if (payload.page && payload.page < 0) {
    payload.page = 0;
  }
}
