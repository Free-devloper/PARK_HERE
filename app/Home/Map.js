import React, { Component } from 'react';
import { Text,Image,View,StyleSheet,ActivityIndicator, PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Geolocation from '@react-native-community/geolocation';
class Map extends Component {
  state={
    userlatitude:null,
    userlongitude:null,
    error:null,
  }
  watchID=null;
  setgeolocation=null;
  componentDidMount(){
    Geolocation.getCurrentPosition((position)=>{
      this.setState({
        userlatitude:position.coords.latitude,
        userlongitude:position.coords.longitude,
        error:null
      })
    },error=>{
      console.log(error)
      alert("Please Enable GPS services in your Phone Settings");
    
    },
    {enableHighAccuracy:true,timeout:20000,maximumAge:5000}
    );
    this.watchID=Geolocation.watchPosition(position=>{
      console.log(position);
      this.setState({
        userlatitude:position.coords.latitude,
        userlongitude:position.coords.longitude
      })
    })
  }
  componentWillUnmount() {
    clearInterval(this.setgeolocation)
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }
    render() {
      if(this.state.userlongitude==null)
      {
        return(
          <View style={styles.loading} >
            <ActivityIndicator color="#0000ff"/>
            </View>
        )
      }else{
        return (
            <View style={{width:'100%', height:'100%'}}>
     <MapView
       style={StyleSheet.absoluteFillObject}
       showsUserLocation={true}
       followsUserLocation={false}
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude:this.state.userlatitude|| 33.6513127,
         longitude:this.state.userlongitude || 73.0767002,
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
       onPress={()=>this.setState}
       >
         <Image source={require('../assets/images/pin_marker.png')} style={{ width: 30, height:30 }} />
         <Callout style={{width:130}} onPress={()=>this.props.navigation.navigate('Parking_Stack',{screen:'Parking',params:{name:parking[0],data:parking[1]}})}>
        <Text>{parking[1].name}</Text>
      <Text style={{color:'black',opacity:0.5}}>{parking[1].Fees}Rs./hour</Text>
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
}
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    loading:{
      flex:1,
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center'
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