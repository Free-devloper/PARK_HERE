const initialState={
    authcode:{
        email:false,
        code:false,
        err:false
    }   
}
export default function(state=initialState,action)
{
    switch(action.type)
    {
        case 'pwd_reset':
        return{
        ...state,
        authcode:{
            email:action.payload.email || false,
            code:action.payload.code || false,
            err:action.payload.error || false
                   }
        }
        break;
        default:
            return state;
}
}