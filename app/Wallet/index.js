import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'
import { View,Text, Button } from 'react-native';
import Walletcomp from './Wallet';
class Wallet extends Component{
    render(){
    return (
      <View><Walletcomp props={this.props}/></View>  
    );
    }
  }
  export default Wallet;