import React, { Component } from 'react'
import { Text, StyleSheet,TextInput,View,Image, Dimensions, TouchableOpacity,
    ActivityIndicator,Picker, SafeAreaView } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import {Ionicons,Feather, MaterialIcons,MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import Fire from '../../../Fire'

const {height,width} = Dimensions.get('window')

export default class SellerAdd extends Component {
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
    homepage:true,
    seller:false,
    wait:false,
    success:false,
    }
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3]
        });
    
        if(!result.cancelled){
            this.setState({shop:{...this.state.shop,dp:result.uri}})
        }
    }
    setShop=()=>{
       Fire.shared.setShop()
    }
    addShop=()=>{
        Fire.shared.addShop(this.state.shop)
    }
    render() {
        return(
            <SafeAreaView style={styles.container}>
            
            <View style={{flex:0.1,flexDirection:'row',alignSelf:'flex-start',marginLeft:30 }}>
            <TouchableOpacity onPress={()=>this.setState({shop:false,image:null})}>
            <MaterialIcons name="keyboard-backspace" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{color:'#000',fontSize:20,marginLeft:20}}>Add Your Shop</Text>
            </View>
    
            <View style={styles.form}>
            <TextInput
            placeholder="Name of shop"
            placeholderTextColor='gray'
            onChangeText={name=>this.setState({shop:{...this.state.shop,name}})}
            value={this.state.shop.name}
            style={{width:width/1.3,height:40,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16,
            }}
            />
            
            <TextInput
            placeholder="Select shop category"
            placeholderTextColor='gray'
            onChangeText={category=>this.setState({shop:{...this.state.shop,category}})}
            value={this.state.shop.category}
            style={{width:width/1.3,height:40,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16,marginTop:13
            }}
            />
    
            <TextInput
            placeholder="Location of shop"
            placeholderTextColor='gray'
            onChangeText={location=>this.setState({shop:{...this.state.shop,location}})}
            value={this.state.shop.location}
            style={{width:width/1.3,height:40,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16,marginTop:13
            }}
            />
    
            <TextInput
            placeholder="Contact number"
            placeholderTextColor='gray'
            onChangeText={phone=>this.setState({shop:{...this.state.shop,phone}})}
            value={this.state.shop.phone}
            keyboardType='number-pad'
            style={{width:width/1.3,height:40,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16,marginTop:25
            }}
            />
    
           <View  style={{flexDirection:'row',width:width/1.3,height:40,marginTop:25,justifyContent:'space-between'}}> 
            <Text style={{fontSize:16,color:'gray'}}>Upload shop cover</Text>
            <TouchableOpacity onPress={this.pickImage}>
            <MaterialCommunityIcons name="camera-burst" size={30} color="gray" />
            </TouchableOpacity>
            </View>
    
            <View style={{marginHorizontal:32,marginTop:32,height:150}}>
            <Image source={{uri:this.state.shop.dp}} style={{width:"100%", height:"100%"}}></Image>
            </View>
            
          </View>
            
    
        <View style={{flex:0.3}}>
        <TouchableOpacity style={styles.button} onPress={this.addShop}>
        <Text style={{color:'#fff',fontWeight:'500'}}>Create Shop</Text>
        </TouchableOpacity>
        </View>
            
        
    
            </SafeAreaView>
          )
    }
}

const styles = StyleSheet.create({})
