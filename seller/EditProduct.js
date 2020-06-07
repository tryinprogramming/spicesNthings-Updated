import React, { Component } from 'react'
import { Text, StyleSheet,TextInput,View,Image, Dimensions, TouchableOpacity,
    ActivityIndicator,Picker, SafeAreaView } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import {Ionicons,Feather, MaterialIcons,MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome,FontAwesome5} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import Fire from '../Fire'

const {height,width} = Dimensions.get('window')

export default class ProductEdit extends Component {
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
    wait:false,
    success:false,
    }
    unsubscribe=null

    componentDidMount(){
    const didFocusSubscription = this.props.navigation.addListener(
    'didFocus',() => {
    const item = this.props.navigation.getParam('item')
    this.setState({product:{...this.state.product,
        name:item.name,
        category:item.category,
        price:item.price,
        quantity:item.quantity,
        description:item.description,
        dp:item.dp
    }})
    })
    
   
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
   
    updateProduct=()=>
    {
        this.setState({wait:true})
        const item = this.props.navigation.getParam('item')
        Fire.shared.updateProduct(this.state.product,item).then(()=>{
            this.setState({wait:false})
        })
      
    }
   
    render() {
        
        return(
            <SafeAreaView style={{flex:1,marginTop:32}}>
            <View style={{flex:0.1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            paddingHorizontal:width/9,borderBottomWidth:1,borderBottomColor:'#dedede'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Products')}>
            <Text style={{color:'#000',fontFamily:'sans-serif-light',fontSize:17,fontWeight:'300'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.updateProduct}>
            {
                this.state.wait
                ? <Text style={{color:'orange',fontFamily:'sans-serif-light',fontSize:16}}>Uploading..</Text>
                :  <Text style={{color:'#000',fontFamily:'sans-serif-light',fontSize:17}}>Save</Text>
            }
            </TouchableOpacity>
            </View>
            <View style={{flex:0.9,alignItems:'center',marginTop:'5%'}}>
            <Text style={{color:'#000',fontFamily:'sans-serif-light',fontSize:17,alignSelf:'flex-start',
            marginLeft:width/9}}>
            Name:</Text>
            <TextInput
            placeholder="Name product"
            placeholderTextColor='gray'
            onChangeText={name=>this.setState({product:{...this.state.product,name}})}
            value={this.state.product.name}
            style={{width:width/1.3,height:35,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16
            }}
            />
            
            
            <Text style={{color:'#000',fontFamily:'sans-serif-light',fontSize:17,alignSelf:'flex-start',
            marginLeft:width/9,marginTop:10}}>
            Price:</Text>
            <TextInput
            placeholder="Price"
            placeholderTextColor='gray'
            onChangeText={price=>this.setState({product:{...this.state.product,price}})}
            value={this.state.product.price}
            keyboardType='number-pad'
            style={{width:width/1.3,height:35,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16
            }}
            />

            <Text style={{color:'#000',fontFamily:'sans-serif-light',fontSize:17,alignSelf:'flex-start',
            marginLeft:width/9,marginTop:10}}>
            Description:</Text>
            <TextInput
            placeholder="Description"
            placeholderTextColor='gray'
            onChangeText={description=>this.setState({product:{...this.state.product,description}})}
            value={this.state.product.description}
            style={{width:width/1.3,height:35,borderBottomWidth:0.3,borderColor:'gray',
            fontSize:16
            }}
            />


           <View  style={{flexDirection:'row',width:width/1.3,height:35,marginTop:15,justifyContent:'space-between'}}> 
            <Text style={{fontSize:16,color:'gray'}}>Upload a photo</Text>
            <TouchableOpacity onPress={this.pickImage}>
            <MaterialCommunityIcons name="camera-burst" size={30} color="gray" />
            </TouchableOpacity>
            </View>
    
            <View style={{marginHorizontal:32,height:150}}>
            <Image source={{uri:this.state.product.dp}} style={{height:width*0.8,width:width*0.5,borderRadius:10}}></Image>
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

