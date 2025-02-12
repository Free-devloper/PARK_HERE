import {
    SIGN_UP,
    SIGN_IN,
    AUTO_SIGN_IN
} from '../types';

const Initialstate={
    auth:{
        uid:false,
        token:false,
        refToken:false,
        err:false
    }
}
export default function(state=Initialstate,action){
    switch(action.type){
        case SIGN_IN:
            return {
                ...state,    
                auth:{
                    uid:action.payload.localId || false,
                    token:action.payload.idToken || false,
                    refToken:action.payload.refreshToken || false,
                    err:action.payload.error || false,
                }
            }
        case SIGN_UP:
            return {
                ...state,    
                auth:{
                    uid:action.payload.localId || false,
                    token:action.payload.idToken || false,
                    refToken:action.payload.refreshToken || false,
                    err:action.payload.error || false
                }
             }
        case AUTO_SIGN_IN:
            return {
                ...state,
                auth:{
                    uid:action.payload.user_id || false,
                    token:action.payload.id_token || false,
                    refToken: action.payload.refresh_token || false,
                    err:action.payload.error || false
                }
            }
        default:
            return state
    }
}