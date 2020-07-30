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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ListView from 'deprecated-react-native-listview';
import { ScrollView } from 'react-native-gesture-handler';
const Parkinglot=(props)=>  {
  console.log(props.route.params);
  const data=props.route.params.data;
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const imgs={1:require("../../assets/images/Available.png"),0:require("../../assets/images/notavailable.png")};
  const [date_selected,setDateSelected]=useState({value:false,date})
  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
    console.log("here");
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  if(!date_selected.value)
  {
  return(
    <View style={styles.container}>
    <ScrollView>
    <TouchableOpacity onPress={()=>{showDatePicker();}} style={{alignSelf:"center",alignContent:"center",margin:20,backgroundColor:'#fff'}}><Text>Select date and Time</Text></TouchableOpacity>
    <View> 
    <DateTimePickerModal
isVisible={isDatePickerVisible}
mode="datetime"
onConfirm={handleConfirm}
onCancel={hideDatePicker}
/>
    </View>
    </ScrollView>
    </View>
  )
  }else{
    return (
        <ScrollView>
        <View style={styles.container}>

            {
              Object.entries(data.slots).map((slot,key)=>{
                console.log(slot);
                return(
                        <View style={styles.box} key={key}>
              <Image style={styles.image} source={imgs[slot[1].status]} />
              <View style={styles.boxContent}>
                <Text style={styles.title}>{slot[1].Name}</Text>
                {slot[1].status==1 &&<Text style={styles.description}>Available</Text> ||
                slot[1].status==0 && <Text style={styles.description}>Busy</Text>
                }
                <View style={styles.buttons}>
                 {slot[1].status==1&&<TouchableHighlight onPress={()=>{alert('Reserved '+slot[1].id)}} style={[styles.button, styles.view]}>
                  <Text style={styles.icon,{alignSelf:'center'}}>Reserve</Text>
                  </TouchableHighlight> ||
                  slot[1].status==0 &&<TouchableHighlight style={[styles.button, styles.messages]}>
                  <Text style={styles.icon,{alignSelf:'center'}}>Busy</Text>
                  </TouchableHighlight>
              }
                </View>
              </View>
            </View>
              )})}
        </View>
        </ScrollView>

    );
            }
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
 