import image from '../../assets/Parkingslot.png'
import React, { Component } from 'react';
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


export default class Parkinglot extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
         {image: "../../assets/Available.png"},
         {image: "../../assets/Available.png"},
      ]),
    };
  }
  render() {
    let i=1;
    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={{color:'green',alignSelf:'center'}}>Select date& time</Text> 
            <View>
            </View>
      <ListView enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(service) => {
          return (
            <View style={styles.box}>
              <Image style={styles.image} source={require('../../assets/images/Available.png')} />
              <View style={styles.boxContent}>
          <Text style={styles.title}>Parkspace#{i++}</Text>
                <Text style={styles.description}>Click To Reserve</Text>
                <View style={styles.buttons}>
                  <TouchableHighlight style={[styles.button, styles.view]}>
                  <Text style={styles.icon,{alignSelf:'center'}}>Reserve</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.button, styles.message]}>
                  <Text style={styles.icon,{alignSelf:'center'}}>Availabe</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          )
        }}/>
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
}

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
 