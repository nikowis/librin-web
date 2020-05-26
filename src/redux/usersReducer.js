import {CLEAR_CURRENT_USER, FETCH_USER, FULFILLED, PENDING} from "./actions";

const initialState = {
    currentUser: {
        id: 0,
        username: '',
        status: '',
        apiError: null
    },
};

const usersReducer = (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {
        case FETCH_USER + PENDING:
            return {
                ...state,
            };
        case FETCH_USER + FULFILLED:
            if(payload.errors) {
                return {
                    ...state,
                    currentUser: {
                        ...initialState,
                        apiError: payload.errors[0].defaultMessage
                    }
                };
            }
            return {
                ...state,
                currentUser: {
                    ...payload
                }
            };
        case CLEAR_CURRENT_USER:
            return {
                ...state,
                currentUser: {
                    ...initialState.currentUser
                }
            };
        default:
            return state
    }
};

export default usersReducer;

