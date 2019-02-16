import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { userAction } from '../../Redux/actions/authAction'


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstName: '',
            LastName: '',
            Mobile: '',
            Email: '',
            Password: '',
        };
    }

    SignUp() {
        const { FirstName, LastName, Mobile, Email, Password } = this.state
        if (FirstName.length < 3 || LastName.length < 3) {
            alert('Something went wrong')
        }
        else if (!(/^(?:\+\d{2})?\d{11}(?:,(?:\+\d{2})?\d{11})*$/.test(Mobile))) {
            alert('invalid Mpbile No#')
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email))) {
            alert('Invalid Email')
        }
        else if (Password.length < 4) {
            alert('Week Password')
        }
        else {
            console.log('log');
            this.props.userAuth(FirstName, LastName, Mobile, Email, Password)
        }

    }

    render() {
        const { FirstName, LastName, Mobile, Email, Password, } = this.state

        return (
            // <View   >
            <KeyboardAvoidingView behavior='position' style={styles.container}>

                <ScrollView >

                    <Text style={styles.Heading}>Sign Up</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => this.setState({ FirstName: e })}
                        value={FirstName}
                        placeholder={'Enter your First Name'}
                        placeholderTextColor='rgba(255,255,255,0.7)'

                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => this.setState({ LastName: e })}
                        value={LastName}
                        placeholder={'Enter your Last Name'}
                        placeholderTextColor='rgba(255,255,255,0.7)'

                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => this.setState({ Mobile: e })}
                        value={Mobile}
                        placeholder={'Enter your Mobile No#'}
                        placeholderTextColor='rgba(255,255,255,0.7)'

                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => this.setState({ Email: e })}
                        value={Email}
                        placeholder={'Enter your Email'}
                        placeholderTextColor='rgba(255,255,255,0.7)'
                    />
                    <TextInput
                        // style={{height: 40, borderColor: 'gray', borderWidth: 1 , width:'75%'}}
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(e) => this.setState({ Password: e })}
                        value={Password}
                        placeholder={'Password'}
                        placeholderTextColor='rgba(255,255,255,0.7)'

                    />
                    <View>

                        {/* <Button
                            onPress={() => this.SignUp()}
                            title="Sign Up"
                            color='black'

                        /> */}
                    </View>
                    <TouchableOpacity style={styles.buton} onPress={() => { this.SignUp() }}>
                        <Text style={styles.ButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </ScrollView>

            </KeyboardAvoidingView>
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 20,
        // opacity:0.9
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
        // margin: 10,
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
        userAuth: (FirstName, LastName, Mobile, Email, Password) => {
            dispatch(userAction(FirstName, LastName, Mobile, Email, Password));
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);