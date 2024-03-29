import {
  ACTIVATE_SUFFIX, API_BOOKS_AUTOCOMPLETE,
  API_CHANGE_PASSWORD,
  API_CONFIRM_EMAIL, API_GENERATE_ACCOUNT_ACTIVATION_EMAIL,
  API_GENERATE_PASSWORD_CHANGE,
  API_GET_TOKEN,
  API_CONVERSATIONS,
  API_CONVERSATION_READ,
  API_MY_OFFERS,
  API_OFFERS,
  API_POLICIES,
  API_PROFILE, API_RATINGS,
  API_REGISTER,
  API_REPORTS,
  API_USERS,
  COOKIES_POLICY,
  DEACTIVATE_SUFFIX,
  PRIVACY_POLICY,
  SOLD_SUFFIX,
  TERMS_AND_CONDITIONS, API_MESSAGES, API_CITIES_AUTOCOMPLETE, API_PREFERENCES,
} from "common/endpoints";
import HttpUtility from "common/http-utility";
import {
  CREATE_CONVERSATION,
  DELETE_OFFER,
  EDIT_OFFER,
  EMAIL_CONFIRM,
  FETCH_ME,
  FETCH_MY_OFFER,
  FETCH_MY_OFFERS,
  FETCH_OFFER,
  FETCH_USER,
  GET_ALL_CONVERSATIONS,
  GET_CONVERSATION, GET_CONVERSATION_MESSAGES, GET_RATINGS,
  GET_TOKEN_ACTION,
  REGISTER_ACTION,
  SELL_OFFER,
  SEND_MESSAGE,
  UPDATE_USER,
} from "redux/actions";
import {
  CREATED_AT_SORT,
  DEFAULT_MESSAGES_PAGE_SIZE,
  DEFAULT_PAGE_SIZE,
  DESC_SORT,
  UPDATED_AT_SORT,
} from "common/app-constants";
import {CHANGE_PASSWORD_BASE, CONFIRM_EMAIL_BASE} from "common/paths";
import {cleanFields} from "common/object-helper";

class Api {
  API_CLIENT_BASIC_OAUTH_HEADER = "Basic d2ViQ2xpZW50OndlYkNsaWVudFNlY3JldA==";

  constructor() {
    this.API_URL = process.env.REACT_APP_API_URL;
  }

  getPageParam(searchQuery) {
    return parseInt(this.getURLParam(searchQuery, "page"));
  }

  getURLParam(searchQuery, name) {
    const params = new URLSearchParams(searchQuery);
    return params.get(name);
  }

