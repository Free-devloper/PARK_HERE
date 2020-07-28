import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PakingLot from './Parking_Lot/ParkingLot'
export default class Parking extends Component {
  render() {
    state={
      isVisible:false,
      date:Date('2020')
    }
    return (
      <View>
        <PakingLot state={this.state} setState={(val)=>this.setState(val)}/>
      </View>
    );
  }
}