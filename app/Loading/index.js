import React from 'react';
import {View,ActivityIndicator} from 'react-native';
import LottieView from 'lottie-react-native';
export default class Loading extends React.Component {
  render() {
    return(
      <LottieView source={require('../../android/app/src/main/assets/28312-geru-loading.json')} autoPlay loop />      )
  }
}