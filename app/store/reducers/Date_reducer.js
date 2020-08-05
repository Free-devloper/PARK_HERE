InitialState={
    date:false
}
export default function(state=InitialState,action){
    if(action.type=="DATEFETCH")
    {
        return{
            ...state,
            date:action.payload || false
        }
    }else{
        return{
            ...state,
            date:'false'
        }
    }
}