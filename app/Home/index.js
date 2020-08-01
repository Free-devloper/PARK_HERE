import React, { Component } from 'react';
import 'react-native-gesture-handler';
import Map from './Map';
import axios from 'axios';
import {theme} from  '../core/theme'
import { View,Text, Button,StyleSheet,BackHandler,DeviceEventEmitter, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import Loading from '../Loading';
import {getmarkers} from '../store/actions/Homeactions';
import { bindActionCreators } from 'redux';
  class Home extends Component{
    state={
      loading:true,
  connection:true}
    componentDidMount(){
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
      }else{
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
      }
  })
function mapStateToProps(state)
{
  return{
    User:state.User,
    Markers:state.Markers
  }
}
function mapDispatchToProps(dispatch)
{
  return bindActionCreators({getmarkers},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)  (Home);