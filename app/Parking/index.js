import React, { Component } from 'react';
import database from '@react-native-firebase/database';
import { Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {setDate} from '../store/actions/Date_actions'
import PakingLot from './Parking_Lot/ParkingLot'
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
    Date_check:state.Date_check
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({setDate},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps) (Parking);
