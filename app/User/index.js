import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'
import { View,Text, Button } from 'react-native';
import Profile from './Profile'
class User extends Component{
 
    render(){
    return (
      <View><Profile props={this.props}/></View>
    );
    }
  }
  export default User;