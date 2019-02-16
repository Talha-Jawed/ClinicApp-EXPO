import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import firebase from '../Config/Firebase'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import AppHeader from '../Component/Header/Header'
import { Notifications, Permissions } from 'expo'


async function getToken() {

    // Remote notifications do not work in simulators, only on device
    let { status } = await Permissions.askAsync(
        Permissions.NOTIFICATIONS,
    );
    if (status !== 'granted') {
        return;
    }
    var value = await Notifications.getExpoPushTokenAsync();
    console.log('CurrentToken**', value);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const uid = user.uid;
            firebase.database().ref('UserData/' + uid).update({ expoToken: value })
        }
    })
}
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: ''
        };
    }

    componentDidMount(){
        getToken();
        this.listener = Notifications.addListener(this.handleNotification);
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
    }

    handleNotification = ({ origin, data }) => {
        console.log(
            `Push notification ${origin} with data: ${(data)}`,
        );
    };

    componentWillReceiveProps(props) {
        const { TokenReq ,Clinics } = props
        if (Clinics) {
            setTimeout(() => {
                this.setState({ loading: true , data: Clinics })
            }, 100);
        }
    }

    Compony() {
        this.props.navigation.navigate('Company')
    }

    User() {
        this.props.navigation.navigate('Users')
    }

    static navigationOptions = { header: null }

    render() {
        const { loading, data, Mobile } = this.state
        // console.log('user name hare =>', this.props.name)
        // console.log('user UID =>', this.props.UID)
        // console.log('clinic Data =>', this.props.CurrentUser);
        // console.log('clinics =>', data);
        // console.log('token Req =>', this.props.Clinics);



        return (
            <View  >
                <AppHeader LogOut={this.props.navigation} />
                {loading ?
                    <View>
                        <View>
                            <Button
                                // style={{marginTop: 100}}
                                onPress={() => this.Compony()}
                                title="Register Company"
                                color='black'

                            />
                        </View>
                        <View style={styles.btn}>

                            <Button
                                // style={{marginTop: 100}}
                                onPress={() => this.User()}
                                title="Are you finding/waiting for tokens"
                                color='black'

                            />
                        </View>
                    </View>
                    :
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>

                }
            </View>
        );
    }
}

const styles = StyleSheet.create({

    val: {
        marginBottom: 50,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Number: {
        borderColor: 'gray', borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginTop: 20,
        color: 'black',
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        fontSize: 18
    },
    btn: {
        marginTop: 150,
    }

});

function mapStateToProps(states) {
    return ({
        name: states.authReducers.USERNAME,
        UID: states.authReducers.UID,
        CurrentUser: states.authReducers.CLINICDATA,
        Clinics: states.authReducers.CLINICS,
        TokenReq: states.authReducers.TOKENREQUEST
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // userAuth: (Email, Password) => {
        //     dispatch(userAction(Email, Password));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);