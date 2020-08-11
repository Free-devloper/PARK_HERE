import React,{Component} from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { View,Text } from 'react-native';
class Logout extends Component {
    state={
        Logout:true
    }
    componentDidMount() {
        if(this.state.Logout)
        {
        AsyncStorage.clear();
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Reservation' }],
          });
        }
    }
    render(){
        return(
            <View><Text>Logout</Text></View>
        )
    }
}
export default Logout;