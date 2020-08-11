import database from '../../Firebase/index';
export function SaveReservationdata(data)
{
    console.log(data);
    return{
        type:'RESERVATION_DATA_SAVE',
        payload:data
    }
}