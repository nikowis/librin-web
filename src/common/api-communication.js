import {API_LOGIN, API_LOGOUT, API_REGISTER, API_USER} from './endpoints'
import HttpUtility from './http-utility'
import {FETCH_USER, LOGIN_ACTION, LOGOUT_ACTION, REGISTER_ACTION, UPDATE_USER} from "../redux/actions";

class Api {

    constructor() {
        this.API_URL = process.env.REACT_APP_API_URL;
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

    getPageParam(searchQuery) {
        return parseInt(this.getURLParam(searchQuery, 'page'));
    }

    getURLParam(searchQuery, name) {
        const params = new URLSearchParams(searchQuery);
        return  params.get(name);
    }
}

export default Api = new Api();