import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class Gps extends Component {
  state = {
    mapRegion: { latitude: 55.771367, longitude: 12.514266, latitudeDelta: 0.0422, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 55.771367, longitude: 12.514266}},
  };
  
  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location, });
 };

  _handleButtonPress = () => {
    Alert.alert(
      'Button pressed!',
      'You did it!',
    );
  };

  render() {
    return (
      <View style={styles.container}>

        <MapView style={{ alignSelf: 'stretch', height: 400 }}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0422, longitudeDelta: 0.0421 }}
          //onRegionChange={this._handleMapRegionChange}
        >

          <MapView.Marker
            coordinate={this.state.location.coords}
            title="My Marker"
            description= {"Lat: " + this.state.location.coords.latitude + " Long:" + this.state.location.coords.longitude}
          />

        </MapView>

        <Button
          title="Press me"
          onPress={this._handleMapRegionChange}
        />

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
