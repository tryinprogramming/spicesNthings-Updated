import React, { useState, useEffect, useContext } from 'react'
import { Text, View, Dimensions } from 'react-native'
import HomeScreen from './DrawerScreens/HomeScreen'
import DetailScreen from './DrawerScreens/DetailScreen'
import Wallet from './DrawerScreens/Wallet'
import AddCard from './DrawerScreens/AddCard'
import AddPaypal from './DrawerScreens/AddPaypal'
import History from './DrawerScreens/History'
import Seller from './DrawerScreens/Seller'
import Shop from './DrawerScreens/Shop'
import Profile from './DrawerScreens/Profile'
import Notifications from './DrawerScreens/Notifications'
import Orders from './DrawerScreens/Orders'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import SideBar from './Smalldrawer'
import Login from './DrawerScreens/LoginScreen'
import Register from './DrawerScreens/RegisterScreen'
import Forgot from './DrawerScreens/ForgotScreen'
import Logout from './DrawerScreens/Logout'
import Cart from '../screens/DrawerScreens/Cart'
import Checkout from '../screens/DrawerScreens/Checkout'
import SellerNavigator from '../seller/Navigator'
import SellerMainNavigator from '../seller/MainNavigator'
import { AppLoading } from "expo";
import {
    Ionicons, Feather, MaterialIcons,
    MaterialCommunityIcons,
    Entypo, AntDesign, Foundation, FontAwesome, FontAwesome5
} from '@expo/vector-icons';

import firebase from 'firebase';
import Fire from '../Fire';

import AuthContext from "./AuthContext";
import { createAppContainer } from 'react-navigation'


export default function Navigator() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                console.log(user.uid);
                const userId = user.uid;
                this.unsubscribe = Fire.shared.firestore
                    .collection("users")
                    .doc(userId)
                    .onSnapshot(doc => {
                        setUserInfo(doc.data());
                    })
                setIsAuth(true);
                setIsLoading(false);
            }
            else {
                setIsAuth(false);
                setIsLoading(false);
            }
        }
        );
    }, []);

    const Home = createStackNavigator({
        MainScreen: HomeScreen,
        SubScreen: DetailScreen,
        Login,
        Register,
        Forgot,
        Cart,
        Wallet,
        Checkout,
        Notifications
    })

    const BasicDrawer = createDrawerNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                title: 'Home',
                drawerIcon: ({ tintColor }) => (
                    <Feather name="home" color={tintColor} size={22} />

                )
            }
        },

        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Profile',
                drawerIcon: ({ tintColor }) => (
                    <MaterialIcons name="person" color={tintColor} size={22} />

                )
            }
        },

        Orders: {
            screen: Orders,
            navigationOptions: {
                title: 'Orders',
                drawerIcon: ({ tintColor }) => (
                    <FontAwesome5 name="clipboard-list" color={tintColor} size={22} />

                )
            }
        },

        History: {
            screen: History,
            navigationOptions: {
                title: 'History',
                drawerIcon: ({ tintColor }) => (
                    <MaterialIcons name="history" color={tintColor} size={22} />

                )
            }
        },

        Logout: {
            screen: Logout,
            navigationOptions: {
                title: 'Logout',
                drawerIcon: ({ tintColor }) => (
                    <Entypo name="login" size={22} color="black" />

                )
            }
        },

    },
        {
            initialRouteName: 'Home',
            contentComponent: props => <SideBar {...props} />,
            drawerWidth: Dimensions.get('window').width * 0.65,
            hideStatusBar: true,
            contentOptions: {
                activeBackgroundColor: "rgba(245, 171, 53, 1)",
                activeTintColor: '#000',
                tintColor: '#000',
                itemsContainerStyle: {
                    marginTop: 16,
                    marginHorizontal: 8
                },
                itemStyle: {
                    borderRadius: 4
                }
            },

        }
    );

    const SellerDrawer = createDrawerNavigator({
        Home: {
            screen: SellerNavigator,
            navigationOptions: {
                title: 'Home',
                headerMode: "none",
                drawerIcon: ({ tintColor }) => (
                    <Feather name="home" color={tintColor} size={22} />

                )
            }
        },
        Logout: {
            screen: Logout,
            navigationOptions: {
                title: 'Logout',
                drawerIcon: ({ tintColor }) => (
                    <Entypo name="login" size={22} color="black" />

                )
            }
        },
    }, {
        initialRouteName: 'Home',
        contentComponent: props => <SideBar {...props} />,
        drawerWidth: Dimensions.get('window').width * 0.65,
        hideStatusBar: true,
        contentOptions: {
            activeBackgroundColor: "rgba(245, 171, 53, 1)",
            activeTintColor: '#000',
            tintColor: '#000',
            itemsContainerStyle: {
                marginTop: 16,
                marginHorizontal: 8
            },
            itemStyle: {
                borderRadius: 4
            }
        },

    });


    const Auth = createAppContainer(createStackNavigator({
        Login,
        Register,
        Forgot
    }));

    if (isLoading) {
        return (
            <AppLoading
                onError={console.warn}
            />

        );
    }
    else if (isAuth) {
        const BuyerDrawer = createAppContainer(BasicDrawer);
        const SellerApp = createAppContainer(SellerDrawer);
        console.log(userInfo);
        console.log(userInfo.seller);
        if (userInfo.seller) {
            return (
                <SellerApp />
            );
        }
        return (
            <NavigationContainer>
                <BuyerDrawer />
            </NavigationContainer>
        )
    }
    else {
        return (
            <AuthContext.Provider value={{ isAuth, setIsAuth }}>
                <NavigationContainer>
                    <Auth />
                </NavigationContainer>
            </AuthContext.Provider>
        )
    }
}
