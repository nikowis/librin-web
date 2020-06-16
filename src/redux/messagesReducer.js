import {
    CREATE_CONVERSATION,
    FULFILLED,
    GET_ALL_CONVERSATIONS,
    GET_CONVERSATION,
    READ_CONVERSATION,
    SEND_MESSAGE,
    WS_UPDATE_CONVERSATION
} from "./actions";
import {insertItem, removeItem} from "../common/array-helper";

const initialState = {
    content: null,
    currentPage: null,
    totalPages: null,
    totalElements: null,
    mustReload: false,
    currentConversation: {
        id: null,
        messages: [],
        offer: null,
        createdAt: null
    }
};

function replaceUpdatedConversationInListIfPossible(conversationList, updatedConv, putAtStart=true) {
    if(conversationList && conversationList.length > 0) {
        const updatedConvIndex = conversationList ? conversationList.findIndex(conv => conv.id === updatedConv.id) : null;
        if (updatedConvIndex === 0 || updatedConvIndex > 0) {
            conversationList = removeItem(conversationList, updatedConvIndex);
            conversationList = insertItem(conversationList, {index: putAtStart ? 0 : updatedConvIndex, item: updatedConv});
        }
    }
    return conversationList;
}

const messagesReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case GET_CONVERSATION + FULFILLED: {
            const conversationList = replaceUpdatedConversationInListIfPossible(state.content, payload, false);

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
                mustReload: false
            };
        case SEND_MESSAGE + FULFILLED: {
            const conversationList = replaceUpdatedConversationInListIfPossible(state.content, payload);

            return {
                ...state,
                content: conversationList,
                currentConversation: {
                    ...payload
                }
            };
        }
        case WS_UPDATE_CONVERSATION: {
            let mustReload = false;
            let updatedConversationList = null;
            const updatedConversation = state.content ? state.content.find(conv => conv.id === payload.conversationId) : null;
            if(updatedConversation) {
                updatedConversation.read = false;
                updatedConversation.updatedAt = payload.createdAt;
                updatedConversationList = replaceUpdatedConversationInListIfPossible(state.content, updatedConversation);
            } else {
                mustReload = true;
            }

            const currConv = state.currentConversation;
            if(currConv.id === payload.conversationId) {
                currConv.messages.push(payload);
                currConv.read = false;
                currConv.updatedAt = payload.createdAt;
            }

            return {
                ...state,
                content: updatedConversationList,
                mustReload: mustReload,
                currentConversation: {
                    ...currConv
                }
            };
        }

        case READ_CONVERSATION: {
            let updatedConversationList = null;
            const updatedConversation = state.content ? state.content.find(conv => conv.id === payload.id) : null;
            if(updatedConversation) {
                updatedConversation.read = true;
                updatedConversationList = replaceUpdatedConversationInListIfPossible(state.content, updatedConversation);
            }

            const currConv = state.currentConversation;
            if(currConv.id === payload.id) {
                currConv.read = true;
            }

            return {
                ...state,
                content: updatedConversationList,
                currentConversation: {
                    ...currConv
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

