import {store} from '../index';
import {
  API_ERROR,
  AUTH_ERROR,
  CLEAR_API_ERROR,
  CLEAR_AUTH_ERROR,
  CLEAR_SERVER_ERROR,
  HTTP_REQUEST_FINISH,
  HTTP_REQUEST_START,
  SERVER_ERROR
} from "../redux/actions";
import {API_ERROR_NOTIFICATION_DURATION, AUTH_ERROR_NOTIFICATION_DURATION} from './app-constants'
import i18n from '../i18n';

class HttpUtility {

    call(params, startAction, endAction) {
        const {url, method, payload, headers, action, json = true} = params;
        if (startAction) {
            store.dispatch({type: startAction});
        }

        let resolvedHeaders = headers ? headers : {Accept: 'application/json', 'Content-Type': 'application/json'};
        resolvedHeaders['Accept-Language'] = store.getState().me.lang;
        const authToken = store.getState().me.authToken;
        if (authToken) {
            resolvedHeaders['Authorization'] = 'Bearer ' + authToken;
        }
        return {
            type: action,
            payload: fetch(url, {
                method,
                body: payload ? (json ? JSON.stringify(payload) : payload) : undefined,
                headers: resolvedHeaders,
                credentials: 'include'
            }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    const contentType = response.headers.get('Content-Type');
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        return response.json();
                    } else {
                        return response;
                    }
                } else if (response.status === 400) {
                    const respJson = response.json();
                    store.dispatch({
                        type: API_ERROR
                        , payload: respJson
                    });
                    setTimeout(() => {
                        store.dispatch({type: CLEAR_API_ERROR})
                    }, API_ERROR_NOTIFICATION_DURATION)
                    return respJson;
                } else {
                    this.handleError(response);
                    return Promise.reject(response);
                }
            }).catch(response => {
                if (!response.status || response.status > 500) {
                    // console.log(response);
                    store.dispatch({
                        type: SERVER_ERROR
                        , payload: i18n.t('servererror')
                    });
                    setTimeout(() => {
                        store.dispatch({type: CLEAR_SERVER_ERROR})
                    }, API_ERROR_NOTIFICATION_DURATION)
                }
                return Promise.reject();
            }).finally(() => store.dispatch({type: endAction}))
        }
    }

    handleError(response) {
        if (response.status === 401 || response.status === 403) {
            store.dispatch({
                type: AUTH_ERROR
                , payload: response.json()
            });
            setTimeout(() => {
                store.dispatch({type: CLEAR_AUTH_ERROR})
            }, AUTH_ERROR_NOTIFICATION_DURATION);
        } else if (response.status === 400 || response.status === 500) {
            store.dispatch({
                type: API_ERROR
                , payload: response.json()
            });
            setTimeout(() => {
                store.dispatch({type: CLEAR_API_ERROR})
            }, API_ERROR_NOTIFICATION_DURATION)
        } else {
            throw new Error(response.json());
        }
    }

    get(params, startAction = HTTP_REQUEST_START, endAction = HTTP_REQUEST_FINISH) {
        Object.assign(params, {method: 'GET'});
        return this.call(params, startAction, endAction);
    }

    post(params, startAction = HTTP_REQUEST_START, endAction = HTTP_REQUEST_FINISH) {
        Object.assign(params, {method: 'POST'});
        return this.call(params, startAction, endAction);
    }

    put(params, startAction = HTTP_REQUEST_START, endAction = HTTP_REQUEST_FINISH) {
        Object.assign(params, {method: 'PUT'});
        return this.call(params, startAction, endAction);
    }

    delete(params, startAction = HTTP_REQUEST_START, endAction = HTTP_REQUEST_FINISH) {
        Object.assign(params, {method: 'DELETE'});
        return this.call(params, startAction, endAction);
    }

    buildQueryParams(queryParams) {
        return Object.keys(queryParams)
            .reduce((query, param) => [...query, encodeURIComponent(param) + '=' + encodeURIComponent(queryParams[param])], [])
            .join('&');
    }

}

export default HttpUtility = new HttpUtility();
