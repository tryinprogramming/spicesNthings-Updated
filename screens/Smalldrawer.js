import React, { Component } from "react";
import { Text, View,StyleSheet,ScrollView,Image,ImageBackground,Dimensions, SafeAreaView} from "react-native";
import {DrawerNavigatorItems} from 'react-navigation-drawer'
import {Feather} from '@expo/vector-icons';
import firebase from 'firebase'
import Fire from '../Fire'
const width=Dimensions.get('window').width *0.75
const height=Dimensions.get('window').height

export default class Sidebar extends Component
{
  constructor(props)
  {
    super(props)
    this.state={
      displayName:'Guest',
      user:{},
      emptyUser:{},
    }
  }

  unsubscribe=null
    componentDidMount(){ 
    firebase.auth().onAuthStateChanged(user=>
    {  
    if(user)
    {
    const userId = this.props.id || Fire.shared.uid
    this.unsubscribe = Fire.shared.firestore
    .collection("users")
    .doc(userId)
    .onSnapshot(doc =>{
    this.setState({ user:doc.data()})
    })}
    else{
      this.setState({ user:this.state.emptyUser})
    }
    }
    );

    }
    
    componentWillUnmount(){
    this.unsubscribe=null
}


  render(){
    return(
      <SafeAreaView style={styles.main}>
      <View style={styles.container}>
      <Image 
      style={{width:100,height:100}}
      source={require('../assets/splash.png')}
      />
      <Text style={styles.name}>Hello! {this.state.user.name?this.state.user.name:this.state.displayName}</Text>
      </View>
      
      <View style={{flex:1}}>
      <DrawerNavigatorItems {...this.props}/>
      </View>
      </SafeAreaView>
        )
  }
}

const styles = StyleSheet.create({
  main:
  {
    flex:1,
    backgroundColor:'#fff'
  },
  container: {
    flex: 0.3,
    justifyContent:'center',
    alignItems:'center'
  },
   profile:{
       width:100,
       height:100,
       borderRadius:50
    },
    name:{
        color:'#000',
        fontSize:16,
        fontWeight:'400',
       marginVertical:10
        
    },
    
  });












