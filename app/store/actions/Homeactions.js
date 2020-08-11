import axios from 'axios';
import {FIREBASEURL} from '../../core/misc';
import {GET_MARKERS} from '../types';
const success=(type,data)=>{
    return{
        type:type,
        payload:data
    }
}
export function getmarkers()
{
    return (dispatch)=>{
        return new Promise((resolve,reject)=>{
    const res=axios({
        method:'get',
        url:FIREBASEURL+'Parkinglots.json',
        data:{},
        header:{
            "Content-Type":"application/json"
        }
    }).then( async res=>{
        resp=await res;
        let data={
            data:resp.data,
            error:false
        }
        dispatch(success(GET_MARKERS,data))
        resolve(res); 
    }).catch(async error=>{
        let data={
            data:error,
            error:true
        }
        dispatch(success(GET_MARKERS,data))
        console.log(data);
        resolve(data);
    })
})
}
}