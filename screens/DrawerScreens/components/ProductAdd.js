import React, { Component } from 'react'
import { Text, StyleSheet,TextInput,View,Image, Dimensions, TouchableOpacity,
    ActivityIndicator,Picker, SafeAreaView } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import {Ionicons,Feather, MaterialIcons,MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import Fire from '../../../Fire'

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
            <SafeAreaView style={{flex:1,alignItems:'center'}}>

            <View style={{flex:0.8,}}>
            <TextInput
            placeholder="Name product"
            placeholderTextColor='gray'
            onChangeText={name=>this.setState({product:{...this.state.product,name}})}
            value={this.state.product.name}
            style={{width:width/1.3,height:35,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16,marginTop:5
            }}
            />
            
            <TextInput
            placeholder="Select category"
            placeholderTextColor='gray'
            onChangeText={category=>this.setState({product:{...this.state.product,category}})}
            value={this.state.product.category}
            style={{width:width/1.3,height:35,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16,marginTop:10
            }}
            />
    
            <TextInput
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
            placeholder="Quantity"
            placeholderTextColor='gray'
            onChangeText={quantity=>this.setState({product:{...this.state.product,quantity}})}
            value={this.state.product.quantity}
            keyboardType='number-pad'
            style={{width:width/1.3,height:35,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16,marginTop:10
            }}
            />

            <TextInput
            placeholder="Description"
            placeholderTextColor='gray'
            onChangeText={description=>this.setState({product:{...this.state.product,description}})}
            value={this.state.product.description}
            style={{width:width/1.3,height:35,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16,marginTop:10
            }}
            />


           <View  style={{flexDirection:'row',width:width/1.3,height:35,marginTop:15,justifyContent:'space-between'}}> 
            <Text style={{fontSize:16,color:'gray'}}>Upload a photo</Text>
            <TouchableOpacity onPress={this.pickImage}>
            <MaterialCommunityIcons name="camera-burst" size={30} color="gray" />
            </TouchableOpacity>
            </View>
    
            <View style={{marginHorizontal:32,height:150,}}>
            <Image source={{uri:this.state.product.dp}} style={{width:"100%", height:"100%"}}></Image>
            </View>
            
          </View>
            
    
        <View style={{flex:0.2,flexDirection:'row'}}>
        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Shop')}>
        <Text style={{color:'#fff',fontWeight:'500'}}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.addProduct}>
        {this.state.wait
            ?<ActivityIndicator size="small" color="#fff"></ActivityIndicator> 
            :<Text style={{color:'#fff',fontWeight:'500'}}>Add Product</Text>
        }
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

