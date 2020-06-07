import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity,
TextInput, FlatList, ActivityIndicator, Dimensions,SafeAreaView } from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import ProductDetail from './ProductDetail'
import ProductEdit from './components/ProductEdit'
import Fire from '../../Fire'
import firebase from 'firebase'
import moment from 'moment'
import {Ionicons,Feather, MaterialIcons,
    MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';
const {height,width} = Dimensions.get('window')

class SellerProducts extends Component {
    static navigationOptions={
        header: null
        }
state={
    user:{},
    isLoading:true,
    post:[],
    inMemoryPosts:[],
    refreshing:false,
    error:'',
    loading:true
    }

unsubscribe=null

componentDidMount(){
    const didFocusSubscription = this.props.navigation.addListener(
        'didFocus',() => {
try {
let id=firebase.auth().currentUser.uid
var temp =[]
this.unsubscribe = Fire.shared.firestore
.collection("products")
.where('uid','==',id)
.get()
.then(querySnapshot => {
querySnapshot.forEach(documentSnapshot => {
temp.push(documentSnapshot.data())
this.setState({
isLoading:false,
post:temp,inMemoryPosts:temp
})

});});

}
catch (error) {
    this.setState({
        error:error
        })
}
 })
}
componentWillUnmount(){
    didFocusSubscription.remove();
}
    render() {
        setTimeout(()=>{this.setState({loading:false})},5000)
        if(this.state.post && this.state.post.length)
        return (
            <SafeAreaView>
            <FlatList
            numColumns={2}
            data={this.state.post}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
            return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ProductDetail',{item:item})}>
            
            <View style={styles.productContainer}>
            <Image 
            style={styles.productImage}
            source={item.dp ? {uri:item.dp} :require('../../assets/icon.png')}
            />
            <View style={styles.productDetails}>
            <Text style={styles.productTitle}>{item.name}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>
            <Text style={styles.productPrice}>Rs.{item.price}</Text>
            <Text style={styles.productDate}>{moment(item.createdAt).fromNow()}</Text>
            </View>
            </View>
            
            </TouchableOpacity>
            )
            }}
            />
            </SafeAreaView>
        )
        else
        return(
            <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            {!this.state.loading &&<Text style={{color:'#dedede',fontSize:16,fontFamily:'sans-serif-light'}}>
            No Products Available</Text>}
            {this.state.loading &&<ActivityIndicator size="large" color="orange"></ActivityIndicator>}
            </SafeAreaView>
        )

    }
}

export default createAppContainer(createStackNavigator({
    SellerProducts,
    ProductDetail,
    ProductEdit
   }))

const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    marginTop:32,
    },
    productContainer:{
    width:width/2.5,
    margin:20,
    },
    productImage:{
    height:width/2,
    width:width/2.5,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
    },
    productDetails:{
    height:width/3.5,
    width:width/2.5,
    padding:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
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
