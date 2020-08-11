import image from '../../assets/Parkingslot.png'
import React, { Component, useState, useEffect,useMemo } from 'react';
import LottieView from 'lottie-react-native';
import Background from '../../components/Background';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity
} from 'react-native';
import {Button,Divider,HelperText,List,Colors,TextInput,Title, ActivityIndicator, Headline, Subheading} from 'react-native-paper';
import moment from 'moment';
import Loading from '../../Loading';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import database from '../../Firebase'
import { ScrollView } from 'react-native-gesture-handler';
import { create } from 'react-test-renderer';
const Parkinglot=(props)=>  {
  const [available_slots,setAvailableslots]=useState([]);
  const [endtime,setEndtime]=useState({value:null})
  const[starttime,setStartime]=useState({value:null})
  const [start_date,setstartdate]=useState({value:null});
  const[picker_val,setPicker_val]=useState('date');
  const [picker_mode,setPickermode]=useState('date');
  const [hasErrors,sethasErrors]=useState({status:false,message:''});
  const [loading_data,setLoadingData]=useState(false);
const [data,setData]=useState(props.route.params.data);
  const Parkinglot_id=props.route.params.name;
  var slots_counter=0;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const imgs={1:require("../../assets/images/Available.png"),0:require("../../assets/images/notavailable.png")};
  const [date_selected,setDateSelected]=useState({value:false,loading:false})
  const savedate=async(start_date)=>{
    await props.setDate(start_date);
  }
  const create_date=(date)=>{
    let dat=new Date(date);
    let fdate=dat.toDateString();
    return fdate;
  }
  const create_time=(date)=>{
    let dat=new Date(date);
    let ftime=dat.toTimeString();
    return ftime;
  }
  const checkdates=(strt_date,end_date)=>{
    return new Promise(resolve=>{
    console.log(start_date.value);
    let start_time=new Date(start_date.value+' '+strt_date).getTime();
    let end_time=new Date(start_date.value+' '+end_date).getTime();
    if(end_time<start_time)
    {
      sethasErrors({status:true,message:'End Time Must be greater than the Start Time'});
      setLoadingData(false);
      resolve(false);
    }else{
      sethasErrors({status:false,message:''});
      resolve(true);
    }
  })
  }
  const handle_dates_confirm=(strt_date,timestrt,timeend)=>{
    if(hasErrors.status)
    {
      setLoadingData(false);
      setDateSelected({value:false})
    }else{
    if((strt_date&&timestrt&&timeend)!==null)
    {
    let data={
      date:start_date.value,
      start_time:timestrt,
      timeend:timeend
    } 
   setLoadingData(true);
    savedate(data);
    check_existing_Reservations(start_date.value,timestrt,timeend);
    getdata_event();
    setDateSelected({value:true});
  }else{
    return false;
  }
}
  }
  const handleConfirm = (date) => {
  switch(picker_val)
  {
    case 'date':
      {setstartdate({value:create_date(date)}); hideDatePicker()}
      break;
    case 'strt_time':
      {setStartime({value:create_time(date)});hideDatePicker()};
      break;
    case 'end_time':
      {setEndtime({value:create_time(date)}); hideDatePicker()};
      break;
    default:
      return false;
  }
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
  const handleReservation=(slot_id)=>{
    let data={Userid:props.User.auth.uid,
      ParkingLotid:Parkinglot_id,
      sLot_id:slot_id,
      date:start_date.value,
      start_time:starttime.value,
      end_time:endtime.value
    }
    const refr=database().ref('/Slots_reservations/'+slot_id+'/'+data.date+'/'+props.User.auth.uid).set({
      start_time:data.start_time,
      end_time:data.end_time,
      slot_id:slot_id
    }).then((resp)=>{
    props.SaveReservationdata(data);
    props.navigation.navigate('Reservation');
    }).catch(err=>{console.log(err)})
  }
  const check_existing_Reservations=async(date_strt,time_strt,time_end)=>{
    let data_send={
      date:date_strt,
      time_start:time_strt,
      time_end:time_end,
      Parking_lot_id:Parkinglot_id,
      slots:data.slots
    }
    var config={
      headers:"Content-Type: application/json",
      data:data_send
    }
    await axios.post('http://192.168.43.109:3000/Check_available_dates',config)
    .then(async res=>{
     const re=await res;
     setAvailableslots(re.data);
     console.log(re.data);
    setLoadingData(false);
    })
    .catch(err=>{
      console.log(err);
      if(err.toString()=='Error: Network Error')
      {
        sethasErrors({status:true,message:'Server not Reach able'});
      }else{
        sethasErrors({status:true,message:'Something went wrong try again Later'});
      }
      setLoadingData(false);
    });
  }
  if(data=='NAN')
  {
    return(
    <View style={[styles.container,{marginVertical:'70%'}]}>
    <Text style={{justifyContent:'center',textAlignVertical:'center',alignSelf:'center'}}>ERROR NO INTERNET</Text>
    </View>)
  } 
  if(loading_data)
  {
    return(
      <View style={styles_.loading}>
      <ActivityIndicator size="large" color="#0000ff" style={{marginTop:'70%'}}/>
      </View>
    )
  }
  if(!date_selected.value||hasErrors.status)
  {
  return(
    <ScrollView>
      <Background>
      <Title style={{alignSelf:"center",justifyContent:"center",marginTop:30,color:Colors.deepPurple900,borderStyle:'dashed'}}>Select Date & Time</Title>
    <View style={styles_.container}>
    <View style={styles_.inputContainer}>
      <Icon style={styles_.inputIcon} name="md-calendar" size={30}/>
      <TextInput style={styles_.inputs}
          label="Select Date"
          value={start_date.value|| ''}
          mode="flat"
          onTouchStart={()=>{setPickermode('date');setPicker_val('date');showDatePicker()}}
          onChangeText={(email) =>{}}/>
    </View>
    
    <View style={styles_.inputContainer}>
      <Icon style={styles_.inputIcon} name="md-time" size={30 }/>
      <TextInput style={styles_.inputs}
          label="Start time"
          value={starttime.value || ''}
          mode="flat"
          onTouchStart={()=>{setPickermode('time');setPicker_val('strt_time');showDatePicker()}}
          onChangeText={(password) => {}}/>
    </View>
    <View style={styles_.inputContainer}>
      <Icon style={styles_.inputIcon} name="md-time" size={30}/>
      <TextInput style={styles_.inputs}
          label="End time"
          mode="flat"
          error={hasErrors.status}
          value={endtime.value || ''}
          onTouchStart={()=>{setPickermode('time');setPicker_val('end_time');showDatePicker()}}
          onChange={(time_end)=>{checkdates(starttime,endtime)}}/>
    </View>
    <HelperText type="error" visible={hasErrors.status}>
      {hasErrors.message}
      </HelperText>
  </View>
  </Background>
  <View style={styles.container}>
    <View> 
<DateTimePickerModal
isVisible={isDatePickerVisible}
mode={picker_mode}
minuteInterval={15}
locale="es-ES"
is24Hour={false}
onConfirm={(date)=>{handleConfirm(date)}}
minimumDate={new Date()}
onDateChange={(value)=>{return value=value;}}
maximumDate={new Date(new Date().setDate(new Date().getDate()+3))}
onCancel={hideDatePicker}
/>
    </View>
      <Button compact={true} loading={date_selected.loading} style={{margin:20,padding:10}} icon="calendar" mode="contained" onPress={async() =>{await checkdates(starttime.value,endtime.value).then(res=>{ if(res){handle_dates_confirm(start_date.value,starttime.value,endtime.value);}});}}>
    Show Available Slots
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
    </View>
  </ScrollView>
//     <View style={styles.container}>
//     <View> 
// <DateTimePickerModal
// isVisible={isDatePickerVisible}
// mode={picker_mode}
// minuteInterval={15}
// locale="es-ES"
// is24Hour={false}
// onConfirm={handleConfirm}
// minimumDate={new Date()}
// onDateChange={(value)=>{return value=value;}}
// maximumDate={new Date(new Date().setDate(new Date().getDate()+3))}
// onCancel={hideDatePicker}
// />
//     </View>
//       <Button compact={true} loading={date_selected.loading} style={{margin:20,padding:10}} icon="calendar" mode="contained" onPress={() =>{showDatePicker();}}>
//     Select Date & Time
//   </Button>
//     <Divider style={{margin:5,borderColor:'#0000'}} />
//     <List.Item
//     title="Step-1"
//     description="Select a date & and Time to View Reservations"
//     left={props => <List.Icon color={Colors.blue500} {...props} style={{width:50,height:50}} icon="help-circle-outline" />}
//   />
  
//   <Divider style={{margin:5,borderColor:'#0000'}} />
//      <List.Item
//     title="Step-2"
//     description="Select a Slot and Goto Reservation"
//     left={props => <List.Icon color={Colors.blue500} {...props} style={{width:50,height:50}} icon="help-circle-outline" />}
//   />
//   <Divider style={{margin:5,borderColor:'#0000'}} />
//     <List.Item
//     title="Step-3"
//     description="Add Your Time of arrival and departure"
//     left={props => <List.Icon color={Colors.blue500} {...props} style={{width:50,height:50}} icon="help-circle-outline" />}

//   />
//   <Divider style={{margin:5,borderColor:'#0000'}}/>
//   <List.Item
//     title="Step-4"
//     description="Confirm and pay for the Reservation"
//     left={props => <List.Icon color={Colors.blue500} {...props} style={{width:50,height:50}} icon="help-circle-outline" />}
//   />
//     </View>
  )
  }else{
    return (
        <ScrollView>
         <Button compact={true} color={Colors.blueA400} style={{flexDirection:"row",padding:5,alignSelf:"center",justifyContent:"flex-start",marginTop:'5%'}} icon={()=>{return <Icon name="md-arrow-round-back" size={25} color={Colors.white} style={{left:0,right:0,marginRight:5}}/>}} mode="contained" onPress={() =>{setDateSelected({value:false})}}>
   <Text style={{color:'#fff'}}> Select Date & Time again </Text>
  </Button>
        <View style={styles.container}>
            {
              Object.entries(data.slots).map((slot,key)=>{
                if(available_slots.includes(slot[1].id))
                {
                }else{
                if(slot[1].slot_status=='active')
                {
                  slots_counter++;
                return(
                        <View style={styles.box} key={key}>
              <Image style={styles.image} source={imgs[slot[1].status]} />
              <View style={styles.boxContent}>
                <Text style={styles.title}>{slot[1].Name}</Text>
                {slot[1].status==1 &&<Text style={styles.description}>Available</Text> ||
                slot[1].status==0 && <Text style={styles.description}>Busy</Text>
                }
                 <Text style={styles.description}>Slot-ID # {slot[1].id}</Text>
                <View style={styles.buttons}>
                 {<TouchableHighlight onPress={()=>handleReservation(slot[1].id)} style={[styles.button, styles.view]}>
                  <Text style={styles.icon,{alignSelf:'center'}}>Reserve</Text></TouchableHighlight>
              }
                </View>
              </View>
            </View>
              )}}})
              }
              {
               slots_counter==0&&<Subheading style={{color:Colors.red400,alignSelf:'center',textAlign:'center',flex:1,justifyContent:'flex-start',marginTop:'20%'}}>Oops no slots found select another Time&date</Subheading>
              }
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
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
},
inputs:{
    height:30,
    marginLeft:16,
    backgroundColor:'#FFF',
    borderRadius:59,
    flex:1,
},
inputIcon:{
  width:30,
  height:30,
  marginLeft:15,
  justifyContent: 'center'
},
inputscontainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#DCDCDC',
},
});

const styles_ = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'10%'
  },
  inputContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius:50,
      borderBottomWidth: 0,
      width:250,
      height:45,
      marginBottom:50,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:47,
      marginLeft:0,
      borderBottomColor: '#fff',
      flex:1,
      backgroundColor:'#fff'
  },
  loading:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    borderBottomColor:'#fff',
    justifyContent: 'center'
  },
});
 