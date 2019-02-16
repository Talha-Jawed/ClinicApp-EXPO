import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import AppHeader from '../../Component/Header/Header';
import { connect } from 'react-redux'
import Admin from '../../Component/Admin/Admin';

class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btn: true,
        };
    }

    componentDidMount() {
        if (this.props.ClinicData.ClinicName) {
            // console.log('/*/*/*/*/', this.props.ClinicData);
            this.setState({ btn: false })
        }
    }

    Add() {
        this.props.navigation.navigate('ClinicInfo')
    }

    static navigationOptions = { header: null }

    render() {
        const { btn } = this.state
        return (
            <View style={styles.header}>
                <AppHeader LogOut={this.props.navigation} />
                {btn ?
                    <View style={styles.container}>
                        <Button
                            title='Add company'
                            onPress={() => this.Add()}
                        />
                    </View>
                    :
                    <View style={styles.ClinicData}>
                        <Admin />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
    },
    ClinicData: {
        flex: 1
    }

})

function mapStateToProps(states) {
    return ({
        name: states.authReducers.USERNAME,
        UID: states.authReducers.UID,
        ClinicData: states.authReducers.CLINICDATA
    })
}

function mapDispatchToProps(dispatch) {
    return ({

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);