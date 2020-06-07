import React, { Component } from 'react'
import { Text, StyleSheet, View,Image, Dimensions, TouchableOpacity,ActivityIndicator,FlatList, SafeAreaView } from 'react-native'
import firebase from 'firebase'
import Fire from '../../Fire'
import moment from 'moment'
import {Ionicons,Feather, MaterialIcons,
    MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';
const {height,width} = Dimensions.get('window')

class ListItem extends React.Component {
    render() {
      const { item } = this.props;
 
    return(

        <View style={{flexDirection:'column',height:140,width:width/1.1,backgroundColor:'#fff',borderRadius:10,
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

            <View style={{flexDirection:'row-reverse',justifyContent:'space-evenly'}}>
            <TouchableOpacity onPress={this.props.decline}>
            <Text style={{fontSize:20,fontFamily:'sans-serif-light',color:'red'}}>Decline</Text>
            </TouchableOpacity>
            <Text style={{fontSize:18}}>|</Text>
            <TouchableOpacity onPress={this.props.accept}>
            <Text style={{fontSize:20,fontFamily:'sans-serif-light',marginLeft:20,color:'green'}}>Accept </Text>
            </TouchableOpacity>
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
            this.unsubscribe=Fire.shared.firestore.collection("users").doc(id).collection("notifications")
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
        this.unsubscribe=null
        }
        sendPushNotification = async (token) => {
            const message = {
              to: token,
              sound: 'default',
              title: 'Order!',
              body: 'Your order request has been accepted',
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
    accept = (item, index) => {
    const orders = [...this.state.orders];
    orders[index].status = 'Accepted';
    this.setState({ orders });
    const buyerId= orders[index].clientuid
    const orderId= orders[index].orderId
    Fire.shared.confirmOrder(buyerId,orderId)
    Fire.shared.confirmOrderupdate(orderId)
    this.unsubscribe = Fire.shared.firestore
    .collection("users")
    .doc(buyerId)
    .onSnapshot(doc =>{
        this.setState({ buyer:doc.data() })
        this.sendPushNotification(this.state.buyer.expoToken)
    })
    }

    decline = (item, index) => {
        const orders = [...this.state.orders];
        orders[index].status = 'Declined';
        this.setState({ orders });
        const buyerId= orders[index].clientuid
        const orderId= orders[index].orderId
        Fire.shared.unconfirmOrder(buyerId,orderId)
        Fire.shared.unconfirmOrderupdate(orderId)
    }
    
      
    render() {
        global.notificationDot=false
        setTimeout(()=>{this.setState({loading:false})},5000)
        if (this.state.orders && this.state.orders.length) 
        return (
        <SafeAreaView style={{flex:1,paddingTop:32,backgroundColor:'#dedede'}}>
        <View style={{flex:0.1,flexDirection:'row',marginLeft:'5%'}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('MainScreen')}>
        <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{fontSize:20,fontWeight:'800',fontFamily:'sans-serif-light',marginLeft:5}}>
         Notifications
        </Text>
        </View>
        <View style={{flex:0.8,justifyContent:'center',alignItems:'center'}}>
        <FlatList
        showsVerticalScrollIndicator={false}
        data={this.state.orders}
        ListEmptyComponent={()=>
        <View style={styles.emptyfeed}>
        <ActivityIndicator size="large" color="#ffa500"/>
        </View>
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
            <ListItem
              item={item}
              accept={() => this.accept(item, index)}
              decline={() => this.decline(item, index)}
            />
          )}
        />
    </View>
    </SafeAreaView>
        )
        else 
        return(
            <SafeAreaView style={{flex:1,paddingTop:32}}>
            <View style={{flex:0.1,flexDirection:'row',marginLeft:'5%'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('MainScreen')}>
            <AntDesign name="arrowleft" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={{fontSize:20,fontWeight:'800',fontFamily:'sans-serif-light',marginLeft:5}}>
            Notifications
            </Text>
            </View>

            <View style={{flex:0.8,justifyContent:'center',alignItems:'center'}}>
            {!this.state.loading &&<Text style={{color:'#dedede',fontSize:18,fontFamily:'sans-serif-light'}}>
           No New Notifications</Text>}
            {this.state.loading &&<ActivityIndicator size="large" color="orange"></ActivityIndicator>}
            </View>
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


