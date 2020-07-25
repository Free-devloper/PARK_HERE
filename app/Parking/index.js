import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PakingLot from './Parking_Lot/ParkingLot'
export default class Parking extends Component {
  render() {
    return (
      <View>
        <PakingLot {...this.props}/>
      </View>
    );
  }
}