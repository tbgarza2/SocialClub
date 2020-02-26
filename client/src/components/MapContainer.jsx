import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { GOOGLE_TOKEN } from './googleConfig'
// import Marker from './Marker';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: props.markers || [],
    };
  }
  
  render() {

    const styles = {
      map: {
        margin:'50px'
      }
    }

    return (
      <div>
        <Map
          style={styles.map}
          google={this.props.google}
          zoom={8}
          minZoom={2}
          maxZoom={15}
          // style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
          disableDefaultUI={true}
        >
          {this.state.markers.map(marker => <Marker position={marker.position}/>)}
        </Map>
      </div>
    );
  }
}

MapContainer.propTypes = {
};

export default GoogleApiWrapper({
    apiKey: GOOGLE_TOKEN,
  })(MapContainer);
