import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PakingLot from './Parking_Lot/ParkingLot'
export default class Parking extends Component {
  state={
    isVisible:false,
    date:Date('2020')
  }
  render() {
    return (
      <View>
        <PakingLot {...this.props}/>
      </View>
    );
  }
}