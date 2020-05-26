import {CLEAR_CURRENT_USER, FETCH_USER, FULFILLED, PENDING} from "./actions";

const initialState = {
    loaded: false,
    currentUser: {
        id: 0,
        username: '',
        status: ''
    },
};

const usersReducer = (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {
        case FETCH_USER + PENDING:
            return {
                ...state,
                loaded: false,
            };
        case FETCH_USER + FULFILLED:
            return {
                ...state,
                loaded: true,
                currentUser: {
                    ...payload
                }
            };
        case CLEAR_CURRENT_USER:
            return {
                ...state,
                loaded: false,
                currentUser: {
                    ...initialState.currentUser
                }
            };
        default:
            return state
    }
};

export default usersReducer;

