import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity, ImageBackground,Image, ScrollView} from 'react-native'
import moment from 'moment'
import {AntDesign,Feather} from '@expo/vector-icons'
import Fire from '../../Fire'
const {height,width} = Dimensions.get('window')

export default class DetailScreen extends Component {
    static navigationOptions={
        header:null
        }
        state={
            user:{},
            cart:[],
            total:1,
            seller:{}
        }
    
        componentDidMount(){
            const didFocusSubscription = this.props.navigation.addListener(
                'didFocus',() => {
        try {
        const item = this.props.navigation.getParam('item')
           
            const userId = item.uid
             this.unsubscribe = Fire.shared.firestore
             .collection("users")
             .doc(userId)
             .onSnapshot(doc =>{
                 this.setState({ seller:doc.data() })
             })
        
        
        }
        catch (error) {}
        })
        }
        


    addToBasket=()=>{
        global.cartDot=true
        const item = this.props.navigation.getParam('item')
        Fire.shared.addCart(item,this.state.total)
        
    }
    increment=()=>{
        this.setState({total:this.state.total+1})
        }
        decrement=()=>{
            if(this.state.total>1)
            this.setState({total:this.state.total-1})
        }
    render() {
        const item = this.props.navigation.getParam('item')
        return (
            <SafeAreaView style={{flex:1}}>

            <ScrollView style={{flex:0.8}}>
            <ImageBackground
            style={{width:width,height:width+100,justifyContent:'flex-end',borderBottomColor:'#000',borderBottomWidth:0}}
            source={item.dp ? {uri:item.dp} :require('../../assets/icon.png')}
            >

            <View style={{position:'absolute',top:32,left:25,height:34,width:34,borderRadius:17,
        backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('MainScreen')}>
            <AntDesign name="arrowleft" size={24} color="#FFF" />
            </TouchableOpacity>
            </View>

            </ImageBackground>
            
        <View style={{margin:20,borderRadius:5,flexDirection:'row',justifyContent:'flex-start',
        alignItems:'center',backgroundColor:'#f9f9f9'
    }}>
        
        <Image 
        style={{width:60,height:60,borderRadius:30,marginLeft:5}}
        source={this.state.seller.shopdp ? {uri:this.state.seller.shopdp } :require('../../assets/icon.png')}
        />
        <Text style={{color:'#000',fontSize:17,marginLeft:5}}>{this.state.seller.shopname}</Text>
     
        </View>

            <View style={{paddingLeft:'7%'}}>
            <Text style={{color:'#000',fontSize:20,fontWeight:'500',marginBottom:'2%'}}>{item.name}</Text>
            <Text style={{color:'#000',fontSize:18,fontWeight:'200',marginBottom:'2%'}}>{item.category}</Text>
            <Text style={{color:'#000',fontSize:16,fontWeight:'500',}}>
            Description: <Text style={{color:'#000',fontSize:15,fontWeight:'200'}}>
            {item.description}</Text>
            </Text>
            </View>
            </ScrollView>
            
        <View style={{backgroundColor:'transparent',flex:0.15,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity style={styles.button} onPress={this.addToBasket}>
        <Text style={{color:'#fff',fontSize:18,fontWeight:'200'}}>Add to Cart</Text>
        <Text style={{color:'#fff',fontSize:18,fontWeight:'500'}}>Rs. {item.price * this.state.total}</Text>
        </TouchableOpacity>
        </View>


        </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
      button:{
        flexDirection:'row',
        width:width*0.8,
        height:width*0.15,
        alignItems:'center',
        paddingHorizontal:20,
        justifyContent:'space-between',
        backgroundColor:'orange',
        borderRadius:10
      },
      label:{
        flexDirection:'row',
        width:width*0.8,
        height:width*0.15,
        alignItems:'center',
        paddingHorizontal:20,
        justifyContent:'space-between',
        borderRadius:10
      }
})
