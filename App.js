import React, { Component } from 'react'
import LoadingScreen from './screens/LoadingScreen'
import Home from './screens/Navigator'
import { decode, encode } from 'base-64'
global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }



export default class App extends Component {
  render() {
    return (
      <Home/>
    )
  }
}




