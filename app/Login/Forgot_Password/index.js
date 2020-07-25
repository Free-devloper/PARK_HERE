import React, {useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View,ActivityIndicator } from 'react-native';
import { emailValidator } from '../../core/utils';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';
import {forgotrequest} from '../../store/actions/Forgot_pwd_actions'
import Button from '../../components/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Component } from 'react';
import NetInfo  from '@react-native-community/netinfo';
const codeValidator=(code)=>{
  if(code.length<=0)
  {
    return'Verification Code cannot be Empty';
  }
}
const ForgotPasswordComp = ({ navigation,props }) => {
  const unsubcribe=NetInfo.addEventListener(state => {
    return state.isConnected;
    })
  const [email, setEmail] = useState({ value: '', error: '' });
  const[loading,setloading]=useState({value:false});
  const [success,setsuccess]=useState({value:'none',message:''});
  const[connection,setconnection]=useState({value:unsubcribe})
  const[fail,setfail]=useState({value:'none',message:''});
  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }else{
        if(!connection.value)
        {
          setfail({value:'flex',message:'Error No Network Connection'})
          return false;
        }
      setloading({value:true});
    props.forgotrequest(email.value).then(async(resp)=>{
      const respon=await resp;
      console.log(resp);
      setloading({value:false})
      if(resp.error)
      {
        setfail({value:'flex',message:resp.data.toString()+' Please Try again Later'});
        setTimeout(()=>{
          setfail({value:'none',message:''});
        },5000)
      }else{
      if(!resp.data.email)
      {
        setEmail({error:'Invalid Mail'})
        setfail({value:'flex',message:'Email Not Found!'});
        setTimeout(()=>{
          setfail({value:'none',message:''});
        },3000)
      }else{
        let em=email.value;
        setEmail({value:''});
        setsuccess({value:'flex',message:em});
        setTimeout(()=>{
          setsuccess({value:'none'});
        },10000)
      }
    }
    })
    // setTimeout(()=>{
    //   setloading({value:false});
    // },3000;
    // navigation.navigate('Login');
  }
};
  if(loading.value)
  {
    return(
      <View style={styles.loading}>
      <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }else{
  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Login')} />

      <Logo />

      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <View style={{width:'100%',backgroundColor:'#6cc070',color:'#fff',display:success.value}}><Text style={{color:'#fff',fontWeight:'bold'}}>An Email with Password Reset details has been Sent to:{success.message}</Text></View>
  <View style={{width:'100%',backgroundColor:'#eb4934',color:'#fff',display:fail.value}}><Text style={{color:'#fff',fontWeight:'bold'}}>{fail.message}</Text></View>
      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
        Send Reset Instructions
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>
    </Background>
  );
};
}

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
  loading:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
});
class forgotPassword extends Component{
  state={
    loading:false
  }
  render()
  {
    if(this.state.loading)
    {

    }else{
      return(
        <ForgotPasswordComp navigation={this.props.navigation} props={this.props} />
      )
    }
  }
}
function mapStateToProps(state){
  return{
    Forgotpwd:state.Forgotpwd,
    User:state.User
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({forgotrequest},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps) (forgotPassword);
