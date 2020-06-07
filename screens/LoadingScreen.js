import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator,Image } from 'react-native'
export default class LoadingScreen extends Component {
  
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color='#ffa500'></ActivityIndicator>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    }
})
