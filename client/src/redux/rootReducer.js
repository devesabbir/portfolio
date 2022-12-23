import { combineReducers } from 'redux';
import { userReducer } from './userAuth/userReducer';

export const rootReducer = combineReducers({
    user: userReducer
})

