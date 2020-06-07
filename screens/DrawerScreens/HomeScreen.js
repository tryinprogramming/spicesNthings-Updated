import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity,
TextInput, FlatList, ActivityIndicator, Dimensions, SafeAreaView,Platform,Vibration } from 'react-native'
import Fire from '../../Fire'
import firebase from 'firebase'
import moment from 'moment'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Cart from '../DrawerScreens/Cart'
import {Ionicons,Feather, MaterialIcons,
    MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';
const {height,width} = Dimensions.get('window')
export default class LoadingScreen extends Component {
constructor(props){
    super(props)
    global.cartDot
    global.notificationDot
}
static navigationOptions={
header: null
}
state={
isLoading:true,
post:[],
inMemoryPosts:[],
refreshing:false,
error:'',
user:{},
cart:[],
notification: {},
loading:true,
notify:[]
}

registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      try {
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        let userId = firebase.auth().currentUser.uid
        firebase.firestore().collection("users").doc(userId)
          .update({
              'expoToken':token
          })
      } catch (error) {
     
      }
  
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };
  _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };
 notifications=()=>{
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
    if(temp && temp.length)
    global.notificationDot=true
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
unsubscribe=null
 componentDidMount(){
this.registerForPushNotificationsAsync();
this._notificationSubscription = Notifications.addListener(this._handleNotification);
const didFocusSubscription = this.props.navigation.addListener(
    'didFocus',() => {
try {
this.notifications()
var temp =[]
this.unsubscribe = Fire.shared.firestore
.collection("products")
.get()
.then(querySnapshot => {
querySnapshot.forEach(documentSnapshot => {
temp.push(documentSnapshot.data())
this.setState({
isLoading:false,
post:temp,inMemoryPosts:temp
})

});});
this.registerForPushNotificationsAsync();
}catch (error) {
    this.setState({
        error:error
        })
}
})
}

handleRefresh=()=>{
  this.setState({refreshing:true})
    try {
    var temp =[]
    this.unsubscribe = Fire.shared.firestore
    .collection("products")
    .get()
    .then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
    temp.push(documentSnapshot.data())
    this.setState({
    refreshing:false,
    post:temp,inMemoryPosts:temp
    })
    
    });});
    
    }catch (error) {
        this.setState({
            error:error
            })
    }
    

}

searchPost = (value)=>{
    const filteredResult = this.state.inMemoryPosts.filter(
        post => {
            let postLowerCase = post.name.toLowerCase()
            let searchTermLowerCase = value.toLowerCase()

            return postLowerCase.indexOf(searchTermLowerCase)>-1
        }
    )

    this.setState({post:filteredResult})
}
render() {
  setTimeout(()=>{this.setState({loading:false})},10000)
return (
<SafeAreaView style={styles.container}>

<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:10}}>
<TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
<Entypo name="menu" size={24} color="black" />
</TouchableOpacity>

<TextInput
placeholder="Search"
style={{width:width/1.4,height:40,borderWidth:1,borderRadius:4,borderColor:'#ddd',
padding:10,marginHorizontal:10
}}
onChangeText={(value)=>this.searchPost(value)}
/>

<TouchableOpacity onPress={()=>this.props.navigation.navigate('Notifications')}>
<View style={{flexDirection:'row'}}>
{global.notificationDot &&<View style={{...styles.dot,backgroundColor:'#000', marginRight:-5}}/>}
<MaterialCommunityIcons name="bell" color="#ffa500" size={22}/>
</View>
</TouchableOpacity>

<TouchableOpacity onPress={()=>this.props.navigation.navigate('Cart')}>
<View style={{flexDirection:'row'}}>
<MaterialIcons name="shopping-cart" size={22} color="black" />
{ global.cartDot &&<View style={{...styles.dot,backgroundColor:'#ffa500',marginLeft:-2}}/>}
</View>
</TouchableOpacity>

</View>

<View style={{flex:1}}>

<View style={{flexDirection:'row'}}>
<Text style={{fontSize:20,fontWeight:'800',fontFamily:'sans-serif-light',marginLeft:width*0.05}}>
Explore
</Text>
</View>
<FlatList
numColumns={2}
data={this.state.post}
ListEmptyComponent={()=>
    <View style={styles.emptyfeed}>
  
    {this.state.loading &&<ActivityIndicator size="large" color="orange"></ActivityIndicator>}
    {!this.state.loading &&
      <>
      <Text style={styles.emptyfeedtext}>Nothing to show</Text>
      <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontWeight:'200',color:'#dedede',fontSize:12}}>Pull down to refresh </Text>
    <AntDesign name="arrowdown" size={12} color="#dedede" />
    </View>
      </>
    }
    </View>}
keyExtractor={(item, index) => index.toString()}
refreshing={this.state.refreshing}
onRefresh={this.handleRefresh}
renderItem={({ item }) => {
return(
<TouchableOpacity onPress={()=>this.props.navigation.navigate('SubScreen',{item:item})}>

            <View style={styles.productContainer}>
            <Image 
            style={styles.productImage}
            source={item.dp?{uri:item.dp} :require('../../assets/icon.png')}
            />
            <View style={styles.productDetails}>
            <Text style={styles.productTitle}>{item.name.split('').slice(0,15)}</Text>
            <Text style={styles.productCategory}>{item.category.split('').slice(0,15)}</Text>
            <Text style={styles.productPrice}>Rs.{item.price}</Text>
            </View>
            </View>

</TouchableOpacity>
)
}}
/>




</View>
</SafeAreaView>
)


}
}

const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
backgroundColor:'#fff',
marginTop:32,
},
productContainer:{
    width:width/2.5,
    margin:20,
    },
    productImage:{
    height:width/2.5,
    width:width/2.5,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
    },
    productDetails:{
    height:width/4.2,
    width:width/2.5,
    padding:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:50,
    backgroundColor:'#f5f5f5'
    },
    productTitle:{
    fontSize:16,
    fontWeight:'500',
    },
productPrice:{
    fontSize:14,
    fontWeight:'500',
    },
    productDate:{
    fontSize:12,
    fontWeight:'100'
    },
emptyfeed:{
flex:1,
justifyContent:'center',
alignItems:'center'
},
emptyfeedtext:{
fontSize:16,
fontWeight:'200',
color:'#dedede',
marginTop:50
},
separator:{
height:1,
width:width-10,
backgroundColor:'#dedede',
alignSelf:'center',
},
header:{
    marginTop:45,
    marginHorizontal:30
},
body:{
   marginTop:20,
   marginLeft:30
},
row:{
    flexDirection:'row',
    justifyContent:'space-between'
},
heading:{
    fontSize:26,
    color:'#b284be',
    fontFamily:'sans-serif-medium'
},
sub_heading:{
   fontSize:20,
   color:'#b284be',
   fontFamily:'sans-serif-medium'
},
dot:{
  height:6,
  width:6,
  borderRadius:3,
}
})
