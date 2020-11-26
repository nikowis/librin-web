import {FULFILLED, GET_RATINGS, PENDING} from "./actions";

const initialState = {
    content: null,
    currentPage: null,
    totalPages: null,
    totalElements: null,
};

const ratingsReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case GET_RATINGS + FULFILLED:
            return {
                ...state,
                content: payload.content,
                currentPage: payload.number + 1,
                totalPages: payload.totalPages,
                totalElements: payload.totalElements,
            };

        case GET_RATINGS + PENDING:
            return initialState;
        default:
            return state
    }
};

export default ratingsReducer;

