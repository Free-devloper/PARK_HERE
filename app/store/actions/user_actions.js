import {
    SIGN_UP,
    SIGN_IN,
    AUTO_SIGN_IN
} from '../types';
import axios from 'axios';
import users_info from '../../axios_req/users_info'
import { SIGNUP,SIGNIN,FIREBASEURL,REFRESH } from '../../core/misc';
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
            uid:true,
            token:true,
            refToken:true,
            error:err
        }
    }
}
export function signUp(data){
    let res={}
    return (dispatch,getState)=>{
    return new Promise((resolve, reject) => {
    const request = axios({
        method:'POST',
        url:SIGNUP,
        data:{
            email:data.email,
            password:data.pwd, 
            returnSecureToken:true
        },
        header:{
            "Content-Type":"application/json"
        }
    }).then(async(response)=>{
        res=await response.data;
        r=saveuser(data.name,res);
        dispatch(success(response.data,SIGN_UP))
    }).catch(err=>{
        dispatch(Error(err,SIGN_UP))
    })
    setTimeout(()=>resolve(res),2000)
})
}
}
const started=()=>({
    type:SIGN_IN
})
export function signIn(data){
    let res={}
    return (dispatch,getState)=>{
    return new Promise((resolve, reject) => {
    axios({
            method:'POST',
            url:SIGNIN,
            timeout:5000,
            data:{
                email:data.email,
                password:data.pwd,
                returnSecureToken:true
            },
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response=>{
            res=response.data;
            dispatch(success(response.data,SIGN_IN))
            resolve(res);
        }).catch(err=>{
            dispatch(Error(err.Error,SIGN_IN));
            console.log(err)
            if(err.toString()==='Error: Network Error')
            {
                res={
                    error:true,
                    data:"Server not Reachable! Check internet connection"
                }    
            }else{
            res={
                error:true,
                data:err.response.data.error.message
            }
        }
            resolve(res);
        })
    })
}
}

export const autoSignIn = (refToken) =>{
    res={}
    return (dispatch,getState)=>{
    return new Promise((resolve, reject) => {
     axios({
        method:"POST",
        url: REFRESH,
        data: "grant_type=refresh_token&refresh_token=" + refToken,
        header:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    }).then( response=>{
        res=response.data;
        dispatch(success(response.data,AUTO_SIGN_IN))
    }).catch( e => {
        dispatch(Error(err,AUTO_SIGN_IN))
    });
    setTimeout(()=>resolve(res),2000)
})
}
}
const saveuser= async(dataname,res)=>{
    data={
        name:dataname,
        role:'user',
        status:{
            active:true
        },
        Wallet:{
            amount:30,
            Recharge:0,
            Spent:0,
        },
        Profilepic:'gs://parkme-88c9c.appspot.com/Users/Profilepic/avatar6.png',
        ...res
    }
    console.log(res);
    try{
    const response = await axios.put(FIREBASEURL+`Users/${res.localId}.json`,data);
    return response;
    }catch(error)
    {
        console.log(error.response);
    }
}