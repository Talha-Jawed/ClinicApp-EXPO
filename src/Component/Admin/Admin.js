import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Token_No } from '../../../Redux/actions/authAction'

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Clinic_Name: this.props.ClinicData.ClinicName,
            Since: this.props.ClinicData.Since,
            openTime: this.props.ClinicData.OpenTime,
            closeTime: this.props.ClinicData.CloseTIme,
            Dr_Name: this.props.ClinicData.Name,
            UID: this.props.UID,
            Count: null,
            // TokenReq: this.props.TokenReq.CurrentUser.Name,
            Req: false,
            tokenGen: '',
            TokenName: false,
            status: false,
            request: []
        }
    }

    componentDidMount() {
        // const Data = this.props.TokenReq.CurrentUser.Name
        const request = []
        const { Count } = this.props.ClinicData;
        if (Count) {
            this.setState({ Count })
        } else {
            null
        }
        // console.log('====/=>', Data);
        const { TokenReq } = this.props
        if (TokenReq) {
            TokenReq.map(item => {
                // console.log('requestToken==>', item.Name);
                request.push(item)
                this.setState({
                    TokenName: false,
                    // TokenReq: item.Name
                    request: request
                })
            })
        }
    }


    componentWillReceiveProps(props) {
        const { TokenReq } = props;

        if (TokenReq) {
            setTimeout(() => {
                console.log('TokenWill', TokenReq)
            }, 100)
        }
    }

    componentDidUpdate() {
        const { Count, UID } = this.state
        this.props.Counter(Count, UID)

    }

    count() {
        const { Count, UID } = this.state
        const add = Count + 1
        this.setState({ Count: add })
    }

    reset() {
        this.setState({ Count: 0 })
    }

    reqToken(item, index) {
        console.log('===>>', item);
        this.setState({ Req: true, indexNum: index })
    }

    GenToken(index) {

        const { request, tokenGen } = this.state

        request[index].tokenNo = tokenGen

            this.setState({
                // Req: false,
                tokenGen: '',
                request,
                // TokenName: true
                tokenIndex: index
            })
    }

    Accept() {
        this.setState({
            TokenStatus: 'Accept',
            status: true,
            TokenName: false
        })
    }

    Expire() {
        this.setState({
            TokenStatus: 'Expire',
            status: true,
            TokenName: false
        })
    }

    render() {
        const { Clinic_Name, Since, openTime, closeTime, TokenName, Count, TokenReq, tokenIndex, tokenGen, indexNum, Req, status, TokenStatus, request } = this.state
        console.log('===>>', request);

        return (
            <ScrollView>

                <View>
                    <View style={styles.counter}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Token No: {Count}</Text>
                        <Text onPress={() => this.count()} style={{ backgroundColor: '#2980b9', fontSize: 18, color: '#ffff' }}>{' Add '}</Text>
                        <Text onPress={() => this.reset()} style={{ backgroundColor: '#ff1a1a', fontSize: 18, color: '#ffff' }}>{' Reset '}</Text>
                    </View>
                    <Text style={styles.text}>Clinic Name: {Clinic_Name}</Text>
                    <Text style={styles.text}>Since: {Since}</Text>
                    <Text style={styles.text}>Open Time: {openTime}</Text>
                    <Text style={styles.text}>Close Time: {closeTime}</Text>
                    {/* <Text>Dr. Name {Dr_Name}</Text> */}
                    <View>
                        <View >

                            {
                                request.map((item, index) => {

                                    return (

                                        !TokenName &&
                                            !item.tokenNo ?
                                            < View >
                                                {
                                                    !status ?
                                                        // indexNum !== index ?
                                                        <View style={styles.counter}>
                                                            <Text onPress={() => this.reqToken(item, index)} style={{ fontSize: 20, fontWeight: 'bold' }}>{item.Name}</Text>
                                                            {
                                                                Req &&
                                                                indexNum === index &&
                                                                <View style={styles.counter}>
                                                                    <TextInput
                                                                        style={styles.input}
                                                                        onChangeText={(e) => this.setState({ tokenGen: e })}
                                                                        value={tokenGen}
                                                                        autoFocus
                                                                        keyboardType='numeric'
                                                                    />
                                                                    <View>
                                                                        <TouchableOpacity onPress={() => this.GenToken(index)} >
                                                                            <Text style={styles.btn}>{' Send '}</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                                // :
                                                                // <View style={styles.counter}>
                                                                //     <Text style={styles.text} >{item.Name + ':' + ' ' + tokenGen}</Text>
                                                                //     <Text style={styles.text}>{TokenStatus}</Text>
                                                                // </View>
                                                            }
                                                        </View>
                                                        :
                                                        indexNum === index &&
                                                        <View style={styles.counter}>
                                                            <Text style={styles.text} >{item.Name + ':' + ' ' + tokenGen}</Text>
                                                            <Text style={styles.text}>{TokenStatus}</Text>
                                                        </View>
                                                }
                                            </View>
                                            :
                                            <View style={styles.counter}>
                                                <Text style={styles.text} >{item.Name + '#' + ' ' + item.tokenNo}</Text>
                                                <Text onPress={() => this.Accept()} style={{ backgroundColor: '#2980b9', fontSize: 18, color: '#ffff' }}>{' Accept '}</Text>
                                                <Text onPress={() => this.Expire()} style={{ backgroundColor: '#ff1a1a', fontSize: 18, color: '#ffff' }}>{' Expire '}</Text>
                                            </View>
                                    )
                                })
                            }
                        </View>
                        {/* {
                            Req &&
                            <View style={styles.counter}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(e) => this.setState({ tokenGen: e })}
                                    value={tokenGen}
                                    autoFocus
                                    keyboardType='numeric'
                                />
                                <View>
                                    <TouchableOpacity onPress={() => this.GenToken()} >
                                        <Text style={styles.btn}>{' Send '}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        } */}
                    </View>
                    <View style={styles.container}>

                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            region={{
                                latitude: 24.964860840139554,
                                longitude: 67.06739690154791,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                        >
                            <MapView.Marker
                                // draggable
                                coordinate={{
                                    latitude: 24.964860840139554,
                                    longitude: 67.06739690154791,
                                }}
                            // onDragEnd={e => this.setState({
                            //     where: { lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude }
                            // })}
                            />

                        </MapView>

                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        height: 200,
        width: 200,
        // justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 12,
        padding: 7,
    },
    counter: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    input: {
        backgroundColor: 'rgb(230, 240, 255)',
        height: 40,
        width: 60,
        paddingHorizontal: 10,
        fontSize: 18
    },
    btn: {
        color: '#ffff',
        fontSize: 22,
        // fontWeight: 'bold',
        backgroundColor: '#2980b9',
    },
})

function mapStateToProps(states) {
    return ({
        name: states.authReducers.USERNAME,
        UID: states.authReducers.UID,
        ClinicData: states.authReducers.CLINICDATA,
        TokenReq: states.authReducers.TOKENREQUEST
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        Counter: (Count, UID) => {
            dispatch(Token_No(Count, UID));
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);