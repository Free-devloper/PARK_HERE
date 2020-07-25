import AsyncStorage from '@react-native-community/async-storage';

export const FIREBASEURL = `https://parkme-88c9c.firebaseio.com/`;
export const APIKEY = `AIzaSyDB-PW9fv71bKmp0M7C3TeN2HzY59RZXFU`;
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;
export const FORGOTPWD=`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${APIKEY}`;

export const getTokens = (cb) => {

    AsyncStorage.multiGet([
        '@Parkhere@token',
        '@Parkhere@refreshToken',
        '@Parkhere@expireToken',
        '@Parkhere@uid'
    ]).then( value => {
        cb(value);
    });

}

export const setTokens = (values,cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);
 
    AsyncStorage.multiSet([
        ['@Parkhere@token',values.token],
        ['@Parkhere@refreshToken',values.refToken],
        ['@Parkhere@expireToken',expiration.toString()],
        ['@Parkhere@uid',values.uid]
    ]).then( response => {
        cb();
    });
}



