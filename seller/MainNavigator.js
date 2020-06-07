import React, { Component } from 'react'
import {
    Text, StyleSheet, TextInput, View, Image, Dimensions, TouchableOpacity,
    ActivityIndicator, Picker, SafeAreaView
} from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import {
    Ionicons, Feather, MaterialIcons, MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome, FontAwesome5
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import Fire from '../Fire'
import UserPermissions from '../UserPermissions'
import firebase from 'firebase'
import Dashboard from './Navigator'
const { height, width } = Dimensions.get('window')

export default class Seller extends Component {
    static navigationOptions = {
        header: 'none'
    }
    state =
        {
            user: {},
            shop: {
                name: '',
                category: '',
                location: '',
                number: '',
                dp: null
            },
            text: '',
            homepage: true,
            profile: false,
            wait: false,
            success: false,
        }

    unsubscribe = null
    componentDidMount() {
        const didFocusSubscription = this.props.navigation.addListener(
            'didFocus', () => {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        this.setState({ profile: true })
                        const userId = this.props.id || Fire.shared.uid
                        this.unsubscribe = Fire.shared.firestore
                            .collection("users")
                            .doc(userId)
                            .onSnapshot(doc => {
                                this.setState({ user: doc.data() })
                            })
                    }
                    else {
                        this.setState({ profile: false })
                    }

                }
                );


            })
    }

    componentWillUnmount() {
        didFocusSubscription.remove();
        this.unsubscribe();
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ shop: { ...this.state.shop, dp: result.uri } })
        }
    }
    createShop = () => {
        this.setState({ wait: true })
        Fire.shared.createShop(this.state.shop)
            .then(() => {
                this.setState({ wait: true })
            })
    }
    render() {
        if (!this.state.profile)
            return (
                <SafeAreaView style={styles.containertemp}>
                    <Image
                        source={require('../assets/shop.png')}
                        style={{ height: width / 1.5, width: width / 1.5 }}
                    />
                    <Text style={{ fontSize: 16, fontFamily: 'sans-serif-light', marginBottom: '5%' }}>To Setup Shop You Must Create Account First !</Text>
                    <TouchableOpacity style={styles.caButton} onPress={() => this.props.navigation.navigate('Profile')}>
                        <Text style={{ fontSize: 18, fontFamily: 'sans-serif-light' }}>Create Account</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            )
        if (this.state.user.seller) {
            return <Dashboard />

        }
        else
            return (
                <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ flex: 0.1, marginTop: 32, }}>
                        <Text style={{
                            fontSize: 18, fontWeight: '800',
                            fontFamily: 'sans-serif-light', marginLeft: 10
                        }}>
                            Create Your Shop</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TextInput
                            placeholder="Name of shop"
                            placeholderTextColor='gray'
                            maxLength={25}
                            onChangeText={name => this.setState({ shop: { ...this.state.shop, name } })}
                            value={this.state.shop.name}
                            style={{
                                width: width / 1.3, height: 40, borderBottomWidth: 0.3, borderColor: 'gray',
                                fontSize: 16,
                            }}
                        />

                        <TextInput
                            placeholder="Select shop category"
                            placeholderTextColor='gray'
                            maxLength={20}
                            onChangeText={category => this.setState({ shop: { ...this.state.shop, category } })}
                            value={this.state.shop.category}
                            style={{
                                width: width / 1.3, height: 40, borderBottomWidth: 0.3, borderColor: 'gray',
                                fontSize: 16, marginTop: 13
                            }}
                        />

                        <TextInput
                            placeholder="Location of shop"
                            placeholderTextColor='gray'
                            maxLength={100}
                            onChangeText={location => this.setState({ shop: { ...this.state.shop, location } })}
                            value={this.state.shop.location}
                            style={{
                                width: width / 1.3, height: 40, borderBottomWidth: 0.3, borderColor: 'gray',
                                fontSize: 16, marginTop: 13
                            }}
                        />

                        <TextInput
                            placeholder="Contact number"
                            placeholderTextColor='gray'
                            maxLength={11}
                            onChangeText={number => this.setState({ shop: { ...this.state.shop, number } })}
                            value={this.state.shop.number}
                            keyboardType='number-pad'
                            style={{
                                width: width / 1.3, height: 40, borderBottomWidth: 0.3, borderColor: 'gray',
                                fontSize: 16, marginTop: 25
                            }}
                        />

                        <View style={{ flexDirection: 'row', width: width / 1.3, height: 40, marginTop: 25, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, color: 'gray' }}>Upload shop cover</Text>
                            <TouchableOpacity onPress={this.pickImage}>
                                <MaterialCommunityIcons name="camera-burst" size={30} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginHorizontal: 32, height: 150 }}>
                            <Image source={{ uri: this.state.shop.dp }} style={{ width: 300, height: 220 }}></Image>
                        </View>

                    </View>
                    <View style={{ flex: 0.2 }}>
                        <TouchableOpacity style={styles.button} onPress={this.createShop}>
                            {this.state.wait
                                ? <ActivityIndicator size="small" color="#fff"></ActivityIndicator>
                                : <Text style={{ color: '#fff', fontWeight: '500' }}>Create Shop</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 32,

    },
    caButton: {
        height: 52,
        width: width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffa500',
        borderRadius: 4,
    },
    containertemp: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        flex: 1,
    },
    button: {
        width: width / 1.1,
        marginHorizontal: 30,
        backgroundColor: '#ffa500',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})




