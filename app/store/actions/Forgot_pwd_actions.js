import axios from 'axios';
import {FORGOTPWD} from '../../core/misc';
const success=(resp,type)=>{
    return{
        type:type,
        payload:{...resp}
    }
}
const Error=(err,type)=>{
    return{
        type:type,
        payload:{
            email:false,
            code:false,
            error:err
        }
    }
}
export function forgotrequest(data_email){
    res={
        error:false,
        data:''
    };
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {
            const request=axios({
                method:'POST',
                url:FORGOTPWD,
                data:{
                    'requestType':'PASSWORD_RESET',
                    "email":data_email
                },
                header:{
                    "Content-Type": "application/json"
                }
            }).then(async resp=>{
                res={
                    error:false,
                    data:resp.data
                }
                dispatch(success(resp.data,'pwd_reset'));
                resolve(res);
            }).catch(err=>{
                res={
                    error:true,
                    data:err,
                }
                dispatch(Error(err,'pwd_reset'))
                resolve(res);
            })
        })
    }
} 