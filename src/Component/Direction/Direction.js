import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, Platform } from 'react-native';
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';
import MapViewDirections from 'react-native-maps-directions';

class Direction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // location: this.props.location,
            markers: '',
            ready: false,
            where: { lat: null, lng: null },
            error: null,
            location: null,
            errorMessage: null,
            get: false,
            currentLocation:{ lat: null, lng: null },
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
        console.log('this=>', this.props.location);
        const clinicLocation = this.props.location
        this.setState({
            where: { lat: clinicLocation.lat, lng: clinicLocation.lng },
        })

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
            currentLocation: { lat: location.coords.latitude, lng: location.coords.longitude },
            get: true
        });
    };
    direction() {
        console.log('====');

    }

    render() {
        const { get } = this.state

        return (
            <View style={styles.container}>

                {get ?
                    this.renderMap()
                    :
                    alert('Please Turn On Your Location')
                }
            </View>
        )
    }

    renderMap() {
        const { location, where  , currentLocation} = this.state
        const origin = { latitude: currentLocation.lat, longitude: currentLocation.lng };
        const destination = { latitude: where.lat, longitude: where.lng };
        const GOOGLE_MAPS_APIKEY = 'AIzaSyBk240sna4zQbpAobnYjCQDfSmS0ZJegT8';
        return (
            <View style={styles.container}>
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
                        // draggable
                        coordinate={{
                            latitude: where.lat,
                            longitude: where.lng,
                        }}
                    // onDragEnd={e => this.setState({
                    //     where: { lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude }
                    // })}
                    />
                    <MapView.Marker
                        // draggable
                        coordinate={{
                            latitude: currentLocation.lat,
                            longitude: currentLocation.lng,
                        }}
                    
                    />
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                    />
                </MapView>
                <Button
                    title='Direction'
                    onPress={() => this.direction()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        height: 350,
        width: 350,
        // justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(Direction);