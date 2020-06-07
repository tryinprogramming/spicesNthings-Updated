import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity,
TextInput, FlatList, ActivityIndicator, Dimensions, SafeAreaView } from 'react-native'
import Fire from '../../Fire'
import firebase from 'firebase'
import moment from 'moment'
import {Ionicons,Feather, MaterialIcons,
    MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';
const {height,width} = Dimensions.get('window')

export default class Checkout extends Component {
    static navigationOptions={
        header: null
        }
        state={
            user:{},
            wait:false,
            seller:{}
        }
  
        componentDidMount(){
            const didFocusSubscription = this.props.navigation.addListener(
                'didFocus',() => {
                    firebase.auth().onAuthStateChanged(user=>{
                      if(user){
                   
                         const userId = this.props.id || Fire.shared.uid
                          this.unsubscribe = Fire.shared.firestore
                          .collection("users")
                          .doc(userId)
                          .onSnapshot(doc =>{
                              this.setState({ user:doc.data() })
                          })
                      }
                    })
                })
             }

             sendPushNotification = async (token) => {
                const message = {
                  to: token,
                  sound: 'default',
                  title: 'Order!',
                  body: 'You have a new order request ',
                  data: { data: 'goes here' },
                  _displayInForeground: true,
                };
                const response = await fetch('https://exp.host/--/api/v2/push/send', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(message),
                });
              };
              unsubscribe=null
            
              checkout= ()=>{
            let temp=[]
            const cart = this.props.navigation.getParam('cart')
            cart.forEach((item) => {
                let orderID=item.price+item.cartquantity+Date.now()
                Fire.shared.notify(item,this.state.user.address,orderID)
                Fire.shared.checkout(item,orderID)
                let sellerID=item.uid
                this.unsubscribe = Fire.shared.firestore
                .collection("users")
                .doc(sellerID)
                .onSnapshot(doc =>{
                    this.setState({ seller:doc.data() })
                    this.sendPushNotification(this.state.seller.expoToken)
                })
            
              })

        }
    render() {
        const cart = this.props.navigation.getParam('cart')
        const total = this.props.navigation.getParam('total')
        return (
    <SafeAreaView style={styles.container}>
               
    <View style={{flex:0.1,flexDirection:'row',}}>
    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Cart')}>
    <AntDesign name="arrowleft" size={24} color="#000" />
    </TouchableOpacity>
    <Text style={{fontSize:20,fontWeight:'800',fontFamily:'sans-serif-light',marginLeft:5}}>
    Checkout
    </Text>
    </View>

    <View style={{flex:0.15,backgroundColor:'#f9f9f9',borderRadius:10,padding:10,marginBottom:10}}>
    <Text style={{fontSize:16}}>Ship to:</Text>
    <Text style={{fontSize:18,fontFamily:'sans-serif-light'}}>{this.state.user.address?this.state.user.address:'No Address Available For Shipping (Goto Profile)'}</Text>
    </View>

    <View style={{flex:0.15,backgroundColor:'#f9f9f9',borderRadius:10,padding:10,marginBottom:10}}>
    <Text style={{fontSize:16}}>Payment Mode:</Text>
    <Text style={{fontSize:18,fontFamily:'sans-serif-light'}}>Cash on Delivery</Text>
    </View>

    <View style={{flex:0.3,backgroundColor:'#f9f9f9',borderRadius:10,padding:10,marginBottom:10}}>
    <Text style={{fontSize:16}}>Order:</Text>
    <FlatList
        data={cart}
        ListEmptyComponent={()=>
        <View style={styles.emptyfeed}>
        <ActivityIndicator size="large" color="#ffa500"/>
        </View>
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
           
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontSize:16,fontFamily:'sans-serif-light'}}>{item.name}</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:16,fontFamily:'sans-serif-light'}}>{item.cartquantity} x </Text>
            <Text style={{fontSize:16,fontFamily:'sans-serif-light'}}>{item.price}</Text>
            </View>
            <Text style={{fontSize:16,fontFamily:'sans-serif-light'}}>{item.cartquantity * item.price}</Text>
            </View>

        )}
    />
    </View>

    <View style={{flex:0.1,backgroundColor:'#f9f9f9',borderRadius:10,padding:10,marginBottom:10,
    alignItems:'center',justifyContent:'space-between',flexDirection:'row'
}}>
    <Text style={{fontSize:16}}>Total Amount:</Text>
    <Text style={{fontSize:18,fontFamily:'sans-serif-light'}}>{total}</Text>
    </View>

    <View style={{flex:0.2,justifyContent:'flex-end'}}>
<TouchableOpacity style={styles.button} 
onPress={this.checkout}>
        <Text style={{color:'#fff',fontSize:18,fontWeight:'200'}}>Checkout </Text>
        {
            this.state.wait
            ?<ActivityIndicator size="small" color="#fff" />
            :<Feather name="arrow-right-circle" size={24} color="#fff" />
        }
       
        
</TouchableOpacity>
</View>

            
</SafeAreaView>
)
}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        marginTop:'10%',
        marginHorizontal:'5%'
    },
    button:{
        flexDirection:'row',
        width:width*0.8,
        height:60,
        alignItems:'center',
        paddingHorizontal:20,
        justifyContent:'space-between',
        backgroundColor:'orange',
        borderRadius:10,
        alignSelf:'center'
      },
})
