import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import stripe from 'tipsi-stripe'
import database from '../../Firebase';
import {connect} from 'react-redux';
import {TextInput,HelperText} from 'react-native-paper'; 
import Button from '../components/Button'
import axios from 'axios';
stripe.setOptions({
  publishableKey:'pk_test_wWobgqo7yalXr6OxRiCYCxPl',
})
 class CardFormScreen extends PureComponent {
  static title = 'Card Form'

  state = {
    loading: false,
    token: null,
    text:'',
    hasError:false,
    error:'',
    payment_details:''
  }

  handleCardPayPress = async () => {
    await this.check_input();
    if(!this.state.hasError)
    {
    try {
      this.setState({ loading: true, token: null })
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Gunilla Haugeh',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
            email: 'ghaugeh0@printfriendly.com',
          },
        },
      })
      this.setState({ loading: false, token })
    } catch (error) {
      this.setState({ loading: false })
    }
    this.Makepayment();
  }else{
    return false;
  }
  }
  check_input()
  {
    if(this.state.text==''||this.state.text==null)
    {
      this.setState({hasError:true,error:'Field cannot be empty '})
    }else{
      this.setState({hasError:false,error:''})
    }
  }
  Makepayment(){
    this.setState({loading:true})
    axios({
      method:'post',
      url:'http://192.168.43.109:3000/Compeletepaywithstripe',
      data:{
        amount:parseInt(this.state.text)*1000,
        currency:'PKR',
        token:this.state.token
      }
    }).then(resp=>{
      this.setState({payment_details:resp.data});
      this.Update_wallet();
    }).catch(err=>{
      console.log(err);
      this.setState({loading:false});
    })
  }
  Update_wallet(){
    database().ref('/Users/'+this.props.User.auth.uid+'/Wallet').once('value',snapshot=>{
      let old_w=snapshot.val();
      database().ref('/Users/'+this.props.User.auth.uid+'/Wallet').set({
        Recharge:old_w.Recharge+(this.state.payment_details.amount/1000),
        Spent:old_w.Spent,
        amount:old_w.amount+(this.state.payment_details.amount/1000)
      }).then(rep=>{
        database().ref('/Payments/'+this.state.payment_details.id).set({
          Paymentamount:(this.state.payment_details.amount/1000),
          Paymentid:this.state.payment_details.id
        }).then(rep=>{
          alert('Recharge Successfull');
          this.setState({text:''})
          this.setState({loading:false})
        }).catch(ep=>{
          console.log(ep);
        })
      }).catch(err=>{
        console.log(err)
      })
    }).catch(rep=>{console.log(rep)})
  }
  render() {
    const { loading, token } = this.state

    return (
      <View style={styles.container}>

        <Text style={styles.header}>
          Enter Amount to Recharge
        </Text>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%'}}>
        <TextInput
      label="Enter amount"
      value={this.state.text}
      style={{width:'60%',height:45}}
      mode="outlined"
      keyboardType="numeric"
      onChangeText={text =>{text.match(/[0-9]*/gm) && this.setState({text:text})}}
    />
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%'}}>
        <HelperText type="error" visible={this.state.hasError}>
        {this.state.error}
      </HelperText>
        </View>
        <Button
          text="Enter you card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
})
function mapStateToProps(state){
  return{
    User:state.User,
  }
}
export default connect(mapStateToProps) (CardFormScreen);