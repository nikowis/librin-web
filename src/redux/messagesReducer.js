import {
    CREATE_CONVERSATION,
    FULFILLED,
    GET_ALL_CONVERSATIONS,
    GET_CONVERSATION,
    SELECT_CONVERSATION,
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

function insertItem(array, action) {
    return [
        ...array.slice(0, action.index),
        action.item,
        ...array.slice(action.index)
    ]
}

function removeItem(array, index) {
    return [...array.slice(0, index), ...array.slice(index + 1)]
}


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
            let conversationList = state.content;
            const updatedConvIndex = conversationList ? conversationList.findIndex(conv => conv.id === payload.id) : null;

            if(updatedConvIndex >= 0) {
                conversationList =  removeItem(conversationList, updatedConvIndex);
                conversationList = insertItem(conversationList, {index: 0, item: payload});
            }

            return {
                ...state,
                content: conversationList,
                currentConversation: {
                    ...payload
                }
            };
        case SELECT_CONVERSATION:
            const selectedConv = state.content ? state.content.find(conv => conv.id === payload) : initialState.currentConversation;
            return {
                ...state,
                currentConversation: {
                    ...selectedConv
                }
            };
        case CREATE_CONVERSATION + FULFILLED:
            return initialState;
        default:
            return state
    }
};

export default messagesReducer;

