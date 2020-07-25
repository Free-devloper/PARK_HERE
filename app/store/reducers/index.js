import { combineReducers } from 'redux';
import User from './user_reducer';
import Forgotpwd from './forgotpwd_reducer';
import Markers from './Homereducers';

const rootReducer = combineReducers({
    User,
    Forgotpwd,
    Markers
});

export default rootReducer;