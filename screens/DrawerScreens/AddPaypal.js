import React, { Component } from 'react'
import { Text, StyleSheet, View,SafeAreaView } from 'react-native'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

export default class AddPaypal extends Component {
    static navigationOptions={
        title:"Add PayPal"
        }

            state={
            empty:"",
            number: "",
            expiry: "",
            cvc: "",
            type: "", 
            name: "",
            postalCode: ""
            }

    addCard = form => {
        
            this.setState({number:form.values.number})
            this.setState({expiry:form.values.expiry})
            this.setState({cvv:form.values.cvv})
            this.setState({type:form.values.type})
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
             <Text>{this.state.empty}</Text>
             <LiteCreditCardInput onChange={this.addCard}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    }
})
