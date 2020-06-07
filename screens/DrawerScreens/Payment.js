// import React, { PureComponent, } from 'react'
// import { Text, StyleSheet, View, TouchableOpacity, } from 'react-native'
// import Button from '../../components/Button'
// import { PaymentsStripe as Stripe } from 'expo-payments-stripe'
// import axios from 'axios'

// export default class CardFormScreen extends PureComponent {

//   state = {
//     loading: false,
//     token:null,
//   }
//   componentDidMount(){
//     Stripe.setOptionsAsync({
//       publishableKey:''//write stripe key here
//     });
//   }
//   handleCardPayPress =async () => {
//     try {
//       this.setState({ loading: true, token: null })
//       const param = {
//        //card details
//       };
 
//       const token = await Stripe.createTokenWithCardAsync(param);
//       this.setState({ loading: false,token:token})

//     } catch (error) {
//       alert(error)
//       this.setState({ loading: false,token:null})
//     }
//   }
// makePayment=()=>{
//   this.setState({loading:true})

//   axios({
//     method:'POST',
//     url:'https://us-central1-spicenthings-21a26.cloudfunctions.net/completePaymentWithStripe',
//     data:{
//       amount:1,
//       currency:'usd',
//       token:this.state.token,
//     },
//   }).then(response=>{
//     console.log(response)
//     this.setState({loading:false})
//   })
// }
//   render() {
//     const { loading, token } = this.state

//     return (
//       <View style={styles.container}>
//         <Text style={styles.header}>
//           Card Form Example
//         </Text>
//         <Text style={styles.instruction}>
//           Click button to show Card Form dialog.
//         </Text>
//         <Button
//           text="Enter you card and pay"
//           loading={loading}
//           onPress={this.handleCardPayPress}
//         />
//         <View
//           style={styles.token}>
//           {token &&
//             <>
//             <Text style={styles.instruction}>
//               Token: {this.state.token.tokenId}
//             </Text>
//             <Button
//             text="Make Payment"
//             loading={loading}
//             onPress={this.makePayment}
//           />
//             </>
//           }
//         </View>
     
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instruction: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   token: {
//     height: 20,
//   },
// })

//cloud function


// completePaymentWithStripe = functions https onRequest((request,response)=>{
//   // stripe.charges.create({
//   //     amount:request.body.amount,
//   //     currency:request.body.currency,
//   //     source:'tok_mastercard'
//   // })
//   // .then(charge=>{
//   //     response.send(charge)
//   // })
//   // .catch(error=>{
//   //     console.log(error)
//   // })
  
//   // })