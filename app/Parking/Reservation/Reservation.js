import React, { Component, useEffect, useState } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
Linking } from 'react-native';
import {FIREBASEURL} from '../../core/misc';
import axios from 'axios';
import database from './../../Firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator,Headline,Subheading,DataTable, Caption,Portal,Dialog,Paragraph,Provider,Colors,Button } from 'react-native-paper';
const Reservationcomp=(props)=>{
    const [visible, setVisible] =useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [confirm_pay,setConfirmpay]=useState(false);
    const [totalhours,settotalhours]=useState(null);
    const [Wallet_data,setWalletdata]=useState({});
    const calculatehours=()=>{
        return new Promise(resolve=>{
            let date_now=new Date(props.Reservation_data.reservationdata.date+' '+props.Reservation_data.reservationdata.start_time);
            let date_future=new Date(props.Reservation_data.reservationdata.date+' '+props.Reservation_data.reservationdata.end_time);
            var delta=Math.abs(date_future - date_now) / 1000;
            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            settotalhours(hours);   
            resolve(hours);
        })
    }
    const check_costs=()=>{
        return new Promise(resolve=>{
            if(Wallet_data.amount<(props.Reservation_data.reservationdata.Parking_Fees*totalhours))
            {
                showDialog();
                resolve(false);
            }else{
                resolve(true);
            }
        })
    }
    const handle_confirmation=async()=>{
        const result=await check_costs();
        console.log(result);
        if(!result)
        {
        }else{
                setLOADING(true);
                await Make_reservation().then(resp=>{
                    setLOADING(false);
                    setConfirmpay(true);
                   props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                      });
                })
            }
    }
    const Wallet=()=>{
        return new Promise(resolve=>{
            axios.get(FIREBASEURL+'Users/'+props.User.auth.uid+'/Wallet.json').then(resp=>{
                setWalletdata(resp.data);
                setLOADING(false)
                resolve({error:false,data:resp.data});
            }).catch(err=>{
                console.log(err);
                resolve(err);
            })
        })
    }
    const Make_reservation=()=>{
        return new Promise(resolve=>{
    const refr=database().ref('/Slots_reservations/'+props.Reservation_data.reservationdata.sLot_id+'/'+props.Reservation_data.reservationdata.date+'/'+props.User.auth.uid).set({
    start_time:props.Reservation_data.reservationdata.start_time,
    end_time:props.Reservation_data.reservationdata.end_time,
    slot_id:props.Reservation_data.reservationdata.sLot_id
  }).then(res=>{
    const ref=database().ref('/Reservations').push();
     ref.set(props.Reservation_data.reservationdata).then(res=>{
         const rft=database().ref('/Users_Reservations/'+props.User.auth.uid).set({
             Reservation_id:ref.key
         }).then(resp=>{
           let  curr_amn={
                 Recharge:Wallet_data.Recharge,
                 Spent:Wallet_data.Spent+(props.Reservation_data.reservationdata.Parking_Fees*totalhours),
                 amount:Wallet_data.amount-(props.Reservation_data.reservationdata.Parking_Fees*totalhours)
             }
             database().ref('/Users/'+props.User.auth.uid+'/Wallet').set(curr_amn).then(res=>{
                 console.log('reservation success');
                 resolve()
             }).catch(err=>{
                 console.log(err);
                 resolve(err);
             })

         })
     }).catch(err=>{
         console.log(err);
         resolve(err);
     })     
  }).catch(err=>{
      console.log(err);
      resolve(err);
  })
        })
    }
    const Open_G_maps=()=>{
        database().ref('/Parkinglots/'+props.Reservation_data.reservationdata.ParkingLotid+'/Location').once('value',(snapshot=>{
            let datalan=snapshot.val();
            const url="geo:"+datalan.latitude+","+datalan.longitude+"?q="+props.Reservation_data.reservationdata.Parking_lot_name;
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                  return Linking.openURL(url);
                } else {
                  let browser_url =
                    "https://www.google.pk/maps/@" +
                    datalan.latitude +
                    "," +
                    datalan.longitude +
                    "?q=" +
                    props.Reservation_data.reservationdata.Parking_lot_name;
                  return Linking.openURL(browser_url);
                }})



        }))
    }
    const [LOADING,setLOADING]=useState(true);
    useEffect(()=>{
        calculatehours();
        Wallet().then(res=>{
            if(res.error==false)
            {
              
            }else{
                console.log(res);
            }
        }
        )
        database().ref('/Users_Reservations/'+props.User.auth.uid).once('value',(snapshot)=>{
            if(snapshot.val()!==null)
            {
                setConfirmpay(true);
            }else{
                setConfirmpay(false);
            }
        })
    })
    if(LOADING)
        {
            return(
            <View style={styles.loading}>
            <ActivityIndicator size='large' />
            </View>
            )
        }else{
    return(

        <View style={styles.container}>
        <ScrollView>
          <View style={{alignItems:'center', marginHorizontal:30}}>
           {!confirm_pay&&<Headline style={styles.name}>Reserve Your Slot</Headline> || confirm_pay&&<Headline style={styles.name}>Reservation Details</Headline>}
            <Subheading style={{margin:'5%',marginTop:'10%'}}>Time Begin:{props.Reservation_data.reservationdata.start_time}</Subheading>
            <Icon name="md-arrow-down" size={40}/>
            <Subheading style={{margin:'5%',marginTop:'5%'}}>Time End: {props.Reservation_data.reservationdata.end_time}</Subheading>
            <View style={{flexDirection:'row'}}><Text style={styles.price}>Total Cost: </Text><Text style={[styles.price,{flexDirection:'row'}]}>Rs. {totalhours*props.Reservation_data.reservationdata.Parking_Fees}</Text></View>
            <DataTable>

    <DataTable.Row>
      <DataTable.Cell>Parking Lot:</DataTable.Cell>
    <DataTable.Cell >{props.Reservation_data.reservationdata.Parking_lot_name}</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Slot#</DataTable.Cell>
    <DataTable.Cell>{props.Reservation_data.reservationdata.sLot_id}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
      <DataTable.Cell>Date of Reservation:</DataTable.Cell>
    <DataTable.Cell>{props.Reservation_data.reservationdata.date}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
      <DataTable.Cell>Price of Parking</DataTable.Cell>
    <DataTable.Cell>{props.Reservation_data.reservationdata.Parking_Fees} Rs./hour</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
      <DataTable.Cell>Total Time of Parking</DataTable.Cell>
    <DataTable.Cell>{totalhours} hours</DataTable.Cell>
    </DataTable.Row>
  </DataTable>
            {/* <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
              Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
              natoque penatibus et magnis dis parturient montes, 
              nascetur ridiculus mus. Donec quam felis, ultricies nec
            </Text> */}
          </View>
          {/* <View style={styles.contentColors}>
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#00BFFF"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#FF1493"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#00CED1"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#228B22"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#20B2AA"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#FF4500"}]}></TouchableOpacity> 
          </View> */}
          {/* <View style={styles.contentSize}>
            <TouchableOpacity style={styles.btnSize}><Text>S</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.btnSize}><Text>M</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.btnSize}><Text>L</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.btnSize}><Text>XL</Text></TouchableOpacity> 
          </View> */}
          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
           {confirm_pay&&<TouchableOpacity onPress={()=>{Open_G_maps()}} style={styles.shareButtons}><Text>Click To open Google Maps</Text></TouchableOpacity>}
           {confirm_pay&&<TouchableOpacity onPress={()=>{props.navigation.navigate('Parking_sensor')}} style={styles.shareButtons}><Text>I'M Reached at spot</Text></TouchableOpacity>}
           {!confirm_pay&&<TouchableOpacity style={styles.shareButton} onPress={()=>{handle_confirmation();}}>
              <Text style={styles.shareButtonText}>Confirm & Pay</Text>  
            </TouchableOpacity>}
          </View> 
        </ScrollView>
        <Provider>
        <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>No sufficient amount</Dialog.Title>
          <Dialog.Content>
            <Paragraph>You don't have sufficient amount in your Wallet Please Recharge and Try again
            </Paragraph>
        <Subheading style={{color:Colors.red500}}>Wallet: {Wallet_data.amount}</Subheading>
        <Subheading style={{color:Colors.green500}}>Amount Required:{props.Reservation_data.reservationdata.Parking_Fees*totalhours}</Subheading>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} mode="outlined" >Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      </Provider>
      </View>
    )
        }
}

