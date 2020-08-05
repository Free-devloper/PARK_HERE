import image from '../../assets/Parkingslot.png'
import React, { Component, useState, useEffect,useMemo } from 'react';
import LottieView from 'lottie-react-native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';
import {Button,Divider,List,Colors} from 'react-native-paper';
import moment from 'moment';
import Loading from '../../Loading';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import database from '../../Firebase'
import { ScrollView } from 'react-native-gesture-handler';
const Parkinglot=(props)=>  {
const [data,setData]=useState(props.route.params.data);
  const Parkinglot_id=props.route.params.name;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const imgs={1:require("../../assets/images/Available.png"),0:require("../../assets/images/notavailable.png")};
  const [date_selected,setDateSelected]=useState({value:false,loading:false})
  const handleConfirm = (date) => {
    getdata_event();
    props.setDate(date);
    setDateSelected({value:true});
  };
  const showDatePicker = () => {
    setDateSelected({loading:true});
    setDatePickerVisibility(true);
  };
const getdata_event=()=>{
  database().ref('/Parkinglots/'+Parkinglot_id).on('value', snapshot => {
    setData(snapshot.val());
  });
}
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setDateSelected({loading:false});
  };
  if(!date_selected.value)
  {
  return(
    <View style={styles.container}>
    <ScrollView>
    <View> 
<DateTimePickerModal
isVisible={isDatePickerVisible}
mode="datetime"
is24Hour={false}
onConfirm={handleConfirm}
minimumDate={new Date()}
onDateChange={(value)=>{return value=value;}}
maximumDate={new Date(new Date().setDate(new Date().getDate()+3))}
onCancel={hideDatePicker}
/>
    </View>
      <Button compact={true} loading={date_selected.loading} style={{margin:20,padding:10}} icon="calendar" mode="contained" onPress={() =>{showDatePicker();}}>
    Select Date & Time
  </Button>
    <Divider style={{margin:5,borderColor:'#0000'}} />
    <List.Item
    title="Step-1"
    description="Select a date & and Time to View Reservations"
    left={props => <List.Icon color={Colors.blue500} {...props} style={{width:50,height:50}} icon="help-circle-outline" />}
  />
  
  <Divider style={{margin:5,borderColor:'#0000'}} />
     <List.Item
    title="Step-2"
    description="Select a Slot and Goto Reservation"
    left={props => <List.Icon color={Colors.blue500} {...props} style={{width:50,height:50}} icon="help-circle-outline" />}
  />
  <Divider style={{margin:5,borderColor:'#0000'}} />
    <List.Item
    title="Step-3"
    description="Add Your Time of arrival and departure"
    left={props => <List.Icon color={Colors.blue500} {...props} style={{width:50,height:50}} icon="help-circle-outline" />}

  />
  <Divider style={{margin:5,borderColor:'#0000'}}/>
  <List.Item
    title="Step-4"
    description="Confirm and pay for the Reservation"
    left={props => <List.Icon color={Colors.blue500} {...props} style={{width:50,height:50}} icon="help-circle-outline" />}
  />
    </ScrollView>
    </View>
  )
  }else{
    return (
        <ScrollView>
        <View style={styles.container}>

            {
              Object.entries(data.slots).map((slot,key)=>{
                return(
                        <View style={styles.box} key={key}>
              <Image style={styles.image} source={imgs[slot[1].status]} />
              <View style={styles.boxContent}>
                <Text style={styles.title}>{slot[1].Name}</Text>
                {slot[1].status==1 &&<Text style={styles.description}>Available</Text> ||
                slot[1].status==0 && <Text style={styles.description}>Busy</Text>
                }
                <View style={styles.buttons}>
                 {slot[1].status==1&&<TouchableHighlight onPress={()=>{alert('Reserved '+slot[1].id);}} style={[styles.button, styles.view]}>
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
      datapikerbutton:{
        
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
 