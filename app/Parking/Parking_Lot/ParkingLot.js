import image from '../../assets/Parkingslot.png'
import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ListView from 'deprecated-react-native-listview';
import { ScrollView } from 'react-native-gesture-handler';
const Parkinglot=(state,setState)=>  {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
    return (
        <ScrollView>
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{showTimepicker(); console.log(show)}} style={{alignSelf:"center",alignContent:"center",margin:20,backgroundColor:'#fff'}}><Text>Select date and Time</Text></TouchableOpacity>
            <View>
              
            {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
            </View>
        <View style={styles.box}>
              <Image style={styles.image} source={require('../../assets/images/notavailable.png')} />
              <View style={styles.boxContent}>
          <Text style={styles.title}>Parkspace#5</Text>
                <Text style={styles.description}>Busy</Text>
                <View style={styles.buttons}>
                  <TouchableHighlight style={[styles.buttonbusy, styles.view]}>
                  <Text style={styles.icon,{alignSelf:'center'}}>Reserve</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.button, styles.messages]}>
                  <Text style={styles.icon,{alignSelf:'center'}}>Busy</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
        </View>
        </ScrollView>
    );
 }
export default Parkinglot;
const styles = StyleSheet.create({
    header:{
        backgroundColor: "#00BFFF",
        height:'7%',
      },
  image: {
    width: 100,
    height:100,
  },
  box: {
    padding:20,
    marginTop:5,
    marginBottom:5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  boxContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft:10,
  },
  title:{
    fontSize:18,
    color:"#151515",
  },
  description:{
    fontSize:15,
    color: "#646464",
  },
  buttons:{
    flexDirection: 'row',
  },
  button: {
    height:35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    width:100,
    marginRight:5,
    marginTop:5,
  },
  buttonbusy: {
    height:35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    width:100,
    opacity:0.2,
    marginRight:5,
    marginTop:5,
  },
  icon:{
    width:100,
    height:20,
  },
  view: {
    backgroundColor: "#1E90FF",
  },
  profile: {
    backgroundColor: "#1E90FF",
  },
  message: {
    backgroundColor: "#228B22",
  },
  messages: {
    backgroundColor: "red",
  },
  name:{
    margin:'1%',
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'bold',
    alignSelf:'center'
  },
});
 