import {
    CREATE_CONVERSATION,
    FULFILLED,
    GET_ALL_CONVERSATIONS,
    GET_CONVERSATION,
    SEND_MESSAGE
} from "./actions";
import {insertItem, removeItem} from "../common/array-helper";

const initialState = {
    content: null,
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

function replaceFetchedEntityInListIfPossible(conversationList, newEntity, putAtStart=true) {
    if(conversationList && conversationList.length > 0) {
        const updatedConvIndex = conversationList ? conversationList.findIndex(conv => conv.id === newEntity.id) : null;
        if (updatedConvIndex  && updatedConvIndex >= 0) {
            conversationList = removeItem(conversationList, updatedConvIndex);
            conversationList = insertItem(conversationList, {index: putAtStart ? 0 : updatedConvIndex, item: newEntity});
        }
    }
    return conversationList;
}

const messagesReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case GET_CONVERSATION + FULFILLED: {
            const conversationList = replaceFetchedEntityInListIfPossible(state.content, payload, false);

            return {
                ...state,
                content: conversationList,
                currentConversation: {
                    ...payload
                }
            };
        }
        case GET_ALL_CONVERSATIONS + FULFILLED:
            return {
                ...state,
                content: payload.content,
                currentPage: payload.number + 1,
                totalPages: payload.totalPages,
                totalElements: payload.totalElements,
            };
        case SEND_MESSAGE + FULFILLED: {
            const conversationList = replaceFetchedEntityInListIfPossible(state.content, payload);

            return {
                ...state,
                content: conversationList,
                currentConversation: {
                    ...payload
                }
            };
        }
        case CREATE_CONVERSATION + FULFILLED:
            return initialState;
        default:
            return state
    }
};

export default messagesReducer;

