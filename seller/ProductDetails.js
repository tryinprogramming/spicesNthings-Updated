import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity,
TextInput, FlatList, ActivityIndicator, Dimensions, SafeAreaView, ImageBackground,ScrollView } from 'react-native'
import Fire from '../Fire'
import firebase from 'firebase'
import moment from 'moment'
import {Ionicons,Feather, MaterialIcons,
    MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';
import { TextField } from 'react-native-material-textfield'
const {height,width} = Dimensions.get('window')

export default class SellerProducts extends Component {
    static navigationOptions={
        header: null
        }
     state={
         error:'',
     }
       deleteProduct=()=>{
        try {
        const deleteP = this.props.navigation.getParam('item')
        this.unsubscribe = Fire.shared.firestore
        .collection("products")
        .where('productID','==',deleteP.productID)
        .get()
        .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
        documentSnapshot.ref.delete()
        alert('Deleted Successfully')
        this.props.navigation.navigate('Products')
        });});
        
        }catch (error) {
            this.setState({
                error:error
                })
        }
        
        }

    render() {
        const item = this.props.navigation.getParam('item')
        return (
            <SafeAreaView style={{flex:1,marginTop:32}}>

            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:width/22,
            marginBottom:20}}>
            <Text style={{color:'#000',fontFamily:'sans-serif-light',fontSize:20,fontWeight:'500'}}>Product Details</Text>
            </View>
            <ScrollView>
            <ImageBackground
            style={styles.productImage}
            source={item.dp ? {uri:item.dp} :require('../assets/icon.png')}
            >
            <View style={{height:200,justifyContent:'space-evenly'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Products')}
            style={{...styles.iconContainer,backgroundColor:'#dedede'}}>
            <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.deleteProduct}
            style={{...styles.iconContainer,backgroundColor:'#c4302b'}}>
            <AntDesign name="delete" size={20} color="#fff" /></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditProduct',{item:item})}
            style={{...styles.iconContainer,backgroundColor:'#3b5998'}}>
            <Feather name="edit" size={20} color="#fff" /></TouchableOpacity>
            </View>
            </ImageBackground>

            <View style={{padding:10,marginTop:20}}>

            
            <Text style={{fontFamily:'sans-serif-light',color:'#000',fontSize:16,fontWeight:'300'}}>
            Name
             </Text>
             <Text style={{color:'#000',fontSize:18,marginBottom:'2%',
             fontWeight:'300',borderBottomWidth:1,borderBottomColor:'#dedede'}}>
             {item.name}
             </Text>
           

           
            <Text style={{fontFamily:'sans-serif-light',color:'#000',fontSize:16,fontWeight:'300'}}>
            Price
             </Text>
             <Text style={{color:'#000',fontSize:18,marginBottom:'2%',
             fontWeight:'300',borderBottomWidth:1,borderBottomColor:'#dedede'}}>
             {item.price}
             </Text>
            
          
            <Text style={{fontFamily:'sans-serif-light',color:'#000',fontSize:16,fontWeight:'300'}}>
            Description
             </Text>
             <Text style={{color:'#000',fontSize:16,marginBottom:'2%',
             fontWeight:'300',borderBottomWidth:1,borderBottomColor:'#dedede'}}>
             {item.description}
             </Text>
           
           
            </View>
            </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    marginTop:32,
    },
    productContainer:{
    width:width/1.4,
    margin:20,
    },
    productImage:{
    justifyContent:'center',
    height:width+100,
    width:width,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
    },
    productDetails:{
    height:width/3,
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
    iconContainer:{
        height:width*0.1,
        width:width*0.1,
       borderTopRightRadius:17,
       borderBottomRightRadius:17,
        justifyContent:'center',
        alignItems:'center'
    }
    })
