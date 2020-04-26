import {
    FULFILLED,
    GET_ALL_CONVERSATIONS,
    GET_CONVERSATION,
    PENDING,
    SEND_MESSAGE
} from "./actions";

const initialState = {
    content: null,
    loading: false,
    currentPage: null,
    totalPages: null,
    totalElements: null,
    currentConversation: {
        id: null,
        messages: [],
        offer: null,
        createdAt: null
    }
};

const messagesReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case GET_CONVERSATION + FULFILLED:
            return {
                ...state,
                currentConversation: {
                    ...payload
                }
            };
        case GET_ALL_CONVERSATIONS + FULFILLED:
            return {
                ...state,
                content: payload.content,
                loading: false,
                currentPage: payload.number + 1,
                totalPages: payload.totalPages,
                totalElements: payload.totalElements,
            };
        case SEND_MESSAGE + FULFILLED:
            return {
                ...state,
                currentConversation: {
                    ...payload
                }
            };
        default:
            return state
    }
};

export default messagesReducer;

