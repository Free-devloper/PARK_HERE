import {GET_MARKERS} from '../types';
initialState={
    markers:{
    data:false,
    }
}
export default function(state=initialState,action)
{
    switch(action.type)
    {
        case GET_MARKERS:
            return{
                ...state,
                markers:{
                   data:action.payload.data,
                }
            }
        default:
            return state;
    }
} 