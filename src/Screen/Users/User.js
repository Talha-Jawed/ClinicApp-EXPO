import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import firebase from '../../Config/Firebase'
import AppHeader from '../../Component/Header/Header';
import Direction from '../../Component/Direction/Direction';
import { Get_Token } from '../../../Redux/actions/authAction'

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Clinics_Name: '',
            value: [],
            Search: '',
            token_no: '',
            info: false,
            notfound: false,
            CurrentUser: this.props.CurrentUser,
            UID: '',
            token: false
        }
    }
    componentWillReceiveProps(props) {
        const { Clinics } = props
        console.log('****', Clinics);

    }
    componentDidMount() {
        const { Clinics } = this.props
        var clinicName = []
        if (Clinics) {
            Clinics.map(item => {
                if (item.ClinicName) {
                    clinicName.push({ name: item.ClinicName, Data: item })
                } else {
                    null
                }
            })
        }
        this.setState({ Clinics_Name: clinicName })
    }

    search() {
        const { Clinics_Name, Search } = this.state
        // console.log('Clinics_Nam==>', Clinics_Name);
        this.setState({ sugg: false })
        Clinics_Name.map(item => {
            if (item.name.indexOf(Search)) {
                const info = item.Data
                this.setState({
                    value: info,
                    token_no: info.Count,
                    info: true,
                    notfound: false,
                    UID: info.UID
                })
                const UID = info.UID
                firebase.database().ref('/UserData/' + UID).on('child_changed', snapShot => {
                    console.log('token ==>', snapShot.val());
                    const val = snapShot.val()
                    this.setState({ token_no: val })
                })
            } else {
                console.log('serach not found');
                this.setState({ notfound: true })
            }
        })
    }
    Token(notification, name) {
        const { CurrentUser, UID } = this.state
        this.props.GetToken(CurrentUser, UID)
        this.setState({ token: true })
        fetch('https://exp.host/--/api/v2/push/send', {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                to: notification,
                body: 'Token Request',
                title: name,
            })
        });
    }

    suggestion(suggName) {
        this.setState({
            sugg: false,
            Search: suggName,
        })
    }

    static navigationOptions = { header: null }

    render() {
        const { value, Search, token_no, info, notfound, token, Clinics_Name, sugg } = this.state

        return (
            <View style={styles.container}>
                <AppHeader LogOut={this.props.navigation} />
                <ScrollView keyboardDismissMode>
                    <View style={{ justifyContent: 'space-around', flexDirection: 'row', paddingTop: 10 }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => this.setState({ Search: e, info: false, sugg: true })}
                            value={Search}
                            returnKeyType='search'
                            placeholder={'Search By Clinic Name'}
                        />
                    </View>
                    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.search()} >
                            <Text style={styles.btn}>{' Search '}</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        sugg &&
                        Clinics_Name.map(item => {
                            return (
                                <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                                    <Text onPress={() => this.suggestion(suggName = item.name)} style={styles.sugg}>{item.name}</Text>
                                </View>
                            )
                        })
                    }

                    {info &&
                        <View>
                            <View style={{ justifyContent: 'space-around', flexDirection: 'row', paddingTop: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{value.ClinicName}</Text>
                            </View>

                            <Text style={styles.info}>{'Since: ' + value.Since}</Text>
                            <Text style={styles.info}>{'Open Time: ' + value.OpenTime}</Text>
                            <Text style={styles.info}>{'Close Time: ' + value.CloseTIme}</Text>

                            <View style={{ justifyContent: 'space-around', flexDirection: 'row', }}>
                                <Text style={{ justifyContent: 'space-around', flexDirection: 'row', fontSize: 18, fontWeight: 'bold' }}>{'Token No: ' + token_no}</Text>
                            </View>


                            <Direction location={value.where} />
                            {token ?
                                <View>
                                    <Text> Token no: PANDIND</Text>
                                </View>
                                :
                                <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.Token(notification = value.expoToken, name = value.Name)} >
                                        <Text style={styles.btn}>{' Get Token '}</Text>
                                    </TouchableOpacity>
                                </View>
                            }

                        </View>
                    }

                    {notfound &&
                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 25 }}>
                            <Text style={{ fontSize: 20 }}>Search Not Found</Text>
                        </View>
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        backgroundColor: 'rgb(230, 240, 255)',
        height: 40,
        width: 300,
        paddingHorizontal: 10,
        fontSize: 18
    },
    btn: {
        color: '#ffff',
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: '#2980b9',
    },
    info: {
        fontWeight: 'bold',
        fontSize: 12,
        padding: 7,
    },
    sugg: {
        width: 300,
        paddingTop: 5,
        paddingBottom:5,
        paddingHorizontal: 10,
        fontSize: 18,
        // borderBottomWidth: 2,
        borderColor: 'rgba(230, 240, 255, 0.7)',
        borderWidth: 1,
        // borderBottomColor: 'rgb(230, 240, 255)'
    }
})


function mapStateToProps(states) {
    return ({
        Clinics: states.authReducers.CLINICS,
        CurrentUser: states.authReducers.CLINICDATA,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        GetToken: (CurrentUser, UID) => {
            dispatch(Get_Token(CurrentUser, UID));
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(User);