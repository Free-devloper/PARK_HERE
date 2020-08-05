import { combineReducers } from 'redux';
import User from './user_reducer';
import Forgotpwd from './forgotpwd_reducer';
import Markers from './Homereducers';
import Date_check from './Date_reducer';

const rootReducer = combineReducers({
    User,
    Forgotpwd,
    Markers,
    Date_check

});

export default rootReducer;