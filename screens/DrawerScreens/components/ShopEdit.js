import React, { Component } from 'react'
import { Text, StyleSheet,TextInput,View,Image, Dimensions, TouchableOpacity,
    ActivityIndicator,Picker, SafeAreaView } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import {Ionicons,Feather, MaterialIcons,MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import Fire from '../../../Fire'
import firebase from 'firebase'

const {height,width} = Dimensions.get('window')

export default class SellerAdd extends Component {
    static navigationOptions={
        header: null
        }
    state=
    {
    user:{},
    text: '',
    homepage:true,
    seller:false,
    wait:false,
    success:false,
    }

    unsubscribe=null
    componentDidMount(){
                firebase.auth().onAuthStateChanged(user=>
                  { 
                  if(user)
                  {const userId = this.props.id || Fire.shared.uid
                  this.unsubscribe = Fire.shared.firestore
                  .collection("users")
                  .doc(userId)
                  .onSnapshot(doc =>{
                      this.setState({ user:doc.data() })
                  })}
                  else
                {  
                    //this.props.navigation.navigate('Login')
                }
                }
                );
          
    }
    
componentWillUnmount(){
    this.unsubscribe();
}
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3]
        });
    
        if(!result.cancelled){
            this.setState({user:{...this.state.user,shopdp:result.uri}})
        }
    }
    setShop=()=>{
       Fire.shared.setShop()
    }
    updateShop=()=>{
        Fire.shared.updateShop(this.state.user)
    }
    render() {
        return(
            <SafeAreaView style={{flex:1,alignItems:'center'}}>

            <View style={{flex:0.8,marginTop:'1%'}}>
            <TextInput
            placeholder="Name of shop"
            placeholderTextColor='gray'
            onChangeText={shopname=>this.setState({user:{...this.state.user,shopname}})}
            value={this.state.user.shopname}
            style={{width:width/1.3,height:40,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16,
            }}
            />
            
            <TextInput
            placeholder="Select shop category"
            placeholderTextColor='gray'
            onChangeText={shopcategory=>this.setState({user:{...this.state.user,shopcategory}})}
            value={this.state.user.shopcategory}
            style={{width:width/1.3,height:40,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16,marginTop:13
            }}
            />
    
            <TextInput
            placeholder="Location of shop"
            placeholderTextColor='gray'
            onChangeText={shoplocation=>this.setState({user:{...this.state.user,shoplocation}})}
            value={this.state.user.shoplocation}
            style={{width:width/1.3,height:40,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16,marginTop:13
            }}
            />
    
            <TextInput
            placeholder="Contact number"
            placeholderTextColor='gray'
            onChangeText={shopnumber=>this.setState({user:{...this.state.user,shopnumber}})}
            value={this.state.user.shopnumber}
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
    
            <View style={{marginHorizontal:32,height:150}}>
            <Image source={{uri:this.state.user.shopdp}} style={{width:"100%", height:"100%"}}></Image>
            </View>
            
          </View>
            
    
          <View style={{flex:0.2,flexDirection:'row'}}>
          <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Shop')}>
          <Text style={{color:'#fff',fontWeight:'500'}}>Back</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.updateShop}>
        <Text style={{color:'#fff',fontWeight:'500'}}>Update Shop</Text>
        </TouchableOpacity>
        </View>
            
        
    
            </SafeAreaView>
          )
    }
}

const styles = StyleSheet.create({
    button:{
        width:width/2.5,
        backgroundColor:'#ffa500',
        borderRadius:4,
        height:52,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginHorizontal:width*0.05
    }
})
