import React, { Component, useEffect, useState } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    Alert
 } from 'react-native';
import {FIREBASEURL} from '../../core/misc';
import axios from 'axios';
import database from './../../Firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { ActivityIndicator,Headline,Subheading,DataTable, Caption,Portal,Dialog,Paragraph,Provider,Colors,Button, Divider,List } from 'react-native-paper';
import { color } from 'react-native-reanimated';
class Parking_sens extends Component {
    state={
        parking_status:false,
        parking_data:null,
        visible:false
    }
    Add_listner(){
        database().ref('/Parkinglots/'+this.props.Reservation_data.reservationdata.ParkingLotid+'/slots/'+this.props.Reservation_data.reservationdata.sLot_id).on('value',(snpshot=>{
            this.setState({parking_data:snpshot.val()});
            if(this.state.parking_data.status==0&&this.state.parking_status==true)
            {
                this.createTwoButtonAlertunpark();
            }else if(this.state.parking_data.status==1&&this.state.parking_status==false)
            {
             this.createTwoButtonAlert();
            }
        }))
    }
    Remove_Reservation(){
        let res_id=database().ref('/Users_Reservations/'+this.props.Reservation_data.reservationdata.Userid).once('value',(snapshot)=>{
            return snapshot.val();
        }).then(resp=>{
            try{
            database().ref('/Users_Reservations/'+this.props.Reservation_data.reservationdata.Userid).remove();
            database().ref('/Reservations/'+resp.Reservation_id).remove();
            database().ref('/Slots_reservations/'+this.props.Reservation_data.reservationdata.sLot_id+'/'+this.props.Reservation_data.reservationdata.date+'/'+this.props.Reservation_data.reservationdata.Userid).remove();
            }catch(err){
                console.log(err);
            }
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
        })
    }
    Remove_listener(){
        database().ref('/Parkinglots/'+this.props.Reservation_data.reservationdata.ParkingLotid+'/slots/'+this.props.Reservation_data.reservationdata.sLot_id).off('value');
    }
    componentDidMount(){
        this.Add_listner();
    }
    createTwoButtonAlertunpark(){
        Alert.alert(
            "Did you UN-Parked",
            "Have you un-parked on the Reserved slot?",
            [
              {
                text: "Not me",
                onPress: () => {},
                style: "cancel"
              },
              { text: "Yes", onPress: () =>{
                  this.Remove_Reservation();
                  this.setState({parking_status:false})
                  this.Remove_listener();
              } }
            ],
            { cancelable: false }
          );
    }
    componentWillUnmount(){
        this.Remove_listener();
    }
    createTwoButtonAlert(){
    Alert.alert(
      "Did you Parked",
      "Have you parked on the Reserved slot?",
      [
        {
          text: "Not me",
          onPress: () => {
             let reef=database().ref('/Management Guard/ParkingError/'+this.props.Reservation_data.reservationdata.ParkingLotid).push();
             reef.set({
                sLot_id:this.props.Reservation_data.reservationdata.sLot_id,
                Reservation_uid:this.props.Reservation_data.reservationdata.Userid,
                Error_id:reef.key,
            }).then(()=>{
                this.Remove_listener();
               setTimeout(()=>{this.Add_listner();
               },20000) 
            })
          },
          style: "cancel"
        },
        { text: "Yes", onPress: () =>{this.setState({parking_status:true});
    } }
      ],
      { cancelable: false }
    );
    }
    render() {
        return (
            <View>
    <Headline style={{alignContent:'center',textAlign:'center'}}>Parking Slot Sensor</Headline>
    <View style={{alignContent:'center',alignSelf:'center',justifyContent:'flex-start'}}>
        <Subheading>Parking Status:{this.state.parking_status&&<Text style={{color:Colors.blue400}}>Parked</Text>}{!this.state.parking_status&&<Text style={{color:Colors.red500}}>NOT Parked</Text>}</Subheading>
    </View>
    <Divider style={{margin:5,borderColor:'#0000'}} />
    <List.Item
    title="Step-1"
    description="Park Your car at marked Slot"
    left={props => <List.Icon color={Colors.blue500} {...props} style={{width:50,height:50}} icon="help-circle-outline" />}
  />
  
  <Divider style={{margin:5,borderColor:'#0000'}} />
     <List.Item
    title="Step-2"
    description="Check You App for Notification of the Parking car on the slot"
    left={props => <List.Icon color={Colors.blue500} {...props} style={{width:50,height:50}} icon="help-circle-outline" />}
  />
  <Divider style={{margin:5,borderColor:'#0000'}} />
    <List.Item
    title="Step-3"
    description="If its Your car Please click confirm Else click Not me!"
    left={props => <List.Icon color={Colors.blue500} {...props} style={{width:50,height:50}} icon="help-circle-outline" />}

  />
  <Divider style={{margin:5,borderColor:'#0000'}}/>
  <List.Item
    title="Step-4"
    description="Confirm on App that status is Parked"
    left={props => <List.Icon color={Colors.blue500} {...props} style={{width:50,height:50}} icon="help-circle-outline" />}
  />
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
  export default  connect(mapStateToProps) (Parking_sens);