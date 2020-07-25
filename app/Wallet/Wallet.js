import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
export default Walletcomp=({props})=>{
  const Go_back=()=>{
    return(
      <TouchableOpacity
      onPress={()=>{props.navigation.goBack()}}
      >
        <Icon name='md-arrow-round-back' size={36} style={{color:'#fff',fontWeight:'bold',margin:10}} />
      </TouchableOpacity>
    )
  }
    return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Go_back/>
          </View>
          <Text style={styles.nametitle}>Wallet</Text>
          <Image style={styles.avatar} source={require('../assets/iconwallet.png')}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>500 Pkr</Text>
              <Text style={styles.info}>Regular User</Text>
              <Text style={styles.description}></Text>
              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{color:'white'}}>Recharge Wallet</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainerred}>
                <Text style={{color:'white'}}>Add coupon</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,  
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:30,
    color:"#0000",
    fontWeight:'bold',
  },
  nametitle:{
    fontSize:36,
    color:"black",
    alignSelf:'center',
    fontWeight:'bold',
  },
  body:{
    marginTop:10,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:20,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "green",
  },
  buttonContainerred: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#696969",
  },
});
 