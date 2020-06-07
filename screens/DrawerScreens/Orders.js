import React, { Component } from 'react'
import { Text, StyleSheet, View,Image, Dimensions, TouchableOpacity,ActivityIndicator,FlatList,SafeAreaView } from 'react-native'
import firebase from 'firebase'
import Fire from '../../Fire'
import {Ionicons,Feather, MaterialIcons,
    MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';
import moment from 'moment'
const {height,width} = Dimensions.get('window')

export default class Orders extends Component {
    static navigationOptions={
        title:"Orders"
        }

        state={
            orders:[],
            loading:true
        }
        unsubscribe=null
        componentDidMount(){
            const didFocusSubscription = this.props.navigation.addListener(
                'didFocus',() => {
            firebase.auth().onAuthStateChanged(user=>{
                if(user){
            try {
             var temp =[]
            const id = this.props.id || Fire.shared.uid
            this.unsubscribe = Fire.shared.firestore.collection("users").doc(id).collection("orders")
            .where("status","==","Pending")
            .get()
            .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
            temp.push(documentSnapshot.data())
            this.setState({orders:temp})
            })})
            }
            catch (error) {
                this.setState({
                    error:error
                    })
            }
        }
        })
        })
            
            }
        componentWillUnmount(){
            didFocusSubscription.remove();
            this.unsubscribe=null
            }


            refreshFeed = ()=>{
            this.setState({loading:true,orders:[]})
            try { 
            var temp =[]
            const id = this.props.id || Fire.shared.uid
            this.unsubscribe = Fire.shared.firestore.collection("users").doc(id).collection("orders")
            .where("status","==","Pending")
            .get()
            .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
            temp.push(documentSnapshot.data())
            this.setState({orders:temp})})})}
            catch (error) {}
            }

            render() {
                setTimeout(()=>{this.setState({loading:false})},5000)
                if (this.state.orders && this.state.orders.length) 
                return (
                <SafeAreaView style={{ flex:1,paddingTop:32,backgroundColor:'#f9f9f9'}}>
                <View style={{flex:0.1,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'7%'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('MainScreen')}
                style={{height:34,width:34,borderRadius:17,justifyContent:'center',
                alignItems:'center',backgroundColor:'#fff'}}>
                <AntDesign name="arrowleft" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={{fontSize:20,fontWeight:'800',fontFamily:'sans-serif-light',marginLeft:5}}>
                 Orders
                </Text>
                <TouchableOpacity onPress={this.refreshFeed}
                style={{height:34,width:34,borderRadius:17,justifyContent:'center',
                alignItems:'center',backgroundColor:'#fff'}} >
                <AntDesign name="reload1" size={24} color="#000" />
                </TouchableOpacity>
                </View>

                <View style={{flex:0.8,alignItems:'center',}}>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.orders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item}) => (
                   
                    <View style={{flexDirection:'column',height:70,width:width/1.1,backgroundColor:'#fff',borderRadius:10,
                justifyContent:'space-between',margin:5,padding:10}}>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:16,fontFamily:'sans-serif-light'}}>{item.name+"  "}</Text>
                    <Text style={{fontSize:12,fontFamily:'sans-serif-light',paddingTop:3}}>{moment(item.orderAt).fromNow()}</Text>
                    <Text style={{fontSize:12,fontFamily:'sans-serif-light',paddingTop:3,color:'orange'}}>{"  "+item.status}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:13,fontFamily:'sans-serif-light'}}>{"Quantity:"+item.quantity }</Text>
                    <Text style={{fontSize:13,fontFamily:'sans-serif-light',marginLeft:20}}>{"Price:"+item.price} </Text>
                    </View>

                    </View>
        
                )}
            />
            </View>
            </SafeAreaView>
                )
                else 
                return(
                    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>

                    {
                    !this.state.loading &&
                    <TouchableOpacity onPress={this.refreshFeed}
                    style={{height:34,width:34,borderRadius:17,justifyContent:'center',
                    alignItems:'center',backgroundColor:'#f9f9f9'}} >
                    <AntDesign name="reload1" size={24} color="#000" />
                    </TouchableOpacity>
                    }

                    
                    {!this.state.loading &&<Text style={{color:'#dedede',fontSize:18,fontFamily:'sans-serif-light'}}>
                    No Orders</Text>}
                    {this.state.loading &&<ActivityIndicator size="large" color="orange"></ActivityIndicator>}
                  

                    </SafeAreaView>
                )
            }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
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
