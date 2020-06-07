import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity,
TextInput, FlatList, ActivityIndicator, Dimensions, SafeAreaView, ImageBackground } from 'react-native'
import Fire from '../../Fire'
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
        this.props.navigation.navigate('SellerProducts')
        alert('Deleted Successfully')
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
            <SafeAreaView style={{flex:1,marginTop:'2%'}}>

            <ImageBackground
            style={styles.productImage}
            source={item.dp ? {uri:item.dp} :require('../../assets/icon.png')}
            >
            <View style={{height:200,justifyContent:'space-evenly'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('SellerProducts')}
            style={{...styles.iconContainer,backgroundColor:'#dedede'}}>
            <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.deleteProduct}
            style={{...styles.iconContainer,backgroundColor:'#c4302b'}}>
            <AntDesign name="delete" size={20} color="#fff" /></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ProductEdit',{item:item})}
            style={{...styles.iconContainer,backgroundColor:'#3b5998'}}>
            <Feather name="edit" size={20} color="#fff" /></TouchableOpacity>
            </View>
            </ImageBackground>

            <View style={{flex:0.5,padding:10,marginTop:20}}>

            
            <Text style={{fontFamily:'sans-serif-light',color:'#000',fontSize:16,fontWeight:'300'}}>
            Name
             </Text>
             <Text style={{color:'#000',fontSize:18,marginBottom:'2%',
             fontWeight:'300',borderBottomWidth:1,borderBottomColor:'#dedede'}}>
             {item.name}
             </Text>
           

            
            <Text style={{fontFamily:'sans-serif-light',color:'#000',fontSize:16,fontWeight:'300'}}>
            Category
             </Text>
             <Text style={{color:'#000',fontSize:18,marginBottom:'2%',
             fontWeight:'300',borderBottomWidth:1,borderBottomColor:'#dedede'}}>
             {item.category}
             </Text>
            

           
            <Text style={{fontFamily:'sans-serif-light',color:'#000',fontSize:16,fontWeight:'300'}}>
            Price
             </Text>
             <Text style={{color:'#000',fontSize:18,marginBottom:'2%',
             fontWeight:'300',borderBottomWidth:1,borderBottomColor:'#dedede'}}>
             {item.price}
             </Text>
            

          
            <Text style={{fontFamily:'sans-serif-light',color:'#000',fontSize:16,fontWeight:'300'}}>
            Quantity
             </Text>
             <Text style={{color:'#000',fontSize:18,marginBottom:'2%',
             fontWeight:'300',borderBottomWidth:1,borderBottomColor:'#dedede'}}>
             {item.quantity}
             </Text>
            

          
            <Text style={{fontFamily:'sans-serif-light',color:'#000',fontSize:16,fontWeight:'300'}}>
            Description
             </Text>
             <Text style={{color:'#000',fontSize:16,marginBottom:'2%',
             fontWeight:'300',borderBottomWidth:1,borderBottomColor:'#dedede'}}>
             {item.description.split('').slice(0,250)}
             </Text>
           
           
            </View>

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
    width:width/2.5,
    margin:20,
    },
    productImage:{
    flex:0.4,
    justifyContent:'center',
    height:width/1.5,
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
