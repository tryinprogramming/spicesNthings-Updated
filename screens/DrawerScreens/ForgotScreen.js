import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ActivityIndicator,SafeAreaView } from 'react-native'
import { TextInput } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Hoshi} from 'react-native-textinput-effects';
import {AntDesign,Ionicons} from '@expo/vector-icons'
import firebase from 'firebase'

const {width, height}=Dimensions.get('window')
export default class LoginScreen extends Component {
  static navigationOptions={
      header: null
  }
    state={
        email:'',
        wait:false,
        errorMessage:null,
    }

     handleForgot= () => {
         this.setState({wait:true})
         firebase.auth().sendPasswordResetEmail(this.state.email.trim())
         .then(()=>{
            this.setState({wait:false})
             alert('Email sent Sucessfully')
         })
     }
   
    render() {
        return (
            <SafeAreaView style={styles.container}>

            <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Login')}>
            <View style={{...styles.back,marginLeft:25}}>
            <AntDesign name="arrowleft" color="#000" size={22}/>
            </View>
            </TouchableOpacity>
                
            <View style={styles.errorMessage}>
            <Text style={styles.sub_heading}>Type your email below to get a password reset email
            </Text>
            
            </View>
            
            <View style={styles.form}>

            <Hoshi
            label={'Email'}
            borderColor={'#ffa500'}
            borderHeight={2}
            inputPadding={16}
            style={{marginBottom:10}}
            onChangeText={email=>this.setState({email})}
            value={this.state.email}
            />
                
                <TouchableOpacity onPress={this.handleForgot} style={styles.button}>
                {this.state.wait 
                    ?
                    <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#ffa500',fontWeight:'500',fontSize:16}}>Send Verification Email !</Text> 
                    <ActivityIndicator size="small" color="#ffa500" style={{marginLeft:'20%'}}/> 
                    </View>
                    :  <Text style={{color:'#ffa500',fontWeight:'500',fontSize:16}}>Send Verification Email !</Text>
                }
                </TouchableOpacity>
                
           
            

            </View>
          <Image source={require('../../assets/forgot.png')}
          style={{
              flex:1,
              width:null,
              height:null,
              resizeMode:'contain'
            }}
          />
            </SafeAreaView>

            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        height:height,
        marginTop:32
    },
    heading:{
        color:'#000',
        fontSize:20,
        fontWeight:'bold',
        fontFamily:'serif',
        lineHeight:20
    },

    sub_heading:{
        color:'#000',
        fontSize:14,
        fontWeight:'200',
        fontFamily:'sans-serif-light'
    },
   
    errorMessage:{
        flex:0.1,
        alignItems:'center',
        justifyContent:'flex-end',
        marginHorizontal:30,
    },
    error:{
        color:'#ffa500',
        fontSize:13,
        fontWeight:'600',
        textAlign:'center'
    },
    form:{
        flex:0.5,
        justifyContent:'space-evenly',
        marginHorizontal:30,
    },
    inputTitle:{
        color:'#8A8F9E',
        fontSize:10,
        textTransform:'uppercase'
    },

    button:{
        borderColor:'#ffa500',
        borderWidth:2,
        borderRadius:4,
        height:52,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row', 
       
    },
    back:{
        height:30,
        width:30,
        borderRadius:15,
        backgroundColor:'rgba(21,22,48,0.1)',
        justifyContent:'center',
        alignItems:'center',
        },
})
