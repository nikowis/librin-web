import {combineReducers} from "redux";
import meReducer from "./meReducer";
import usersReducer from "./usersReducer";
import offerReducer from "./offersReducer";
import appReducer from "./appReducer";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import myOffersReducer from "./myOffersReducer";
import conversationsReducer from "./conversationsReducer";
import ratingsReducer from "./ratingsReducer";

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


