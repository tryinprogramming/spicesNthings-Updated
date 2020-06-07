import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity,
TextInput, FlatList, ActivityIndicator, Dimensions, SafeAreaView } from 'react-native'
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

        <View style={{flexDirection:'row',flexDirection:'row',height:100,width:width,
    paddingHorizontal:'5%',marginVertical:'5%'}}>
        
        <Image 
        style={{height:100,width:100,borderRadius:10}}
        source={item.dp?{uri:item.dp} :require('../../assets/icon.png')}
        />

        <View style={{marginLeft:'2%',height:100,width:width/1.6}}>

        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:'5%'}}>
        <Text style={{fontSize:18,fontWeight:'200'}}>{item.name}</Text>
        <TouchableOpacity onPress={this.props.onDelete} 
        style={{height:30,width:30,borderRadius:5,backgroundColor:'red',
        justifyContent:'center',alignItems:'center'}}>
        <AntDesign name="delete" size={20} color="#fff" />
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:'5%'}}>
        <Text style={{paddingTop:'5%',fontSize:16,fontWeight:'500'}}>Rs. {item.price}</Text>
        <View style={{width:90,height:35,borderRadius:5,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',
        backgroundColor:'orange'}}>
        <TouchableOpacity onPress={this.props.onSubtract}>
        <AntDesign name="minus" size={20} color="#fff" />
        </TouchableOpacity>
     
        <Text style={{fontSize:16,fontWeight:'500',color:'#fff'}}>{item.cartquantity}</Text>
        
        <TouchableOpacity  onPress={this.props.onAdd}>
        <AntDesign name="plus" size={20} color="#fff" />
        </TouchableOpacity>
        </View>
        </View>
        
        </View>

        

        </View>

)


    }
  }

export default class CartScreen extends Component {
static navigationOptions={
    header: null
    }

state={
isLoading:true,
total:0,
quantity:1,
cart:[],
post:[],
refreshing:false,
error:'',
empty:false,
loading:true,
payment:false
}

unsubscribe=null

componentDidMount(){
try {
 var temp =[]
const id = this.props.id || Fire.shared.uid
Fire.shared.firestore.collection("users").doc(id).collection("cart").get()
.then(querySnapshot=>{
    querySnapshot.forEach(documentSnapshot => {
        this.setState({cart:documentSnapshot.data()})
        this.unsubscribe = Fire.shared.firestore
.collection("products").where("productID","==",this.state.cart.productID)
.get()
.then(querySnapshot => {
querySnapshot.forEach(documentSnapshot => {
temp.push(documentSnapshot.data())
this.setState({
isLoading:false,
post:temp,
})
});});

    })
})
this.render
}catch (error) {
    this.setState({
        error:error
        })
}

}

onSubtract = (item, index) => {
const post = [...this.state.post];
if(post[index].cartquantity>1)
post[index].cartquantity -= 1;
this.setState({ post });
}

onAdd = (item, index) => {
const post = [...this.state.post];
post[index].cartquantity += 1;
this.setState({ post });
}
onDelete = (item, index) => {
const post = [...this.state.post];
if (index !== -1) {
const id=post[index].productID
post.splice(index, 1);
this.setState({ post });
Fire.shared.removeCartItem(id)
}
}

checkout=(totalPrice)=>{
    if(totalPrice!=0)
    this.props.navigation.navigate('Wallet',{cart:this.state.post,total:totalPrice})
}
render() {
    global.cartDot=false
    const { post,cart } = this.state;
    let totalPrice = 0;
    post.forEach((item) => {
      totalPrice += item.cartquantity * item.price;
    })
 setTimeout(()=>{this.setState({loading:false})},10000)
 if (this.state.post && this.state.post.length) 
return (

<SafeAreaView style={styles.container}>
<View style={{alignSelf:'flex-start',flex:0.1,flexDirection:'row',marginLeft:'5%'}}>
<TouchableOpacity onPress={()=>this.props.navigation.navigate('MainScreen')}>
<AntDesign name="arrowleft" size={24} color="#000" />
</TouchableOpacity>
<Text style={{fontSize:20,fontWeight:'800',fontFamily:'sans-serif-light',marginLeft:5}}>
Cart
</Text>
</View>
<View style={{flex:0.7}}>
<FlatList
data={this.state.post}
ListEmptyComponent={()=>
    <View style={styles.emptyfeed}>
    <Text style={styles.emptyfeedtext}>Loading cart</Text>
    <ActivityIndicator size="large" color="#ffa500"/>
    </View>
}
ItemSeparatorComponent={()=><View style={styles.separator} />}
keyExtractor={(item, index) => index.toString()}
refreshing={this.state.refreshing}
onRefresh={this.handleRefresh}
renderItem={({ item, index }) => (
    <ListItem
      item={item}
      onSubtract={() => this.onSubtract(item, index)}
      onAdd={() => this.onAdd(item, index)}
      onDelete={() => this.onDelete(item, index)}
    />
  )}
/>
</View>

<View style={{flex:0.1,justifyContent:'flex-end'}}>
<TouchableOpacity style={styles.button} 
onPress={()=>this.checkout(totalPrice)}>
        <Text style={{color:'#fff',fontSize:18,fontWeight:'200'}}>Proceed</Text>
        <Text style={{color:'#fff',fontSize:20,fontWeight:'500'}}>Rs. {totalPrice}</Text>
</TouchableOpacity>
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
    Cart
    </Text>
    </View>

    
    <View style={{flex:0.8,justifyContent:'center',alignItems:'center'}}>
        {!this.state.loading &&<Text style={{color:'#dedede',fontSize:18,fontFamily:'sans-serif-light'}}>
        Cart Is Empty</Text>}
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
productContainer:{
    height:100,
    width:width,
    backgroundColor:'red'
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
color:'#dedede'
},
separator:{
height:1,
width:width,
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
})
