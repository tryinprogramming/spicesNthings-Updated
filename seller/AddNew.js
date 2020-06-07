import React, { Component } from 'react'
import { Text, StyleSheet,TextInput,View,Image, Dimensions, TouchableOpacity,
    ActivityIndicator,Picker, SafeAreaView } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import {Ionicons,Feather, MaterialIcons,MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import Fire from '../Fire'

const {height,width} = Dimensions.get('window')

export default class ProductAdd extends Component {
    static navigationOptions={
        header: null
        }
    state=
    {
    product:{
        name:'',
        category:'',
        price:'',
        quantity:'',
        description:'',
        dp:null
    },
    homepage:true,
    seller:false,
    wait:false,
    success:false,
    }
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3,4]
        });
    
        if(!result.cancelled){
            this.setState({product:{...this.state.product,dp:result.uri}})
        }
    }
   
    addProduct=()=>{
        if(this.state.product.dp)
        {
            this.setState({wait:true})
            Fire.shared
            .addProduct(this.state.product)
            .then(ref=>{
            this.setState({wait:false})
            alert('Added Successfully')
            this.setState({product:{...this.state.product, name:'',category:'',price:'',quantity:'',description:'',dp:null}})
         })
     
        }
        else{
            alert('Upload a photo')
        }
      
    }
    render() {
        return(
            <SafeAreaView style={{flex:1,marginTop:32}}>

            <View style={{flex:0.1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            paddingHorizontal:width/9,borderBottomWidth:1,borderBottomColor:'#dedede'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Products')}>
            <Text style={{color:'#000',fontFamily:'sans-serif-light',fontSize:17,fontWeight:'300'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.addProduct}>
            {
                this.state.wait
                ? <Text style={{color:'orange',fontFamily:'sans-serif-light',fontSize:16}}>Uploading..</Text>
                :  <Text style={{color:'#000',fontFamily:'sans-serif-light',fontSize:17}}>Save</Text>
            }
            </TouchableOpacity>
            </View>

            <View style={{flex:0.9,alignItems:'center',marginTop:'5%'}}>
            
            <TextInput
            maxLength={25}
            placeholder="Name product"
            placeholderTextColor='gray'
            onChangeText={name=>this.setState({product:{...this.state.product,name}})}
            value={this.state.product.name}
            style={{width:width/1.3,height:35,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16
            }}
            />
        

            <TextInput
            maxLength={10}
            placeholder="Price"
            placeholderTextColor='gray'
            onChangeText={price=>this.setState({product:{...this.state.product,price}})}
            value={this.state.product.price}
            keyboardType='number-pad'
            style={{width:width/1.3,height:35,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16,marginTop:10
            }}
            />
    

            <TextInput
            style={{width:width/1.3,borderBottomWidth:0.3,borderColor:'gray',height: 35, fontSize:16,marginTop:10
            }}
            multiline={true}
            maxLength={500}
            placeholder="Description"
            placeholderTextColor='gray'
            onChangeText={description=>this.setState({product:{...this.state.product,description}})}
            value={this.state.product.description}
            
            />
    
           <View  style={{flexDirection:'row',width:width/1.3,height:40,marginTop:20,justifyContent:'space-between'}}> 
            <Text style={{fontSize:16,color:'gray'}}>Upload product image</Text>
            <TouchableOpacity onPress={this.pickImage}>
            <MaterialCommunityIcons name="camera-burst" size={30} color="gray" />
            </TouchableOpacity>
            </View>
    
            <View style={{marginHorizontal:32,height:150}}>
            <Image source={{uri:this.state.product.dp}} style={{height:width,width:width*0.6,borderRadius:10}}></Image>
            </View>
            
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

