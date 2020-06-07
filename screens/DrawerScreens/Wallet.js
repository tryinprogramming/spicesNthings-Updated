import React, { Component } from 'react'
import { Text, StyleSheet, View, Image,TextInput,ActivityIndicator,TouchableOpacity, SafeAreaView, Dimensions } from 'react-native'
import {Ionicons,Feather, MaterialIcons,MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase'
import Fire from '../../Fire'
import UserPermissions from '../../UserPermissions'
const {height,width} = Dimensions.get('screen')
export default class AddProduct extends Component {
    static navigationOptions={
        header: null
        }
    state=
    {
    text: '',
    image:null,
    wait:false,
    success:false,
    profile:false,
    }

    
    componentDidMount(){
                firebase.auth().onAuthStateChanged(user=>
                 {
                if(user)
                {
                this.setState({profile:true})
                // const userId = this.props.id || Fire.shared.uid
                // this.unsubscribe = Fire.shared.firestore
                // .collection("users")
                // .doc(userId)
                // .onSnapshot(doc =>{
                //     this.setState({ user:doc.data() })
                // })
            }
              
                 }
                    );

              
        
    }

    checkout=(totalPrice)=>{
        const cart = this.props.navigation.getParam('cart')
        const total = this.props.navigation.getParam('total')
        if(total!=0)
        this.props.navigation.navigate('Checkout',{cart:cart,total:total})
        else
        alert('Total Amount is zero')
    }

    render() {
        if(this.state.profile)
        return(
                    <SafeAreaView style={styles.container}>

                    <View style={{flex:0.1,flexDirection:'row',marginLeft:'5%'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Cart')}>
                    <AntDesign name="arrowleft" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={{fontSize:20,fontWeight:'800',fontFamily:'sans-serif-light',marginLeft:5}}>
                    Wallet
                    </Text>
                    </View>

                    <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}}>
                    <View style={{borderRadius:20,backgroundColor:'#ffa500',
                    width:width/1.2,height:width/3,justifyContent:'center',alignItems:'center'
                }}>
                    <Text style={{color:'#fff',fontSize:18,fontWeight:'400'}}>Available Balance</Text>
                    <Text style={{color:'#fff',fontSize:18,fontWeight:'700',}}>$0</Text>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:14,fontFamily:'sans-serif-light'}}>Last Updated: </Text>
                    <Text style={{color:'#fff',fontSize:12,fontFamily:'sans-serif-light'}}></Text>
                    </View>
                    
                    </View>

                    </View>

                      <View style={{flex:1,backgroundColor:'#fff',marginHorizontal:20}}>
                      <Text style={{color:'#000',fontSize:14,fontFamily:'sans-serif-light',marginBottom:10}}>Available Payment Methods</Text>

                      <TouchableOpacity style={styles.smallCard}
                      onPress={this.checkout}>
                    <FontAwesome5 name="coins" size={20} color="black" />
                    <Text style={{color:'#000',fontSize:16,fontWeight:'400',marginLeft:5}}>Cash on Delivery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallCard}
                    onPress={()=>this.props.navigation.navigate('AddPaypal')}>
                    <Entypo name="paypal" size={20} color="black" />
                    <Text style={{color:'#000',fontSize:16,fontWeight:'400',marginLeft:5}}>PayPal (coming soon)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallCard}
                    onPress={()=>this.props.navigation.navigate('AddCard')}>
                   <FontAwesome name="credit-card" size={20} color="black" />
                    <Text style={{color:'#000',fontSize:16,fontWeight:'400',marginLeft:5}}>Debit/Credit Card (coming soon)</Text>
                   
                    </TouchableOpacity>

                    </View>

                    </SafeAreaView>   
        )
        else
        return (
            <SafeAreaView style={styles.containertemp}>
            <Image
            source={require('../../assets/wallet.png')}
            style={{height:width/1.5,width:width/1.5}}
            />


            <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Profile')}>
            <Text style={{color:'#fff',fontWeight:'500'}}>Set Your Profile First</Text>
            </TouchableOpacity>


            </SafeAreaView>
        )
       
         
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        marginTop:32
    },
    containertemp:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    errorMessage:{
        height:72,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:30
    },
    error:{
        color:'#E9446A',
        fontSize:13,
        fontWeight:'600',
        textAlign:'center'
    },
    
    button:{
        width:width-40,
        backgroundColor:'#f6a61e',
        borderRadius:4,
        height:52,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    smallCard:{
        flex:0.1,
        flexDirection:'row',
        padding:5,
        backgroundColor:'#f5f8fb',
        borderRadius:5,
        alignItems:'center',
        marginBottom:5
    }
})