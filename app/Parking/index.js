import React, { Component } from 'react';
import database from '@react-native-firebase/database';
import { Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {setDate} from '../store/actions/Date_actions'
import PakingLot from './Parking_Lot/ParkingLot'
import {SaveReservationdata} from '../store/actions/Reservation_actions';
class Parking extends Component {
  state={
    isVisible:false,
    date:false
  }
  componentDidMount(){
    database().setPersistenceEnabled(true);
  }
  componentWillUnmount(){
    database().ref('/Parkinglots/'+this.props.route.params.name).off("value");
  }
  render() {
    return (
      <View>
        <PakingLot {...this.props}/>
      </View>
    );
  }
}
function mapStateToProps(state){
  return{
    User:state.User,
    Date_check:state.Date_check,
    Reservation_data:state.Reservation_data
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({setDate,SaveReservationdata},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps) (Parking);
