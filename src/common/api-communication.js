import {API_LOGIN, API_LOGOUT, API_OFFERS, API_REGISTER, API_USER} from './endpoints'
import HttpUtility from './http-utility'
import {
    DELETE_OFFER,
    FETCH_OFFERS,
    FETCH_USER,
    LOGIN_ACTION,
    LOGOUT_ACTION,
    REGISTER_ACTION,
    UPDATE_USER
} from "../redux/actions";
import {DEFAULT_PAGE_SIZE, DEFAULT_SORT} from './app-constants'

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

    getOffers(page) {
        if (!page || page < 0) {
            page = 0;
        }
        const url = new URL(this.API_URL + API_OFFERS);

        const params = {
            size: DEFAULT_PAGE_SIZE,
            page: page,
            sort: DEFAULT_SORT
        };
        url.search = new URLSearchParams(params).toString();

        return HttpUtility.get({
            url: url,
            action: FETCH_OFFERS
        });
    };

    createOffer(offer) {
        const url = this.API_URL + API_OFFERS;

        return HttpUtility.post({
            url: url,
            payload: offer,
        });
    };


    removeOffer(id) {
        const url = this.API_URL + API_OFFERS + '/' + id;

        return HttpUtility.delete({
            url: url,
            action: DELETE_OFFER
        });
    }


}

export default Api = new Api();