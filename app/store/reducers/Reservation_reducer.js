initialState={reservationdata:null}
export default function (state=initialState,action){
    switch(action.type){
        case 'RESERVATION_DATA_SAVE':
            return{
                ...state,
                reservationdata:action.payload
            }
            default:
                return false;
    }

}