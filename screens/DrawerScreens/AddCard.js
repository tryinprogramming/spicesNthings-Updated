import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView } from 'react-native'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

export default class AddCard extends Component {
    static navigationOptions={
        title:"Add Credit/Debit Card"
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
            <CreditCardInput onChange={this.addCard}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
