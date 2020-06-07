import React, { Component } from 'react'
import { Text, StyleSheet, Image, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native'
import firebase from 'firebase'
import Fire from '../../Fire'
const { width, height } = Dimensions.get('window')
import AuthContext from "../AuthContext";

export default class Logout extends Component {
    static contextType = AuthContext;

    state = {
        isLogged: false,
        message: 'You are Logged out !',
    }
    async logout() {
        await firebase.auth().signOut();
        this.context.setIsAuth(false);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{ flex: 0.5, height: '100%', width: '100%', resizeMode: 'contain' }}
                    source={require('../../assets/logout.png')}
                />
                <Text style={{ fontSize: 16, fontFamily: 'sans-serif-light', marginBottom: '5%' }}>Are you sure for logging out ?</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={this.logout}>
                    <Text style={{ fontSize: 18, fontFamily: 'sans-serif-light' }}>Yes, I'm</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    logoutButton: {
        height: 52,
        width: width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffa500',
        borderRadius: 4,
    }
})
