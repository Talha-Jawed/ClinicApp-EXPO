import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity, Picker } from 'react-native';
import { ThemeProvider, Header ,Avatar } from 'react-native-elements';
export default class AppAvater extends React.Component {
    constructor(props) {
        super(props);


    }
    render() {
        return (
            <Avatar
                size="medium"
                rounded
                title="+"
                onPress={this.props.onPress}
                activeOpacity={0.5}
                placeholderStyle={{ backgroundColor: '#ff99cc', opacity:0.2 }}
                
              />
        )
    }
}