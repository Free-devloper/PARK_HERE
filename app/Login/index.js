import React, {useState, Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert,ActivityIndicator, Image } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Background from '../components/Background';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { ScrollView, State } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {signIn,autoSignIn} from './../store/actions/user_actions'
import { bindActionCreators } from 'redux';
import { getTokens, setTokens } from '../core/misc';
const Logincomp = ({props,setState,manageAccess,state}) => {
  data={}
  const [email, setEmail] = useState({ value: '', error:state.haserros });
  const [password, setPassword] = useState({ value: '', error:state.haserros});
  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }else{
      data={
        email:email.value,
        pwd:password.value
      }
      setState({loading:true})
      props.signIn(data).then((resp)=>{
        manageAccess(resp);
      })
    }
  };
  return (
      <ScrollView>
    <Background>
        <Logo />
      <Header>Welcome</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => {setEmail({ value: text, error: '' }); setState({errormsg:'none'})}}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => {setPassword({ value: text, error: '' }); setState({errormsg:'none'}) }}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('forgotPassword')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <View style={[{display:state.errormsg},{backgroundColor:'red',width:'100%',alignContent:'center'}]}>
  <Text style={{textAlign:'center',color:'#FFF',fontWeight:'bold'}}>{state.errormesg}</Text>
      </View>
      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </ScrollView>
  );
};
function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  loading:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  loadinglogo:{
    width:150,
    height:50,
    alignSelf:'center',
  }
  ,
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width:'100%',
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' }
});
class Login extends Component{
  state={
    loading:false,
    haserros:false,
    errormsg:'none',
    isConnected:true,
    errormesg:'',
    loadingflag:false
  }
  gotoHome(){
    //Replace here push with resetTo
    this.props.navigation.replace('Apphome');
  }
  manageAccess(resp){
    this.setState({loading:true})
    if(!this.props.User.auth.uid){
      if(resp.error)
      {
      this.setState({errormesg:resp.data});
      this.setState({haserros:true})
      this.setState({errormsg:'flex'})
      this.setState({loading:false})
    }
  }else{
      setTokens(this.props.User.auth,()=>{
        this.gotoHome();
      })
    }
  }
  componentDidMount(){
    const unsubscribe = NetInfo.addEventListener(state => {
      this.setState({isConnected:state.isConnected})
    });
    this.setState({loading:true})
    this.setState({loadingflag:true});
    getTokens((value)=>{
      if(value[0][1]===null){
        this.setState({loading:false});
        this.setState({loadingflag:false});
      }else{
        this.props.autoSignIn(value[1][1]).then(()=>{
          if(!this.props.User.auth.token){
            if(this.state.isConnected)
            {
              this.gotoHome();
            }else{
              this.setState({loading:false});
              this.setState({loadingflag:false});
            }
          }else{
            setTokens(this.props.User.auth,()=>{
              unsubscribe();
              this.gotoHome();
              //this.props.navigation.navigate('Apphome');
            })
          }
        })
      }
    
    
    })   
  }
  render(){
    if(!this.state.isConnected)
    {
      return(<MiniOfflineSign/>) 
    }
    if(this.state.loadingflag){
      return(
        <View style={styles.loading}>
          <Image
          style={styles.loadinglogo}
          source={require('./../assets/images/logo.png')}
           />
        <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }else if(this.state.loading){
      return(
        <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    else{
    return(
      <View>
        <Logincomp props={this.props} setState={(val)=>this.setState(val)} manageAccess={(val)=>this.manageAccess(val)} state={this.state}  />
      </View>
    )
    }
  }
}
function mapStateToProps(state){
  return{
    User:state.User
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({signIn,autoSignIn},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps) (Login);