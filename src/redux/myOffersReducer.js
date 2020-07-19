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
  PENDING,
  RESET_MYOFFERS_FILTER,
  REPLACE_MYOFFERS_FILTER,
} from "./actions";
import { insertItem, removeItem } from "../common/array-helper";
import { processOffer, processOffers } from "./offersReducer";
import {
  DESC_SORT,
  DEFAULT_PAGE_SIZE,
  UPDATED_AT_SORT,
} from "../common/app-constants";

const initialState = {
  content: null,
  currentPage: null,
  totalPages: null,
  totalElements: null,
  currentFilter: {
    page: null,
    title: null,
    author: null,
    owner: null,
    category: null,
    condition: null,
    statuses: null,
    sort: null,
    size: null,
  },
  newFilter: {
    page: 0,
    title: null,
    author: null,
    owner: null,
    category: null,
    condition: null,
    statuses: null,
    sort: UPDATED_AT_SORT + "," + DESC_SORT,
    size: DEFAULT_PAGE_SIZE,
  },
  currentOffer: {
    id: 0,
    title: "",
    author: "",
    price: 0,
  },
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
        currentFilter: Object.assign({}, state.newFilter),
      };
    case EDIT_OFFER:
    case FETCH_MY_OFFER + FULFILLED:
      let processedPayload = processOffer(payload);

      return {
        ...state,
        currentOffer: {
          ...processedPayload,
        },
      };
    case OFFER_UPDATED:
      let updatedOffer = processOffer(payload);
      let allOffers = state.content;
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
      return {
        ...state,
        content: allOffers,
        currentOffer: updatedOffer,
      };
    case CLEAR_CURRENT_MYOFFER:
      return {
        ...state,
        currentOffer: {
          ...initialState.currentOffer,
        },
      };
    case REPLACE_MYOFFERS_FILTER: {
      validatePageParam(payload);
      return {
        ...state,
          newFilter: Object.assign({}, initialState.newFilter, payload),
      };
    }
    case RESET_MYOFFERS_FILTER: {
      return {
        ...state,
          newFilter: { ...initialState.newFilter },
      };
    }
    case LOGOUT_ACTION:
    case OFFER_CREATED:
    case DELETE_OFFER + FULFILLED:
      return initialState;
    default:
      return state;
  }
};

function validatePageParam(payload) {
    if (payload.page && payload.page < 0) {
      payload.page = 0;
    }
  }  

export default myOffersReducer;
