import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions,TouchableOpacity,SafeAreaView,KeyboardAvoidingView } from 'react-native'
import {Hoshi} from 'react-native-textinput-effects';
import {Feather,Ionicons,Entypo,MaterialCommunityIcons} from '@expo/vector-icons'
import firebase from 'firebase'
import Fire from '../../Fire'
import UserPermissions from '../../UserPermissions'
import * as ImagePicker from 'expo-image-picker'
import { ScrollView } from 'react-native-gesture-handler';
const {width,height} = Dimensions.get('window')


export default class Settings extends Component {
    static navigationOptions={
        header: null
    }
    state={
        user:{},
        editForm:false
    }   
       

    componentDidMount(){
    const didFocusSubscription = this.props.navigation.addListener(
        'didFocus',() => {
            firebase.auth().onAuthStateChanged(user=>{
              if(user){
           
                 const userId = this.props.id || Fire.shared.uid
                  this.unsubscribe = Fire.shared.firestore
                  .collection("users")
                  .doc(userId)
                  .onSnapshot(doc =>{
                      this.setState({ user:doc.data() })
                  })
              }
              else{
                  
                this.props.navigation.navigate('Login')
              }
            }
         )})}
//     unsubscribe=null
//     componentDidMount(){
//         const didFocusSubscription = this.props.navigation.addListener(
//             'didFocus',() => {
//                 firebase.auth().onAuthStateChanged(user=>
//                   { 
//                 //  this.props.navigation.navigate(user?'Profile':'Login')
//                   if(user)
//                   {
//                    const userId = this.props.id || Fire.shared.uid
//                   this.unsubscribe = Fire.shared.firestore
//                   .collection("users")
//                   .doc(userId)
//                   .onSnapshot(doc =>{
//                       this.setState({ user:doc.data() })
//                   })}
//                   else
//                 {  
//                     //this.props.navigation.navigate('Login')
//                 }
//                 }
//                 );
//          })  
//     }
    
// componentWillUnmount(){
//     didFocusSubscription.remove();
//     this.unsubscribe();
// }

handleDpUpload = async () => {
    UserPermissions.getCameraPermission();
   
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3,3]
    });

    if(!result.cancelled){
        this.setState({user:{...this.state.user,dp: result.uri} })
    }

}

