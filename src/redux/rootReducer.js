import {combineReducers} from "redux";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import offerReducer from "./offersReducer";
import appReducer from "./appReducer";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import myOffersReducer from "./myOffersReducer";
import messagesReducer from "./messagesReducer";

const USER_REDUCER_KEY = 'user';
const USERS_REDUCER_KEY = 'users';
const APP_REDUCER_KEY = 'app';
const OFFER_REDUCER_KEY = 'offers';
const MY_OFFER_REDUCER_KEY = 'myoffers';
const MESSAGES_REDUCER_KEY = 'messages';

const rootReducer = combineReducers({
    [USER_REDUCER_KEY]: userReducer,
    [USERS_REDUCER_KEY]: usersReducer,
    [APP_REDUCER_KEY]: appReducer,
    [OFFER_REDUCER_KEY]: offerReducer,
    [MY_OFFER_REDUCER_KEY]: myOffersReducer,
    [MESSAGES_REDUCER_KEY]: messagesReducer
});

const persistConfig = {
    key: USER_REDUCER_KEY,
    storage: storage,
    whitelist: [USER_REDUCER_KEY]
};

export default persistReducer(persistConfig, rootReducer);


