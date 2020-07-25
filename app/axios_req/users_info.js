import axios from 'axios';
import FIREBASEURL from '../core/misc';
async function insertUsername(name){
    let data={
        'Name':name
    }
try{
    let res= await axios({
        method:'POST',
        url:FIREBASEURL,
        data:'users.json/'+data,
    })
    return res;
}catch(error)
{
    console.log(error);
}
}