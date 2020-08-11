import React, { Component } from 'react';
import 'react-native-gesture-handler';
import Login from './Login';
import Signup from './Login/Signup';
import Home from './Home';
import Icon from 'react-native-vector-icons/Ionicons';
import User from './User';
import forgotPassword  from './Login/Forgot_Password';
import Wallet from './Wallet';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer,useNavigation} from '@react-navigation/native'
import Recharge from './Wallet/Recharge';
import Parking from './Parking'
import GPS_GUIDE from './Parking/GPS_GUIDE'
import Logout from './Login/Logout';
import Reservation from './Parking/Reservation';
import {Button,StyleSheet,TouchableOpacity, Text, Alert} from 'react-native'
import { color } from 'react-native-reanimated';
const P_stack=createStackNavigator();
const Parking_Stack=()=>{
  return( 
    <P_stack.Navigator headerMode='sreen'>
    <P_stack.Screen name='Parking' component={Parking} initialParams={{data:'NAN'}}/>
    <P_stack.Screen name='Reservation' component={Reservation}/>
    <P_stack.Screen name='Guide_map' component={GPS_GUIDE}/>
    </P_stack.Navigator>

  );
}
const Homestack=createStackNavigator();
const Homepage=(navigation)=>{
  return(
  <Homestack.Navigator initialRouteName='Home' headerMode='screen'>
  <Homestack.Screen name='Home' component={Home} options={{headerTitle:'Find Parking',headerTitleStyle:[styles.headerTitle],headerTitleAlign:'center',headerStyle:{backgroundColor:'#00BFFF',height:48},headerLeft:(navigation)=>(<DrawerButton navigation={navigation}/> ),headerRight:()=>(<Icon name='md-help-circle' size={36} style={{color:'#fff',fontWeight:'bold',margin:8}} />) }}/>
  <Homestack.Screen name='Parking_Stack' component={Parking_Stack} options={{headerLeft:()=>(<Go_back/>),headerTitle:'Reservation',headerStyle:{backgroundColor:'#00BFFF',height:48},headerTitleStyle:[styles.headerTitle,{textAlign:'left'}] }} />
  </Homestack.Navigator>
  )
}
const Drawer=createDrawerNavigator();
const AppStack=({navigation,route})=>{
  return (
        <Drawer.Navigator drawerType='slide' drawerStyle={{width:'50%'}} drawerContentOptions={{contentContainerStyle:{backgroundColor:'#00BFFF',color:'#fff',height:'100%'},labelStyle:{color:'#fff',fontSize:18,fontWeight:'bold',width:'100%'},activeTintColor:'#000'}}> 
        <Drawer.Screen name='Home' component={Homepage} options={{drawerLabel:'Home',drawerIcon:()=>(<Icon name='md-home' style={{color:'#fff'}} size={30}/>)}}/>
        <Drawer.Screen name='User' component={User} options={{drawerLabel:'Profile',drawerIcon:()=>(<Icon name='md-person' style={{color:'#fff'}} size={30}/>)}}/>
        <Drawer.Screen name='Wallet' component={Wallet} options={{drawerLabel:'Wallet',drawerIcon:()=>(<Icon name='md-wallet' style={{color:'#fff'}} size={30}/>)}}/>
        <Drawer.Screen  name='Logout'  component={Logout} options={{drawerLabel:'Logout',drawerIcon:()=>(<Icon name='ios-log-out' style={{color:'#fff'}} size={30}/>)}}/>
        </Drawer.Navigator>
);
}
const Stack=createStackNavigator();
const AuthStack=()=>{
  return (
      <Stack.Navigator initialRouteName='Login' headerMode={"none"} >
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Signup' component={Signup}/>
        <Stack.Screen name='Apphome' component={AppStack}/>
        <Stack.Screen name='forgotPassword' component={forgotPassword}/>
      </Stack.Navigator>
  );
}
export class  RootNavigator extends Component{
  render()
{
  const isAuth=false
return(
        <NavigationContainer>
            {isAuth && <AppStack/>}
            {!isAuth && <AuthStack/> }
        </NavigationContainer>
    )
}
}
const styles=StyleSheet.create({
  headerTitle: {
  color:'#fff',
  textAlign: 'center',
  fontSize:26,
  position:'relative',
  fontWeight:"bold",
  fontFamily:'Roboto',
  },
  header:{
    height:'5%'
  }
})
const DrawerButton = () =>{
  const navigation=useNavigation();
  return (
   
  <TouchableOpacity
    onPress={() => navigation.openDrawer()}
    style={styles.buttonStyle}
  >
    <Icon name='md-menu' size={36} style={{color:'#fff',fontWeight:'bold',margin:5}} />
  </TouchableOpacity>
);
}
const Go_back=()=>{
  const navigation=useNavigation()
  return(
    <TouchableOpacity
    onPress={()=>{navigation.goBack()}}
    >
      <Icon name='md-arrow-round-back' size={36} style={{color:'#fff',fontWeight:'bold',margin:5}} />
    </TouchableOpacity>
  )
}