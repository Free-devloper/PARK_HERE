import React, {useState, Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';
import { connect } from 'react-redux';
import {insertUsername} from '../../axios_req/users_info';
import {signUp} from '../../store/actions/user_actions';
import { bindActionCreators } from 'redux';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../../core/utils';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
const Signupcomp = ({ props,setState,manageAccess }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }else{
      data={
        email:email.value,
        pwd:password.value,
        name:name.value
      }
      manageAccess(data);
    }
  };

  return (
    <ScrollView>
    <Background>
      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
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
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },loading:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  }
});
class Signup extends Component{
  state={
    loading:false
  }
  manageAccess(datas){
    this.setState({loading:true});
      this.props.signUp(datas).then(()=>{
        if(!this.props.User.auth.uid)
        {
        this.setState({loading:false})
        alert('Signup Failed');
        }else{
          alert('Signup Success');
          this.props.navigation.navigate('Login')
        }
      })
  }
  render(){
    if(this.state.loading)
    {return(
      <View style={styles.loading}><ActivityIndicator size="large" color="#0000ff"/></View>
    )
    }else{   
    return(
      <Signupcomp props={this.props} manageAccess={(val)=>this.manageAccess(val)} setState={(val)=>this.setState(val)} />
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
  return bindActionCreators({signUp},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps) (Signup);