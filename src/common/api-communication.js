import {
    API_LOGIN,
    API_LOGOUT,
    API_MESSAGES,
    API_MY_OFFERS,
    API_OFFERS,
    API_REGISTER,
    API_USER,
    SOLD_SUFFIX
} from './endpoints'
import HttpUtility from './http-utility'
import {
    CREATE_CONVERSATION,
    DELETE_OFFER,
    FETCH_MY_OFFER,
    FETCH_MY_OFFERS,
    FETCH_OFFER,
    FETCH_OFFERS,
    FETCH_USER,
    GET_ALL_CONVERSATIONS,
    GET_CONVERSATION,
    LOGIN_ACTION,
    LOGOUT_ACTION,
    REGISTER_ACTION,
    SEND_MESSAGE,
    UPDATE_USER
} from "../redux/actions";
import {DEFAULT_PAGE_SIZE, DEFAULT_SORT, DESC_SORT, UPDATED_AT_SORT} from './app-constants'

class Api {

    constructor() {
        this.API_URL = process.env.REACT_APP_API_URL;
    }

    getPageParam(searchQuery) {
        return parseInt(this.getURLParam(searchQuery, 'page'));
    }

    getURLParam(searchQuery, name) {
        const params = new URLSearchParams(searchQuery);
        return params.get(name);
    }

    postLogin(login, password) {
        const url = this.API_URL + API_LOGIN;
        return HttpUtility.post({
            url: url,
            payload: {
                login: login,
                password: password
            },
            action: LOGIN_ACTION
        });
    };

    logout() {
        const url = this.API_URL + API_LOGOUT;

        return HttpUtility.post({
            url: url,
            action: LOGOUT_ACTION
        });
    };

    postRegister(login, password) {
        const url = this.API_URL + API_REGISTER;
        return HttpUtility.post({
            url: url,
            payload: {
                login: login,
                password: password
            },
            action: REGISTER_ACTION
        });
    }

    getUser() {
        const url = new URL(this.API_URL + API_USER);
        return HttpUtility.get({
            url: url,
            action: FETCH_USER
        });
    };

    updateUser(password) {
        const url = this.API_URL + API_USER;
        return HttpUtility.put({
            url: url,
            payload: {
                password: password
            },
            action: UPDATE_USER
        });
    }

    getOffers(page, owner) {
        const params = {
            size: DEFAULT_PAGE_SIZE,
            sort: DEFAULT_SORT,
            page
        };

        if (!page || page < 0) {
            params.page = 0;
        }

        if (owner) {
            params.owner = owner;
        }

        const url = new URL(this.API_URL + API_OFFERS);
        url.search = new URLSearchParams(params).toString();
        return HttpUtility.get({
            url: url,
            action: FETCH_OFFERS
        });
    };

    getMyOffers(page) {
        const params = {
            size: DEFAULT_PAGE_SIZE,
            sort: DEFAULT_SORT,
            page
        };

        if (!page || page < 0) {
            params.page = 0;
        }

        const url = new URL(this.API_URL + API_MY_OFFERS);
        url.search = new URLSearchParams(params).toString();
        return HttpUtility.get({
            url: url,
            action: FETCH_MY_OFFERS
        });
    };

    getOffer(id) {
        const url = new URL(this.API_URL + API_OFFERS + '/' + id);
        return HttpUtility.get({
            url: url,
            action: FETCH_OFFER
        });
    };

    getMyOffer(id) {
        const url = new URL(this.API_URL + API_MY_OFFERS + '/' + id);
        return HttpUtility.get({
            url: url,
            action: FETCH_MY_OFFER
        });
    };

    createOffer(offer) {
        const url = this.API_URL + API_MY_OFFERS;

        return HttpUtility.post({
            url: url,
            payload: offer,
        });
    };

    updateOffer(offer) {
        const url = this.API_URL + API_MY_OFFERS + '/' + offer.id;

        return HttpUtility.put({
            url: url,
            payload: offer,
        });
    };

    removeOffer(id) {
        const url = this.API_URL + API_MY_OFFERS + '/' + id;

        return HttpUtility.delete({
            url: url,
            action: DELETE_OFFER
        });
    }

    offerSold(id) {
        const url = this.API_URL + API_MY_OFFERS + '/' + id + '/' + SOLD_SUFFIX;

        return HttpUtility.put({
            url: url,
        });
    }

    createConversation(offerId) {
        const url = this.API_URL + API_MESSAGES;

        return HttpUtility.post({
            url: url,
            payload: {offerId: offerId},
            action: CREATE_CONVERSATION
        });
    }

    getAllConversations(page) {
        const params = {
            size: DEFAULT_PAGE_SIZE,
            sort: UPDATED_AT_SORT + ',' + DESC_SORT,
            page
        };

        if (!page || page < 0) {
            params.page = 0;
        }

        const url = new URL(this.API_URL + API_MESSAGES);
        url.search = new URLSearchParams(params).toString();

        return HttpUtility.get({
            url: url,
            action: GET_ALL_CONVERSATIONS
        });
    }

    getConversation(conversationId) {
        const url = this.API_URL + API_MESSAGES + '/' + conversationId;

        return HttpUtility.get({
            url: url,
            action: GET_CONVERSATION
        });
    }

    sendMessage(conversationId, content) {
        const url = this.API_URL + API_MESSAGES + '/' + conversationId;

        return HttpUtility.post({
            url: url,
            payload: {content: content},
            action: SEND_MESSAGE
        });
    }
}

export default Api = new Api();