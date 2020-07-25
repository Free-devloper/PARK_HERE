import React, { Component } from 'react';
import { Text,Image,View,StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Geolocation from '@react-native-community/geolocation';
class Map extends Component {
  state={
    userlatitude:33.6513127,
    userlongitude:73.0767002,
    error:null,
  }
  componentDidMount(){
    Geolocation.getCurrentPosition((position)=>{
      this.setState({
        userlatitude:position.coords.latitude,
        userlongitude:position.coords.longitude,
        error:null
      })
    })
  }
  
    render() {
        return (
            <View style={{width:'100%', height:'100%'}}>
     <MapView
       style={StyleSheet.absoluteFillObject}
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude:33.6513127,
         longitude:73.0767002,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
       {Object.entries(this.props.Markers.markers.data).map((parking,key)=>
       <Marker
      key={key}
       coordinate={{
         latitude:parking[1].Location.latitude,
         longitude:parking[1].Location.longitude
       }}
       >
         <Image source={require('../assets/images/pin_marker.png')} style={{ width: 30, height:30 }} />
         <Callout style={{width:130}} onPress={()=>this.props.navigation.navigate('Parking_Stack')}>
        <Text>{parking[1].name}</Text>
        <Text style={{color:'green'}}>{Object.keys(parking[1].slots).length} Spots available</Text>
                 <TouchableOpacity
                 ><Text style={{color:'red',fontSize:18,textAlign:'center',fontWeight:'bold'}}>Reserve a spot</Text></TouchableOpacity>
             </Callout>
         </Marker>
       )}
     </MapView>
   </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });
   function mapStateToProps(state)
{
  return{
    User:state.User,
    Markers:state.Markers
  }
}
function mapDispatchToProps(dispatch)
{
  return bindActionCreators({},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)  (Map);