import React, { Component } from 'react';
import { Text, View } from 'react-native';
const Reservationcomp=(props)=>{

    return(
    <Text>Reservation</Text>
    )
}

export default Reservationcomp;
// const refr=database().ref('/Slots_reservations/'+slot_id+'/'+data.date+'/'+props.User.auth.uid).set({
//     start_time:data.start_time,
//     end_time:data.end_time,
//     slot_id:slot_id
//   })