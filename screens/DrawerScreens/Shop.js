import React, { Component } from 'react'
import { Text, StyleSheet,TextInput,View,Image, Dimensions, TouchableOpacity,
    ActivityIndicator,Picker, SafeAreaView } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import {Ionicons,Feather, MaterialIcons,MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Fire from '../../Fire'
import UserPermissions from '../../UserPermissions'
import firebase from 'firebase'
import ProductAdd from '../DrawerScreens/components/ProductAdd'
import ShopEdit from '../DrawerScreens/components/ShopEdit'
import ShopOrders from '../DrawerScreens/components/ShopOrders'

const {height,width} = Dimensions.get('window')

class Shop extends Component {
    static navigationOptions={
        header: null
        }
    state=
    {
    user:{},
    shop:{
        name:'',
        category:'',
        location:'',
        number:'',
        dp:null
    },
    text: '',
    add:false,
    edit:false,
    wait:false,
    success:false,
    }
    
    unsubscribe=null
   
    componentDidMount(){
        const didFocusSubscription = this.props.navigation.addListener(
            'didFocus',() => {
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
            const user = this.props.id || Fire.shared.uid
                    this.unsubscribe = Fire.shared.firestore
                    .collection("users")
                    .doc(user)
                    .onSnapshot(doc =>{
                        this.setState({ user:doc.data() })
                    })
                }
        })
    })
    }
    
componentWillUnmount(){
    didFocusSubscription.remove();
    this.unsubscribe();
}
 
render() {
        return(
            <SafeAreaView style={styles.container}>
                <Image 
                style={{flex:0.5,width:'100%',height:'100%',resizeMode:'contain'}}
                source={this.state.user.shopdp ? {uri:this.state.user.shopdp } :require('../../assets/icon.png')}
                />

            <View style={{flex:0.1,width:width/1.2,marginTop:-38,padding:30,justifyContent:'center',
            alignItems:'center',backgroundColor:"rgba(245, 171, 53, 0.5)",borderRadius:10}}>
    
            
            <Text style={{fontSize:18,fontWeight:'500',fontFamily:'serif'}}>
            {this.state.user.shopname} </Text>
          
            
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Entypo name="shop" size={12} color="black" />
            <Text style={{fontSize:16,fontWeight:'200',fontFamily:'sans-serif-light'}}>
            {this.state.user.shopcategory}</Text>
            </View>
    
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Entypo name="location-pin" size={12} color="black" />
            <Text style={{fontSize:14,fontWeight:'200',fontFamily:'sans-serif-light'}}>
              {this.state.user.shoplocation}
            </Text>
            </View>
            
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Entypo name="old-phone" size={12} color="black" />
            <Text style={{fontSize:14,fontWeight:'200',fontFamily:'sans-serif-light'}}>
               {this.state.user.shopnumber}</Text>
            </View>
    
            </View>
            
            <View style={{flex:0.1,flexDirection:'row',marginTop:20}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ProductAdd')}
                style={{width:100,height:100,
                backgroundColor:'orange',borderRadius:20,margin:10}}>
                <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                <View style={{height:60,width:60,borderRadius:30,justifyContent:'center',alignItems:'center',}}>
                <Entypo name="squared-plus" size={40} color="#fff" />
                </View>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#fff',fontSize:13,}}>New Product </Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ShopEdit')}
                View style={{width:100,height:100,
                backgroundColor:'orange',borderRadius:20,margin:10}}>
                <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                <View style={{height:60,width:60,borderRadius:30,justifyContent:'center',alignItems:'center',}}>
                <Entypo name="shop" size={40} color="#fff" />
                </View>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#fff',fontSize:13,}}>Edit Shop </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ShopOrders')}
            View style={{width:100,height:100,
            backgroundColor:'orange',borderRadius:20,margin:10}}>
            <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
            <View style={{height:60,width:60,borderRadius:30,justifyContent:'center',alignItems:'center',}}>
            <FontAwesome5 name="clipboard-list" size={40} color="#fff" />
            </View>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fff',fontSize:13,}}>Orders </Text>
            </View>
        </TouchableOpacity>

            </View>
           
            </SafeAreaView>
            )
     }
    
}

export default createAppContainer(createStackNavigator({
    Shop,
    ProductAdd,
    ShopEdit,
    ShopOrders
}))
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginTop:38,
    },
    containertemp:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    form:{
    flex:1,
    },
    button:{
        width:width/1.1,
        marginHorizontal:30,
        backgroundColor:'#ffa500',
        borderRadius:4,
        height:52,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    }
})
