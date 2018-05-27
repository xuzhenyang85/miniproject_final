import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo'

import DataStore from '../facade/DataStore';

var datastore = new DataStore();

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', password: '', friends: [],
            region: { latitude: 55.77016424772061, longitude: 12.511839866638184, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
            locationResult: null,
            location: { coords: { latitude: 55.77016424772061, longitude: 12.5117948 } }
        };
        this.store = datastore;
        this.submit = this.submit.bind(this);
    }

    // bliver kaldt efter komponent er monteret
    componentDidMount() {
        this._getLocationAsync();
    }

    // bliver kaldt alle de gange rendering, udover første gang rendering componentWillUpdate()
    componentDidUpdate(prevProps, prevState) {
        if (prevState.friends != this.state.friends) {
            this.getFriendsCoordinates = this.getFriendsCoordinates.bind(this);
        }
    }

    onRegionChange = region => {
        this.setState({ region });
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
                location,
            });
        };

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location), location, });
    };

    async submit() {
        try {
            const username = this.state.username;
            const password = this.state.password;

            await this.store.login(username, password, (data) => {
                this.setState({ friends: data });
                alert("you are logged ind");
            });
        }
        catch (err) {
            console.log(err);
        }
    };

    getFriendsCoordinates() {
        return this.state.friends.map(function (friend,i) {
            console.log(friend);
            let latlng = {
                latitude: friend.loc.coordinates[1],
                longitude: friend.loc.coordinates[0]
            };
            // render return 
            return (
                <MapView.Marker
                    key={i}
                    coordinate={latlng}
                    title={friend.user}
                    description= "friends"
                />
            )
        })
    }
    render() {
        return (
            <View>
                <Text>Username</Text>
                <TextInput 
                style={{ height: 40, padding: 2 }} 
                onChangeText={(username) => this.setState({ username: username })}
                />

                <Text>Password</Text>
                <TextInput 
                secureTextEntry={true} 
                style={{ height: 40, padding: 2}} 
                onChangeText={(password) => this.setState({ password: password })}
                />

                <Button onPress={this.submit} title='Login' />
                
                <MapView style={{ alignSelf: 'stretch', height: 350 }}
                initialRegion={this.state.region} 
                onRegionChange={this.onRegionChange}>
                
                {this.getFriendsCoordinates()}

                </MapView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
  });
  