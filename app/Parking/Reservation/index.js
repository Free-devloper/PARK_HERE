import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Reservationcomp from './Reservation';
class Reservation extends Component {
    render() {
        return (
            <Reservationcomp {...this.props}/>
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
  export default  connect(mapStateToProps) (Reservation);