import React, { Component } from 'react';
import 'react-native-gesture-handler';
import Map from './Map';
import axios from 'axios';
import {theme} from  '../core/theme'
import database from '../Firebase';
import { View,Text,StyleSheet,BackHandler,DeviceEventEmitter, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Loading from '../Loading';
import {SaveReservationdata} from '../store/actions/Reservation_actions';
import {getmarkers} from '../store/actions/Homeactions';
import { bindActionCreators } from 'redux';
  class Home extends Component{
    state={
      loading:true,
  connection:true,
reservation_hav:false}
  check_reservation(){
    return new Promise(resolve=>{
    database().ref('/Users_Reservations/'+this.props.User.auth.uid).once('value',(snapshot)=>{
      if(snapshot.val()===null)
      {
        resolve(false); 
      }else{
        resolve(snapshot.val());
      }
    })
  })
  }
    componentDidMount(){
      this.check_reservation().then(resp=>{
        if(resp==false)
        {
      this.props.getmarkers().then(async res=>{
        console.log(this.props.Markers.markers.data.toString());
        if(this.props.Markers.markers.data.toString()==='Error: Network Error')
        {
          this.setState({connection:false});
        }else if(!this.props.Markers.markers.data){
          this.setState({connection:false});
        }
        this.setState({loading:false});
  })
}else{
  console.log(resp);
  database().ref('/Reservations/'+resp.Reservation_id).once('value',(snapshot)=>{
  this.props.SaveReservationdata(snapshot.val());
  }).then(()=>{
    this.setState({reservation_hav:true})
    this.setState({loading:false})
    this.props.navigation.navigate('Parking_Stack', { screen: 'Reservation' });
  })
}
})
    }
    
    render(){
      if(this.state.loading)
      {
        return(
          <Loading />
        ) 
      }else if(!this.state.connection){
        return(
        <View>
          <Text>Error no internet Connection</Text>
        </View>
        )
      }else if(this.state.reservation_hav){
        return(
          <View style={[styles.container,{flex:1,alignContent:'center',justifyContent:'center'}]}>
            <TouchableOpacity style={styles.shareButton} onPress={()=>{this.props.navigation.navigate('Parking_Stack',{ screen: 'Reservation' })}}>
              <Text style={styles.shareButtonText}>Goto Your Reservation</Text>  
            </TouchableOpacity>
          </View>
        )
      }
      else{
      return(
        <View style={styles.container}>
      <Map {...this.props}/>
    <View style={styles.mapDrawerOverlay} />
    </View>
      )
      }
    }
  }
  const styles=StyleSheet.create({
    container: {
        flex: 1,
      },
    mapDrawerOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.0,
        height: '100%',
        width: 10,
      },
      loading:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
      },
      shareButton: {
        margin:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#00BFFF",
      }
  })
function mapStateToProps(state)
{
  return{
    User:state.User,
    Markers:state.Markers,
    Reservation_data:state.Reservation_data
  }
}
function mapDispatchToProps(dispatch)
{
  return bindActionCreators({getmarkers,SaveReservationdata},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)  (Home);