updateForm=()=>{
    Fire.shared.updateUser(this.state.user)
    this.setState({editForm:false})
}

    render() {
        return (
           this.state.editForm
            ?
            <SafeAreaView style={styles.container}>

            <View style={{flex:0.3,marginTop:25,alignItems:'center',backgroundColor:'#003152',
            justifyContent:'flex-start',}}>
            <View style={{padding:20,width:width,flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity onPress={()=>this.setState({editForm:false})}>
           <Text style={{fontFamily:'sans-serif-light',color:'#fff',fontSize:18,fontWeight:'300'}}>Cancel</Text>
            </TouchableOpacity>
             <TouchableOpacity onPress={this.updateForm} >
             <Text style={{fontFamily:'sans-serif-light',color:'#fff',fontSize:18,fontWeight:'300'}}>Save</Text>
             </TouchableOpacity>
             </View>

            <View style={{flexDirection:'column'}}>
            <Image 
            style={{height:100,width:100,borderRadius:50}}
            source={this.state.user.dp ? {uri:this.state.user.dp} :require('../../assets/icon.png')}
            />
            <TouchableOpacity style={{
                height:30,width:30,borderRadius:15,marginTop:-35,backgroundColor:'#ffa500',
                justifyContent:'center',alignItems:'center'
            }} onPress={this.handleDpUpload}>
            <Feather name="camera" size={18} color="#fff" />
            </TouchableOpacity>
            </View>
            </View>


            <KeyboardAvoidingView 
            behavior='padding'
            style={{backgroundColor:'#fff',flex:0.7,paddingTop:10,paddingHorizontal:20,}}>
            <Hoshi
            label={'Name'}
            borderHeight={0}
            style={{marginBottom:10,width:width-40}}
            inputStyle={{color:'#000',fontSize:18,}}
            onChangeText={name=>this.setState({user:{...this.state.user,name}})}
            value={this.state.user.name}
            />

            <Hoshi
            inputStyle={{color:'#000',fontSize:18}}
            label={'Phone'}
            borderHeight={0}
            style={{marginBottom:10,width:width-40}}
            onChangeText={phone=>this.setState({user:{...this.state.user,phone}})}
            value={this.state.user.phone}
            />

            <Hoshi
            inputStyle={{color:'#000',fontSize:18}}
            label={'Address'}
            borderHeight={0}
            style={{marginBottom:10,width:width-40}}
            onChangeText={address=>this.setState({user:{...this.state.user,address}})}
            value={this.state.user.address}
            />
            
            <Hoshi
            inputStyle={{color:'#000',fontSize:18}}
            label={'Country'}
            borderHeight={0}
            style={{marginBottom:10,width:width-40}}
            onChangeText={country=>this.setState({user:{...this.state.user,country}})}
            value={this.state.user.country}
            />
            
            </KeyboardAvoidingView>
            <View style={{flex:0.1,backgroundColor:'#fff'}} />
            </SafeAreaView>

             :<SafeAreaView style={styles.container}>

             <View style={{flex:0.35,marginTop:25,alignItems:'center',backgroundColor:'#003152',
             justifyContent:'flex-start',}}>

             <View style={{padding:20,width:width,flexDirection:'row',justifyContent:'space-between'}}>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
            <Text style={{fontFamily:'sans-serif-light',color:'#fff',fontSize:18,fontWeight:'300'}}>Back</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>this.setState({editForm:true})}>
             <Text style={{fontFamily:'sans-serif-light',color:'#fff',fontSize:18,fontWeight:'300'}}>Edit Profile</Text>
             </TouchableOpacity>
              </View>

             
             <Image 
             style={styles.dp}
             source={this.state.user.dp ? {uri:this.state.user.dp} :require('../../assets/icon.png')}
             />

            
             </View>


             <View style={{paddingTop:25,paddingHorizontal:20,flex:0.65,backgroundColor:'#fff',alignItems:'center',
             justifyContent:'flex-start',}}>
 
             <Hoshi
             label={'Name'}
             borderColor={'#dedede'}
             borderHeight={0}
             inputStyle={{color:'#000',fontSize:18}}
             style={{marginBottom:10,width:width-40}}
             editable={false}
             value={this.state.user.name}
             />
 
             <Hoshi
             label={'Phone'}
             borderColor={'#dedede'}
             borderHeight={0}
             inputStyle={{color:'#000',fontSize:18}}
             style={{marginBottom:10,width:width-40}}
             editable={false}
             value={this.state.user.phone}
             />
 
             <Hoshi
             label={'Email'}
             borderColor={'#dedede'}
             borderHeight={0}
             inputStyle={{color:'#000',fontSize:18}}
             style={{marginBottom:10,width:width-40}}
             editable={false}
             value={this.state.user.email}
             />
             <Hoshi
             label={'Country'}
             borderColor={'#dedede'}
             borderHeight={0}
             inputStyle={{color:'#000',fontSize:18}}
             style={{marginBottom:10,width:width-40}}
             editable={false}
             value={this.state.user.country}
             />
             <Hoshi
             label={'Address'}
             borderColor={'#dedede'}
             borderHeight={0}
             multiline={true}
             inputStyle={{color:'#000',fontSize:18}}
             style={{marginBottom:10,width:width-40}}
             editable={false}
             value={this.state.user.address}
             />

             </View>
           
 
             </SafeAreaView>
             )
        }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#003152',
        height:height,
        width:width
    },
    dp:{
        height:150,
        width:150,
        borderRadius:75,
    },
    name:{
        marginTop:30,
        fontSize:18,
        fontWeight:'600',
        color:'#000'
    },
    addimg:{
        position:'absolute',
        top:140,
        left:210,
        backgroundColor:'#fff',
        height:33,
        width:33,
        borderRadius:16,
        justifyContent:'center',
        alignItems:'center'
    },
})
