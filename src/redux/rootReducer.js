import {combineReducers} from "redux";
import meReducer from "redux/meReducer";
import usersReducer from "redux/usersReducer";
import offerReducer from "redux/offersReducer";
import appReducer from "redux/appReducer";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import myOffersReducer from "redux/myOffersReducer";
import conversationsReducer from "redux/conversationsReducer";
import ratingsReducer from "redux/ratingsReducer";

const ME_REDUCER_KEY = 'me';
const USERS_REDUCER_KEY = 'users';
const APP_REDUCER_KEY = 'app';
const OFFER_REDUCER_KEY = 'offers';
const MY_OFFER_REDUCER_KEY = 'myoffers';
const CONVERSATIONS_REDUCER_KEY = 'conversations';
const RATINGS_REDUCER_KEY = 'ratings';

const rootReducer = combineReducers({
    [ME_REDUCER_KEY]: meReducer,
    [USERS_REDUCER_KEY]: usersReducer,
    [APP_REDUCER_KEY]: appReducer,
    [OFFER_REDUCER_KEY]: offerReducer,
    [MY_OFFER_REDUCER_KEY]: myOffersReducer,
    [CONVERSATIONS_REDUCER_KEY]: conversationsReducer,
    [RATINGS_REDUCER_KEY]: ratingsReducer
});

const persistConfig = {
    key: ME_REDUCER_KEY,
    storage: storage,
    whitelist: [ME_REDUCER_KEY]
};

export default persistReducer(persistConfig, rootReducer);