  postGetToken(email, password) {
    const details = {
      username: email,
      password: password,
      grant_type: "password",
    };

    let formBody = [];
    for (const property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const headers = {
      Accept: "application/json",
      Authorization: this.API_CLIENT_BASIC_OAUTH_HEADER,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const url = this.API_URL + API_GET_TOKEN;
    return HttpUtility.post({
      url: url,
      payload: formBody,
      headers: headers,
      action: GET_TOKEN_ACTION,
      json: false,
    });
  }

  postRegister(data) {
    const url = this.API_URL + API_REGISTER;
    const prefix =
      process.env.REACT_APP_BASENAME !== "/"
        ? process.env.REACT_APP_BASENAME
        : "";
    data.confirmEmailBaseUrl =
      window.location.origin + prefix + CONFIRM_EMAIL_BASE;
    return HttpUtility.post({
      url: url,
      payload: {
        ...data,
      },
      action: REGISTER_ACTION,
    });
  }

  getMe() {
    const url = new URL(this.API_URL + API_PROFILE);
    return HttpUtility.get({
      url: url,
      action: FETCH_ME,
    });
  }

  getUser(userId) {
    const url = new URL(this.API_URL + API_USERS + "/" + userId);
    return HttpUtility.get({
      url: url,
      action: FETCH_USER,
    });
  }

  updateUser(data) {
    const url = this.API_URL + API_PROFILE;
    return HttpUtility.put({
      url: url,
      payload: {
        ...data,
      },
      action: UPDATE_USER,
    });
  }

  updateUserPreferences(data) {
    const url = this.API_URL + API_PROFILE + API_PREFERENCES;
    return HttpUtility.put({
      url: url,
      payload: {
        ...data,
      },
      action: UPDATE_USER,
    });
  }

  getOffers(filter, action) {
    const url = new URL(this.API_URL + API_OFFERS);
    const cleanFilter = cleanFields(filter);
    cleanFilter['page'] = cleanFilter['page'] - 1;
    url.search = new URLSearchParams(cleanFilter).toString();
    return HttpUtility.get({
      url: url,
      action: action,
    });
  }

  getMyOffers(page) {
    const params = {
      size: DEFAULT_PAGE_SIZE,
      sort: CREATED_AT_SORT + "," + DESC_SORT,
      page,
    };

    if (!page || page < 0) {
      params.page = 0;
    }

    const url = new URL(this.API_URL + API_MY_OFFERS);
    url.search = new URLSearchParams(params).toString();
    return HttpUtility.get({
      url: url,
      action: FETCH_MY_OFFERS,
    });
  }

  getOffer(id) {
    const url = new URL(this.API_URL + API_OFFERS + "/" + id);
    return HttpUtility.get({
      url: url,
      action: FETCH_OFFER,
    });
  }

  getMyOffer(id) {
    const url = new URL(this.API_URL + API_MY_OFFERS + "/" + id);
    return HttpUtility.get({
      url: url,
      action: FETCH_MY_OFFER,
    });
  }

  createOffer(offer) {
    const url = this.API_URL + API_MY_OFFERS;

    return HttpUtility.post({
      url: url,
      payload: offer,
    });
  }

  updateOffer(offer) {
    const url = this.API_URL + API_MY_OFFERS + "/" + offer.id;

    return HttpUtility.put({
      url: url,
      payload: offer,
    });
  }

  removeOffer(id) {
    const url = this.API_URL + API_MY_OFFERS + "/" + id;

    return HttpUtility.delete({
      url: url,
      action: DELETE_OFFER,
    });
  }

  sellOffer(offerId, customerId) {
    const url =
      this.API_URL + API_MY_OFFERS + "/" + offerId + "/" + SOLD_SUFFIX;

    return HttpUtility.put({
      url: url,
      payload: { customerId },
      action: SELL_OFFER,
    });
  }

  activateOffer(offerId) {
    const url =
        this.API_URL + API_MY_OFFERS + "/" + offerId + "/" + ACTIVATE_SUFFIX;

    return HttpUtility.put({
      url: url,
      action: EDIT_OFFER,
    });
  }

  deactivateOffer(offerId) {
    const url =
        this.API_URL + API_MY_OFFERS + "/" + offerId + "/" + DEACTIVATE_SUFFIX;

    return HttpUtility.put({
      url: url,
      action: EDIT_OFFER,
    });
  }

  createConversation(offerId) {
    const url = this.API_URL + API_CONVERSATIONS;

    return HttpUtility.post({
      url: url,
      payload: { offerId: offerId },
      action: CREATE_CONVERSATION,
    });
  }

  getAllConversations(page) {
    const params = {
      size: DEFAULT_PAGE_SIZE,
      sort: UPDATED_AT_SORT + "," + DESC_SORT,
      page,
    };

    if (!page || page < 0) {
      params.page = 0;
    }

    const url = new URL(this.API_URL + API_CONVERSATIONS);
    url.search = new URLSearchParams(params).toString();

    return HttpUtility.get({
      url: url,
      action: GET_ALL_CONVERSATIONS,
    });
  }

  getConversation(conversationId) {
    const url = this.API_URL + API_CONVERSATIONS + "/" + conversationId;

    return HttpUtility.get({
      url: url,
      action: GET_CONVERSATION,
    });
  }

  sendMessage(conversationId, content) {
    const url = this.API_URL + API_CONVERSATIONS + "/" + conversationId;

    return HttpUtility.post({
      url: url,
      payload: { content: content },
      action: SEND_MESSAGE,
    });
  }

  markConversationAsRead(conversationId) {
    const url =
      this.API_URL + API_CONVERSATIONS + "/" + conversationId + API_CONVERSATION_READ;

    return HttpUtility.put({
      url: url,
    });
  }

  getTermsAndConditionsURL() {
    return this.API_URL + API_POLICIES + "/" + TERMS_AND_CONDITIONS;
  }

  getPrivacyPolicyURL() {
    return this.API_URL + API_POLICIES + "/" + PRIVACY_POLICY;
  }

  getCookiesPolicyLink() {
    return this.API_URL + API_POLICIES + "/" + COOKIES_POLICY;
  }

  deleteProfile(data) {
    const url = this.API_URL + API_PROFILE;

    return HttpUtility.delete({
      url: url,
      payload: data,
    });
  }

  report(data) {
    const url = this.API_URL + API_REPORTS;

    return HttpUtility.post({
      url: url,
      payload: data,
    });
  }

  changeProfilePassword(data) {
    const url = this.API_URL + API_PROFILE + API_CHANGE_PASSWORD;

    return HttpUtility.put({
      url: url,
      payload: { ...data },
    });
  }

  confirmEmail(tokenId) {
    const url = this.API_URL + API_CONFIRM_EMAIL + "/" + tokenId;

    return HttpUtility.put({
      url: url,
      action: EMAIL_CONFIRM,
    });
  }

  generateResetPasswordToken(email) {
    const url = this.API_URL + API_GENERATE_PASSWORD_CHANGE;
    const prefix =
      process.env.REACT_APP_BASENAME !== "/"
        ? process.env.REACT_APP_BASENAME
        : "";
    const changePasswordBaseUrl =
      window.location.origin + prefix + CHANGE_PASSWORD_BASE;
    return HttpUtility.post({
      url: url,
      payload: {
        email,
        changePasswordBaseUrl,
      },
    });
  }

  resendAccountConfirmationEmail(email) {
    const url = this.API_URL + API_GENERATE_ACCOUNT_ACTIVATION_EMAIL;
    const prefix =
        process.env.REACT_APP_BASENAME !== "/"
            ? process.env.REACT_APP_BASENAME
            : "";
    const confirmEmailBaseUrl =
        window.location.origin + prefix + CONFIRM_EMAIL_BASE;

    return HttpUtility.post({
      url: url,
      payload: {
        email,
        confirmEmailBaseUrl
      },
    });
  }

  changePassword(tokenId, password) {
    const url = this.API_URL + API_CHANGE_PASSWORD + "/" + tokenId;

    return HttpUtility.put({
      url: url,
      payload: {
        password,
      },
    });
  }

  getAuthorAutocomplete(query) {
    const url = new URL(this.API_URL + API_BOOKS_AUTOCOMPLETE);
    const params = {
      author: query
    };
    url.search = new URLSearchParams(params).toString();

    return HttpUtility.get({
      url: url
    });
  }

  getCityAutocomplete(query) {
    const url = new URL(this.API_URL + API_CITIES_AUTOCOMPLETE);
    const params = {
      query: query
    };
    url.search = new URLSearchParams(params).toString();

    return HttpUtility.get({
      url: url
    });
  }

  createOfferRating(userId, data) {
    const url = this.API_URL + API_USERS + "/" + userId + API_RATINGS;

    return HttpUtility.post({
      url: url,
      payload: data,
    });
  }

  getRatings(userId, page) {
    const params = {
      size: DEFAULT_PAGE_SIZE,
      sort: UPDATED_AT_SORT + "," + DESC_SORT,
      page,
    };

    if (!page || page < 0) {
      params.page = 0;
    }

    const url = new URL(this.API_URL + API_USERS + "/" + userId + API_RATINGS );
    url.search = new URLSearchParams(params).toString();

    return HttpUtility.get({
      url: url,
      action: GET_RATINGS,
    });
  }

  getMessages(conversationId, page) {
    const params = {
      size: DEFAULT_MESSAGES_PAGE_SIZE,
      sort: CREATED_AT_SORT + "," + DESC_SORT,
      page,
    };

    if (!page || page < 0) {
      params.page = 0;
    }

    const url = new URL(this.API_URL + API_CONVERSATIONS + "/" + conversationId + API_MESSAGES);
    url.search = new URLSearchParams(params).toString();

    return HttpUtility.get({
      url: url,
      action: GET_CONVERSATION_MESSAGES,
    });
  }
}

export default Api = new Api();
