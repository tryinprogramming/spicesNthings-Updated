import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs'
import Shop from './Shop'
import EditShop from './EditShop'
import Products from './Products'
import ProductDetails from './ProductDetails'
import AddNew from './AddNew'
import EditProduct from "./EditProduct"
import Notifications from "../screens/DrawerScreens/Notifications";
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const Home= createStackNavigator({
  MainScreen: Shop,
  EditShop,
  Notifications
}, {
  headerMode: "none"
})

const Product= createStackNavigator({
  Products,
  ProductDetails,
  AddNew,
  EditProduct
})

export default createBottomTabNavigator(
  {
    Home,
    Product
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MaterialCommunityIcons;
        let iconName;
        if (routeName === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline'
          //add badges to some icons.

        } else if (routeName === 'Product') {
          iconName = focused
            ? 'package-variant'
            : 'package-variant-closed'

        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
    },
  }
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
