import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity, Picker } from 'react-native';
import firebase from '../../Config/Firebase'
import { StackActions, NavigationActions } from 'react-navigation';
import { ThemeProvider, Header } from 'react-native-elements';

export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);


    }
    componentDidMount() {
        // console.log('navigat', this.props);

    }
    LogOut() {

        firebase.auth().signOut()
        .then(function () {
            console.log('logout***');
            
        })
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LogIn' }),
                // NavigationActions.navigate({ routeName: 'LogIn' }),
            ]
        })
        this.props.LogOut.dispatch(resetAction)

    }

    home() {
        console.log('********');

    }
    render() {
        return (
            <Header
                placement="left"
                rightComponent={{ text: 'LogOut', color: '#fff', onPress: () => this.LogOut() }}
                centerComponent={{ text: 'Home', style: { color: '#fff' } }}
                leftComponent={{ icon: 'home', color: '#fff', onPress: () => this.home() }}
            />
        )
    }
}