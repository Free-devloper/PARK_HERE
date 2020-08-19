import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'
import { View,Text, Button } from 'react-native';
import Profile from './Profile'
import database from './../Firebase';
import {connect} from 'react-redux';
class User extends Component{
  state={
    Userdata:''
  }
  get_data(){
    database().ref('/Users/'+this.props.User.auth.uid).once('value',snapshot=>{
      this.setState({Userdata:snapshot.val()})
    })
  }
  componentDidMount()
  {
    this.get_data();
  }
    render(){
    return (
      <Profile props={this.props} User={this.state.Userdata} />
    );
    }
  }
  function mapStateToProps(state){
    return{
      User:state.User
    }
  }
  export default  connect(mapStateToProps) (User);