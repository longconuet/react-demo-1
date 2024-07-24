import { SET_TOKEN, LOGOUT } from '../actions/authAction';

const initialState = {
    account: null,
    isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                account: action.payload,
                isAuthenticated: true,
            };
        case LOGOUT:
            return {
                ...state,
                account: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;