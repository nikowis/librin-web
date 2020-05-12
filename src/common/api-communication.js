import {
    API_CHANGE_PASSWORD,
    API_CONFIRM_EMAIL, API_GENERATE_PASSWORD_CHANGE,
    API_GET_TOKEN,
    API_MESSAGES,
    API_MY_OFFERS,
    API_OFFERS,
    API_POLICIES,
    API_REGISTER,
    API_PROFILE,
    PRIVACY_POLICY,
    SOLD_SUFFIX,
    TERMS_AND_CONDITIONS
} from './endpoints'
import HttpUtility from './http-utility'
import {
    CREATE_CONVERSATION,
    DELETE_OFFER, EMAIL_CONFIRM,
    FETCH_MY_OFFER,
    FETCH_MY_OFFERS,
    FETCH_OFFER,
    FETCH_OFFERS,
    FETCH_USER,
    GET_ALL_CONVERSATIONS,
    GET_CONVERSATION,
    GET_TOKEN_ACTION,
    REGISTER_ACTION,
    SEND_MESSAGE,
    UPDATE_USER
} from "../redux/actions";
import {DEFAULT_PAGE_SIZE, DEFAULT_SORT, DESC_SORT, UPDATED_AT_SORT} from './app-constants'
import {CHANGE_PASSWORD_BASE, CONFIRM_EMAIL_BASE} from "./paths";

class Api {

    API_CLIENT_BASIC_OAUTH_HEADER = 'Basic d2ViQ2xpZW50OndlYkNsaWVudFNlY3JldA==';

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

    postGetToken(email, password) {

        const details = {
            username: email,
            password: password,
            "grant_type": "password"
        };

        let formBody = [];
        for (const property in details) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const headers = {
            Accept: 'application/json', Authorization: this.API_CLIENT_BASIC_OAUTH_HEADER,
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        const url = this.API_URL + API_GET_TOKEN;
        return HttpUtility.post({
            url: url,
            payload: formBody,
            headers: headers,
            action: GET_TOKEN_ACTION,
            json: false
        });
    };

    postRegister(data) {
        const url = this.API_URL + API_REGISTER;
        const prefix = process.env.REACT_APP_BASENAME !== "/" ? process.env.REACT_APP_BASENAME : '';
        data.confirmEmailBaseUrl = window.location.origin + prefix + CONFIRM_EMAIL_BASE;
        return HttpUtility.post({
            url: url,
            payload: {
                ...data
            },
            action: REGISTER_ACTION
        });
    }

    getUser() {
        const url = new URL(this.API_URL + API_PROFILE);
        return HttpUtility.get({
            url: url,
            action: FETCH_USER
        });
    };

    updateUser(data) {
        const url = this.API_URL + API_PROFILE;
        return HttpUtility.put({
            url: url,
            payload: {
                ...data
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

    getTermsAndConditionsURL() {
        return this.API_URL + API_POLICIES + '/' + TERMS_AND_CONDITIONS;
    }

    getPrivacyPolicyURL() {
        return this.API_URL + API_POLICIES + '/' + PRIVACY_POLICY;
    }

    deleteUser(data) {
        const url = this.API_URL + API_PROFILE;

        return HttpUtility.delete({
            url: url,
            payload: data
        });
    }

    confirmEmail(tokenId) {
        const url = this.API_URL + API_CONFIRM_EMAIL + '/' + tokenId ;

        return HttpUtility.put({
            url: url,
            action: EMAIL_CONFIRM
        });
    }

    generateResetPasswordToken(email) {
        const url = this.API_URL + API_GENERATE_PASSWORD_CHANGE;
        const prefix = process.env.REACT_APP_BASENAME !== "/" ? process.env.REACT_APP_BASENAME : '';
        const changePasswordBaseUrl = window.location.origin + prefix + CHANGE_PASSWORD_BASE;
        return HttpUtility.post({
            url: url,
            payload: {
                email,
                changePasswordBaseUrl
            }
        });
    }

    changePassword(tokenId, password) {
        const url = this.API_URL + API_CHANGE_PASSWORD + '/' + tokenId ;

        return HttpUtility.put({
            url: url,
            payload: {
                password
            }
        });
    }
}

export default Api = new Api();