import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, Platform, TouchableOpacity, Alert } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { geodesy, distance, latitude, longitude, elevation, geolocation, geodistance, geojson, geospatial, lbs, location } from 'geolib'
import { Constants, Location, Permissions } from 'expo';
import { connect } from 'react-redux'
import { _submit } from '../../../Redux/actions/authAction'
import { StackActions, NavigationActions } from 'react-navigation';


class ClinicLocation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            markers: '',
            ready: false,
            where: { lat: null, lng: null },
            error: null,
            location: null,
            errorMessage: null,
            get: false,
            ClinicName: this.props.navigation.state.params.Name,
            Since: this.props.navigation.state.params.Since,
            OpenTime: this.props.navigation.state.params.openTime,
            CloseTIme: this.props.navigation.state.params.closeTime,
            Certificates: this.props.navigation.state.params.Certificates,
            UID: ''
        }
    }
    componentDidMount() {
        this.setState({ UID: this.props.UID })
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            location,
            where: { lat: location.coords.latitude, lng: location.coords.longitude },
            get: true
        });
    };


    Submit() {
        const { UID, ClinicName, Since, OpenTime, CloseTIme, Certificates, where } = this.state
        console.log('submit***');
        Alert.alert('Registerd')
        this.props.submit(UID, ClinicName, Since, OpenTime, CloseTIme, Certificates, where)
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LogIn' }),
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        const { ClinicName, Certificates, OpenTime, CloseTIme, Since, where, UID, get } = this.state
        console.log('****', UID, ClinicName, Since, OpenTime, CloseTIme, Certificates, where);
        return (
            <View>
                <View style={styles.container}>

                    {get === true &&
                        this.MapComponent()
                    }
                </View>
                <View style={{ marginTop: 400 }}>
                    <TouchableOpacity style={styles.buton} onPress={() => this.Submit()}>
                        <Text style={styles.ButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    MapComponent() {
        const { coordinate_lat, coordinate_lng, positionx, positiony, coordinate, where, location, get } = this.state
        console.log('cordinates***', where);
        return (
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: where.lat,
                    longitude: where.lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <MapView.Marker
                    draggable
                    coordinate={{
                        latitude: where.lat,
                        longitude: where.lng,
                    }}
                    onDragEnd={e => this.setState({
                        where: { lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude }
                    })}
                />

            </MapView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buton: {
        alignItems: 'center',
        backgroundColor: '#2980b9',
        justifyContent: 'space-around',
        // width: 80,
        height: 40
        // justifyContent: 'space-between',
    },
    ButtonText: {
        fontWeight: 'bold',
        color: "#ffff",
        // alignItems:'center'
        fontSize: 20
    },

});

function mapStateToProps(states) {
    return ({
        UID: states.authReducers.UID
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        submit: (UID, ClinicName, Since, OpenTime, CloseTIme, Certificates, where) => {
            dispatch(_submit(UID, ClinicName, Since, OpenTime, CloseTIme, Certificates, where));

        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ClinicLocation);