import React, { Component,useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/Ionicons'
import { Button } from 'react-native-paper';

export default Profile=({props})=>{
  const [imageurl, setImageurl] = useState({value: '../assets/avatar6.png'});
  const imageoptions = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const Go_back=()=>{
    return(
      <TouchableOpacity
      onPress={()=>{props.navigation.goBack()}}
      >
        <Icon name='md-arrow-round-back' size={36} style={{color:'#fff',fontWeight:'bold',margin:10}} />
      </TouchableOpacity>
    )
  }
  const showpicker=()=>{
    ImagePicker.showImagePicker(imageoptions, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setImageurl({value:source})
      }
    });
  }
    return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Go_back/>
          </View>
          <Image style={styles.avatar} source={require('../assets/avatar6.png')}/>
          <View style={styles.body}>
          <View style={styles.bodyContent}><TouchableOpacity onPress={()=>showpicker()} style={styles.buttonContaineruplod}><Icon name='md-cloud-upload' size={18} style={{color:'#fff'}} /><Text style={{color:'#fff',fontWeight:'bold',marginLeft:3}}>Upoad</Text></TouchableOpacity></View>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>David Jhons</Text>
              <Text style={styles.info}>Regular User</Text>
              <Text style={styles.description}></Text>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Change Password</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainerred}>
                <Text>Deactivate Account</Text> 
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
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    position:'absolute',
    alignSelf:'center',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
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
    backgroundColor: "#00BFFF",
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
    backgroundColor: "red",
  },
  buttonContaineruplod: {
    height:30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:100,
    borderRadius:0,
    backgroundColor: "#00BFFF",
  },
});
 