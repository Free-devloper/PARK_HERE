import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'
import { View,Text, Button } from 'react-native';
import {connect} from 'react-redux';
import Walletcomp from './Wallet';
class Wallet extends Component{
    render(){
    return (
      <View><Walletcomp props={this.props}/></View>  
    );
    }
  }
  function mapStateToProps(state){
    return{
      User:state.User
    }
  }
  export default  connect(mapStateToProps) (Wallet);