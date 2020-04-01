import { combineReducers } from 'redux';
import user from './user_reducer';
import comment from './comments_reducer';

const rootReducer = combineReducers({
    user,
    comment
});

export default rootReducer;