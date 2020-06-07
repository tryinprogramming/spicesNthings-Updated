import React, { Component } from 'react'
import { Text, StyleSheet, View,Image, Dimensions, TouchableOpacity,ActivityIndicator,FlatList,SafeAreaView } from 'react-native'
import firebase from 'firebase'
import Fire from '../Fire'
import moment from 'moment'
import {Ionicons,Feather, MaterialIcons,
    MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';
const {height,width} = Dimensions.get('window')

class ListItem extends React.Component {
    render() {
      const { item } = this.props;
 
    return(

        <View style={{flexDirection:'column',height:140,width:width/1.1,backgroundColor:'#f9f9f9',borderRadius:10,
        justifyContent:'space-between',margin:5,padding:10}}>

            <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:16,fontFamily:'sans-serif-light'}}>{"Ship To:  "+item.shipTo }</Text>
            </View>

            <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,fontFamily:'sans-serif-light'}}>{"Payment:  "+ item.payment}</Text>
            </View>

            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:16,fontFamily:'sans-serif-light'}}>{item.name+"  "}</Text>
            <Text style={{fontSize:12,fontFamily:'sans-serif-light',paddingTop:3}}>{moment(item.orderAt).fromNow()}</Text>
            <Text style={{fontSize:12,fontFamily:'sans-serif-light',paddingTop:3,color:'orange'}}>{"  "+item.status}</Text>
            </View>

            <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:13,fontFamily:'sans-serif-light'}}>{"Quantity: "+item.quantity }</Text>
            <Text style={{fontSize:13,fontFamily:'sans-serif-light',marginLeft:20}}>{"Price: "+item.quantity*item.price} </Text>
            </View>

            </View>
)


    }
  }
export default class Notifications extends Component {
    static navigationOptions={
        header: null
        }

        state={
            orders:[],
            buyer:{},
            seller:{},
            loading:true,
            refreshing:false
        }
        unsubscribe=null
        componentDidMount(){
            firebase.auth().onAuthStateChanged(user=>{
                if(user){
            try {
             var temp =[]
            const id = this.props.id || Fire.shared.uid
            this.unsubscribe=Fire.shared.firestore.collection("users").doc(id).collection("notifications")
            .where("status","in",["Accepted","Cancelled"])
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
    
           
    }
    componentWillUnmount(){
        this.unsubscribe=null
        }
        refreshFeed = ()=>{
            this.setState({refreshing:true,loading:true,orders:[]})
            try { 
            var temp =[]
            const id = this.props.id || Fire.shared.uid
            this.unsubscribe = Fire.shared.firestore.collection("users").doc(id).collection("notifications")
            .where("status","in",["Accepted","Cancelled"])
            .get()
            .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
            temp.push(documentSnapshot.data())
            this.setState({orders:temp,refreshing:false,loading:true})})})}
            catch (error) {}
            }
    
      
    render() {
        setTimeout(()=>{this.setState({loading:false})},5000)
        if (this.state.orders && this.state.orders.length) 
        return (
        <View style={{flex:1,paddingTop:32,backgroundColor:'#fff'}}>
        <View style={{flex:0.8,justifyContent:'center',alignItems:'center'}}>
        <FlatList
        showsVerticalScrollIndicator={false}
        data={this.state.orders}
        ListEmptyComponent={()=>
        <View style={styles.emptyfeed}>
        <ActivityIndicator size="large" color="#ffa500"/>
        </View>
        }
        refreshing={this.state.refreshing}
        onRefresh={this.refreshFeed}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
            <ListItem
              item={item}
            />
          )}
        />
    </View>
    </View>
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