export default Reservationcomp;
const styles = StyleSheet.create({
    ontainer:{
        flex:1,
        marginTop:20,
      },
      productImg:{
        width:200,
        height:200,
      },
      name:{
        fontSize:28,
        color:"#696969",
        fontWeight:'bold'
      },
      price:{
        marginTop:10,
        fontSize:18,
        color:"green",
        fontWeight:'bold'
      },
      description:{
        textAlign:'center',
        marginTop:10,
        color:"#696969",
      },
      star:{
        width:40,
        height:40,
      },
      btnColor: {
        height:30,
        width:30,
        borderRadius:30,
        marginHorizontal:3
      },
      btnSize: {
        height:40,
        width:40,
        borderRadius:40,
        borderColor:'#778899',
        borderWidth:1,
        marginHorizontal:3,
        backgroundColor:'white',
    
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      starContainer:{
        justifyContent:'center', 
        marginHorizontal:30, 
        flexDirection:'row', 
        marginTop:20
      },
      contentColors:{ 
        justifyContent:'center', 
        marginHorizontal:30, 
        flexDirection:'row', 
        marginTop:20
      },
      contentSize:{ 
        justifyContent:'center', 
        marginHorizontal:30, 
        flexDirection:'row', 
        marginTop:20
      },
      separator:{
        height:2,
        backgroundColor:"#eeeeee",
        marginTop:20,
        marginHorizontal:30
      },
      shareButton: {
        margin:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },shareButtons: {
        margin:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00BFFF",
      },
      shareButtonText:{
        color: "#FFFFFF",
        fontSize:20,
      },
      addToCarContainer:{
        marginHorizontal:30
      },loading:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
});
