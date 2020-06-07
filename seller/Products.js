import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Image, TouchableOpacity,
    TextInput, FlatList, ActivityIndicator, Dimensions, SafeAreaView
} from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { LinearGradient } from 'expo-linear-gradient';
import Fire from '../Fire'
import firebase from 'firebase'
import moment from 'moment'
import ProductDetails from './ProductDetails'
import AddNew from './AddNew'
import EditProduct from './EditProduct'
import {
    Ionicons, Feather, MaterialIcons,
    MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome, FontAwesome5
} from '@expo/vector-icons';
const { height, width } = Dimensions.get('window')

export default class Products extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        user: {},
        isLoading: true,
        post: [],
        inMemoryPosts: [],
        refreshing: false,
        error: '',
        loading: true
    }

    unsubscribe = null

    componentDidMount() {
        const didFocusSubscription = this.props.navigation.addListener(
            'didFocus', () => {
                this.setState({ post: [] })
                try {
                    let id = firebase.auth().currentUser.uid
                    var temp = []
                    this.unsubscribe = Fire.shared.firestore
                        .collection("products")
                        .where('uid', '==', id)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(documentSnapshot => {
                                temp.push(documentSnapshot.data())
                                this.setState({
                                    post: temp, inMemoryPosts: temp
                                })

                            });
                        });

                }
                catch (error) {
                    this.setState({
                        error: error
                    })
                }
            })
    }


    refreshFeed = () => {
        this.setState({ refreshing: true })
        try {
            let id = firebase.auth().currentUser.uid
            var temp = []
            this.unsubscribe = Fire.shared.firestore
                .collection("products")
                .where('uid', '==', id)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        temp.push(documentSnapshot.data())
                        this.setState({
                            post: temp, refreshing: false
                        })

                    });
                });

        }
        catch (error) { }
    }

    searchPost = (value) => {
        const filteredResult = this.state.inMemoryPosts.filter(
            post => {
                let postLowerCase = post.name.toLowerCase()
                let searchTermLowerCase = value.toLowerCase()

                return postLowerCase.indexOf(searchTermLowerCase) > -1
            }
        )

        this.setState({ post: filteredResult })
    }

    render() {
        setTimeout(() => { this.setState({ loading: false }) }, 5000)

        return (
            <SafeAreaView style={{ marginTop: 32 }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: width / 22,
                    marginBottom: 20
                }}>
                    <Text style={{ color: '#000', fontFamily: 'sans-serif-light', fontSize: 20, fontWeight: '500' }}>Products</Text>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddNew')}>
                        <LinearGradient
                            colors={['#EE9617', '#FE5858']}
                            start={[0.0, 0.5]} end={[1.0, 0.5]}
                            locations={[0.0, 1.0]}
                            style={{
                                width: 100,
                                height: 40,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text style={{ color: '#fff', fontFamily: 'sans-serif-light', fontSize: 16 }}>
                                Add new</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

                <View style={{
                    alignSelf: 'center', flexDirection: 'row', width: width / 1.1,
                }}>
                    <TextInput
                        placeholder="Search"
                        style={{
                            width: width / 1.24, height: 45, paddingHorizontal: 10, borderWidth: 1, borderColor: '#dedede',
                            borderTopLeftRadius: 5, borderBottomLeftRadius: 5
                        }}
                        onChangeText={(value) => this.searchPost(value)}
                    />
                    <LinearGradient
                        colors={['#EE9617', '#FE5858']}
                        start={[0.0, 0.5]} end={[1.0, 0.5]}
                        locations={[0.0, 1.0]}
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 5,
                            marginLeft: -4,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >

                        <TouchableOpacity>
                            <AntDesign name="search1" size={20} color="#fff" />
                        </TouchableOpacity>


                    </LinearGradient>
                </View>
                <FlatList
                    data={this.state.post}
                    numColumns={2}
                    ListEmptyComponent={() =>
                        <View style={styles.emptyfeed}>
                            <Text style={styles.emptyfeedtext}>Nothing to show</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontWeight: '200', color: '#dedede', fontSize: 12 }}>Pull down to refresh </Text>
                                <AntDesign name="arrowdown" size={12} color="#dedede" />
                            </View>

                        </View>}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refreshFeed}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails', { item: item })}>

                                <View style={styles.productContainer}>
                                    <Image
                                        style={styles.productImage}
                                        source={item.dp ? { uri: item.dp } : require('../assets/icon.png')}
                                    />
                                    <View style={styles.productDetails}>
                                        <Text style={styles.productTitle}>{item.name}</Text>
                                        <Text style={styles.productCategory}>{item.category}</Text>
                                        <Text style={styles.productPrice}>Rs.{item.price}</Text>
                                        <Text style={styles.productDate}>{moment(item.createdAt).fromNow()}</Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        )
                    }}
                />
            </SafeAreaView>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 32,
    },
    productContainer: {
        width: width / 2.5,
        margin: 20,
    },
    productImage: {
        height: width / 2,
        width: width / 2.5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    productDetails: {
        height: width / 3.5,
        width: width / 2.5,
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#f5f5f5'
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '500',
    },
    productDate: {
        fontSize: 12,
        fontWeight: '100'
    },
    emptyfeed: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 100
    },
    emptyfeedtext: {
        fontSize: 16,
        fontWeight: '200',
        color: '#dedede'
    },
    header: {
        marginTop: 45,
        marginHorizontal: 30
    },
    body: {
        marginTop: 20,
        marginLeft: 30
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    heading: {
        fontSize: 26,
        color: '#b284be',
        fontFamily: 'sans-serif-medium'
    },
    sub_heading: {
        fontSize: 20,
        color: '#b284be',
        fontFamily: 'sans-serif-medium'
    },
})
