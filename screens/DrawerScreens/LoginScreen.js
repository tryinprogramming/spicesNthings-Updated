import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { Hoshi } from 'react-native-textinput-effects';
import firebase from 'firebase'
import Fire from '../../Fire'
import AuthContext from "../AuthContext";
const { width, height } = Dimensions.get('window')

export default class LoginScreen extends Component {
    static contextType = AuthContext;

    static navigationOptions = {
        header: null
    }
    state = {
        email: '',
        password: '',
        wait: false,
        errorMessage: null,
        isLogged: false
    }


    handleLogin = () => {
        this.setState({ wait: true, errorMessage: null })
        const { email, password } = this.state
        firebase
            .auth().signInWithEmailAndPassword(email.trim(), password)
            .then(() => {
                this.setState({ wait: false, email: '', password: '' })
                alert('Logged In Sucessfully')
                this.context.setIsAuth(true);
            })
            .catch(error => {
                this.setState({ errorMessage: error.message, wait: false })
            })

    }
    render() {
        let auth = this.context;
        console.log(this.context);
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage
                        ? <Text style={styles.error}>{this.state.errorMessage}</Text>
                        : <Text style={styles.sub_heading}>
                            Welcome to <Text style={styles.heading}>
                                Spices</Text> n <Text style={styles.heading}>
                                Things</Text>
                        </Text>
                    }
                </View>

                <View style={styles.form}>

                    <Hoshi
                        label={'Email'}
                        borderColor={'#ffa500'}
                        borderHeight={2}
                        inputPadding={16}
                        style={{ marginBottom: 10 }}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />

                    <Hoshi
                        label={'Password'}
                        borderColor={'#ffa500'}
                        borderHeight={2}
                        inputPadding={16}
                        style={{ marginBottom: 10 }}
                        secureTextEntry
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />



                    <TouchableOpacity style={styles.button}
                        onPress={this.handleLogin}>
                        {this.state.wait
                            ? <ActivityIndicator size="small" color="#fff"></ActivityIndicator>
                            : <Text style={{ color: '#fff', fontWeight: '500' }}>Sign In</Text>
                        }
                    </TouchableOpacity>


                    <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#414959', fontSize: 13, marginRight: 5 }}>
                            Don't have account yet?
             </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={{ fontWeight: '500', color: '#ffa500' }}>Signup Now</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgot')}>
                            <Text style={{ fontWeight: '500', color: '#ffa500' }}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <Image source={require('../../assets/signin.png')}
                    style={{
                        flex: 0.9,
                        width: null,
                        height: null,
                        resizeMode: 'contain'
                    }}
                />

            </SafeAreaView>
        )

    }
}



const styles = StyleSheet.create({
    cross: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(21,22,48,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        marginRight: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: height,
        marginTop: 32
    },
    heading: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'serif',
    },

    sub_heading: {
        color: '#000',
        fontSize: 14,
        fontWeight: '200',
        fontFamily: 'sans-serif-light'
    },

    errorMessage: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginHorizontal: 30,
    },
    error: {
        color: '#c4302b',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    form: {
        flex: 1.5,
        justifyContent: 'space-evenly',
        marginHorizontal: 30,
        marginVertical: 10
    },
    inputTitle: {
        color: '#8A8F9E',
        fontSize: 10,
        textTransform: 'uppercase'
    },

    button: {
        backgroundColor: '#ffa500',
        borderRadius: 4,
        height: 52,
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    logoutButton: {
        height: 52,
        width: width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffa500',
        borderRadius: 4,
    }
})
