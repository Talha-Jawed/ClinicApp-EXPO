import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { black } from 'ansi-colors';
import firebase from '../Config/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { Action, fb_Action, current_User } from '../../Redux/actions/authAction'


class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Password: '',
        };
    }

    componentDidMount() {
        // console.log('props****', this.props);
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home' }),
                        // NavigationActions.navigate({ routeName: 'SignUp' }),
                    ]
                })
                this.props.navigation.dispatch(resetAction)
                const currentUser = user
                this.props.user(currentUser)
            }
        })
    }

    logIn() {
        const { Email, Password } = this.state
        this.props.AuthUser(Email, Password)
        console.log('log');
    }
    SignUp() {
        console.log("sign up page");
        this.props.navigation.navigate('SignUp')
    }

    async logInFB() {

        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Expo.Facebook.logInWithReadPermissionsAsync('307393933208156', {
            permissions: ['public_profile'],
        });
        this.props.fb_User(type, token)
    }
    static navigationOptions = { header: null }
    render() {
        const { Email, Password } = this.state


        return (
            <View style={styles.container} >
                <ScrollView style={styles.body} keyboardDismissMode="interactive">
                    <Text style={styles.Heading}>Log In</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => this.setState({ Email: e })}
                        value={Email}
                        returnKeyType='done'
                        placeholder={'Enter your Email'}
                        placeholderTextColor='rgba(255,255,255,0.7)'

                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(e) => this.setState({ Password: e })}
                        value={Password}
                        placeholder={'Password'}
                        placeholderTextColor='rgba(255,255,255,0.7)'

                    />
                    <View>
                        <TouchableOpacity style={styles.buton} onPress={() => this.logIn()}>
                            <Text style={styles.ButtonText} >Log In</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Button

                        onPress={() => this.SignUp()}
                        title="Creat Accout"
                        color='black'

                    /> */}
                    <TouchableOpacity style={styles.buton} onPress={() => this.SignUp()}>
                        <Text style={styles.ButtonText} >Create Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buton} onPress={() => this.logInFB()}>
                        <Text style={styles.ButtonText} >Facebook LogIn</Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },

    Heading: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 60,
        marginBottom: 85,
        fontSize: 50,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        color: '#ffff',
        textAlign: 'center'
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: 20,
        color: '#fff',
        height: 40,
        width: 300,
        paddingHorizontal: 10,
        fontSize: 18
    },
    buton: {
        alignItems: 'center',
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        marginBottom: 20,
        // width:150,
        // justifyContent: 'space-between',
    },
    ButtonText: {
        fontWeight: 'bold',
        color: "#ffff",
        // alignItems:'center'
        fontSize: 20
    }

});
function mapStateToProps(states) {
    return ({
        // products: states.productReducer.PRODUCTS,

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        AuthUser: (Email, Password) => {
            dispatch(Action(Email, Password));

        },
        fb_User: (type, token) => {
            dispatch(fb_Action(type, token))
        },
        user: (currentUser) => {
            dispatch(current_User(currentUser))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);