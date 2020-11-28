import {
  CREATE_CONVERSATION,
  FULFILLED,
  GET_ALL_CONVERSATIONS,
  GET_CONVERSATION,
  GET_CONVERSATION_MESSAGES,
  READ_CONVERSATION,
  SELL_OFFER,
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
    currentPage: null,
    totalPages: null,
    totalElements: null,
    offer: null,
    createdAt: null
  }
};

function replaceUpdatedConversationInListIfPossible(conversationList, updatedConv, putAtStart = true) {
  if (conversationList && conversationList.length > 0) {
    const updatedConvIndex = conversationList ? conversationList.findIndex(conv => conv.id === updatedConv.id) : null;
    if (updatedConvIndex === 0 || updatedConvIndex > 0) {
      conversationList = removeItem(conversationList, updatedConvIndex);
      conversationList = insertItem(conversationList, {index: putAtStart ? 0 : updatedConvIndex, item: updatedConv});
    }
  }
  return conversationList;
}

function msgComparator(a, b) {
  let aDate = new Date(a.createdAt);
  let bDate = new Date(b.createdAt);

  if (aDate < bDate) {
    return -1;
  }
  if (aDate > bDate) {
    return 1;
  }
  return 0;
}


function addNewMessage(messages, newMessage) {
  messages.push(newMessage);
  return messages.sort(msgComparator);
}


const conversationsReducer = (state = initialState, action) => {
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
    case GET_CONVERSATION_MESSAGES + FULFILLED: {
      let msgs = payload.content;

      //merge old messages and filter out same messages
      if (state.currentConversation.messages) {
        msgs = msgs.concat(state.currentConversation.messages);
        // msgs = msgs.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
      }
      msgs = msgs.sort(msgComparator);

      return {
        ...state,
        currentConversation: {
          ...state.currentConversation,
          messages: msgs,
          currentPage: payload.number + 1,
          totalPages: payload.totalPages,
          totalElements: payload.totalElements,
          lastPage: payload.last
        }
      }
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
          ...state.currentConversation,
          messages: addNewMessage(state.currentConversation.messages, payload),
        }
      };
    }
    case WS_UPDATE_CONVERSATION: {
      let mustReload = false;
      let updatedConversationList = null;
      const updatedConversation = state.content ? state.content.find(conv => conv.id === payload.conversationId) : null;
      if (updatedConversation) {
        if (payload.offerStatus) {
          updatedConversation.offer.status = payload.offerStatus;
          updatedConversation.offer.soldToMe = payload.soldToMe;
        } else {
          updatedConversation.read = false;
          updatedConversation.updatedAt = payload.createdAt;
        }
        updatedConversationList = replaceUpdatedConversationInListIfPossible(state.content, updatedConversation);
      } else {
        mustReload = true;
      }

      const currConv = state.currentConversation;
      if (currConv.id === payload.conversationId) {
        if (payload.id) {
          currConv.messages = addNewMessage(currConv.messages, payload);
          currConv.updatedAt = payload.createdAt;
          currConv.read = false;
        } else if (payload.offerStatus) {
          currConv.offer.status = payload.offerStatus;
          currConv.offer.soldToMe = payload.soldToMe;
        }
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
      if (updatedConversation) {
        updatedConversation.read = true;
        updatedConversationList = replaceUpdatedConversationInListIfPossible(state.content, updatedConversation);
      }

      const currConv = state.currentConversation;
      if (currConv.id === payload.id) {
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
    case SELL_OFFER + FULFILLED:
      return initialState;
    default:
      return state
  }
};

export default conversationsReducer;

