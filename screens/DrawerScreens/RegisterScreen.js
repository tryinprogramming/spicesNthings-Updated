import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, SafeAreaView, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper'
import { AntDesign, Ionicons } from '@expo/vector-icons'
const { width, height } = Dimensions.get('window')
import Fire from '../../Fire'
import firebase from 'firebase'
import UserPermissions from '../../UserPermissions'
import * as ImagePicker from 'expo-image-picker'
import { Hoshi } from 'react-native-textinput-effects';
import AuthContext from "../AuthContext";

export default class RegisterScreen extends Component {
    static contextType = AuthContext;

    static navigationOptions = {
        header: null
    }
    state = {
        user: {
            name: '',
            email: '',
            password: '',
            dp: null,
            seller: false,
        },

        errorMessage: null,
        wait: false
    }

    handleDpUpload = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3]
        });

        if (!result.cancelled) {
            console.log(result.uri)
            this.setState({ user: { ...this.state.user, dp: result.uri } })
        }

    }

    handleSignup = () => {
        this.setState({ errorMessage: null, wait: true })
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.user.email.trim(), this.state.user.password)
            .then(() => {
                Fire.shared.createUser(this.state.user)
                this.setState({ errorMessage: 'Created Account Successfully', wait: false })
                this.setState({ user: { ...this.state.user, name: ' ', email: ' ', password: ' ', dp: null } })
                alert('Account is created Sucessfully')
                this.context.setIsAuth(true);
            })
            .catch(error => {
                this.setState({ errorMessage: error.message })
                this.setState({ wait: false })
            })
    }
    render() {
        console.log(this.state.user);
        return (
            <SafeAreaView style={styles.container}>
                <View style={{
                    flex: 0.2, flexDirection: 'row', justifyContent: 'space-between', marginTop: 43,
                    marginHorizontal: 25
                }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <View style={styles.back}>
                            <AntDesign name="arrowleft" color="#000" size={22} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.greeting}>{`Lets get started`}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <View style={styles.back}>
                            <AntDesign name="question" color="#000" size={22} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.errorMessage}>
                    <Text style={styles.error}>{this.state.errorMessage}</Text>
                </View>

                <KeyboardAvoidingView
                    behavior='padding'
                    style={styles.form}>


                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={this.state.user.dp != null ? { uri: this.state.user.dp } : require('../../assets/icon.png')}
                            style={{ height: 100, width: 100, borderRadius: 50, borderWidth: 2, borderColor: '#ffa500' }}
                        />
                        <TouchableOpacity style={{
                            height: 35, width: 35, borderRadius: 17.5, marginLeft: -25, backgroundColor: '#fff',
                            justifyContent: 'center', alignItems: 'center'
                        }} onPress={this.handleDpUpload}>
                            <Ionicons name="ios-add-circle" color="#ffa500" size={35} />
                        </TouchableOpacity>
                    </View>



                    <Hoshi
                        label={'Name (Optional)'}
                        borderColor={'#ffa500'}
                        borderHeight={2}
                        inputPadding={10}
                        style={{ marginBottom: 10 }}
                        onChangeText={name => this.setState({ user: { ...this.state.user, name } })}
                        value={this.state.user.name}
                    />

                    <Hoshi
                        label={'Email'}
                        borderColor={'#ffa500'}
                        borderHeight={2}
                        inputPadding={16}
                        style={{ marginBottom: 10 }}
                        onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
                        value={this.state.user.email}
                    />
                    <Hoshi
                        label={'Password'}
                        borderColor={'#ffa500'}
                        borderHeight={2}
                        inputPadding={16}
                        style={{ marginBottom: 10 }}
                        secureTextEntry
                        onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
                        value={this.state.user.password}
                    />
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                        <Checkbox
                            color="#ffa500"
                            status={this.state.user.seller ? 'checked' : 'unchecked'}
                            onPress={() => { this.setState({ user: { ...this.state.user, seller: !this.state.user.seller } }); }}
                        />
                        <Text style={{ fontSize: 16, fontWeight: '600', color: 'grey' }}>I am a Seller</Text>
                    </View>
                    <TouchableOpacity style={styles.button}
                        onPress={this.handleSignup}>
                        {this.state.wait
                            ? <ActivityIndicator size="small" color="#fff"></ActivityIndicator>
                            : <Text style={{ color: '#fff', fontWeight: '500' }}>Sign Up</Text>
                        }
                    </TouchableOpacity>

                    <View style={{ alignSelf: 'center', marginTop: 32 }}>
                        <Text style={{ color: '#414959', }}>
                            I agree to<Text style={{ fontWeight: '500', color: '#ffa500' }}>
                                {` Terms & Conditions`}</Text>
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    greeting: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: 'center',
        color: '#000'
    },
    errorMessage: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error: {
        color: '#c4302b',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    form: {
        flex: 2,
        marginBottom: 20,
        marginHorizontal: 30
    },
    inputTitle: {
        color: '#8A8F9E',
        fontSize: 10,
        textTransform: 'uppercase'
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F1D',
        backgroundColor: 'transparent'
    },
    button: {
        backgroundColor: '#ffa500',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(21,22,48,0.1)',
        justifyContent: 'center',
        alignItems: 'center',

    },
    addimg: {
        position: 'absolute',
        top: 140,
        left: 210,
        backgroundColor: '#fff',
        height: 33,
        width: 33,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },

})
