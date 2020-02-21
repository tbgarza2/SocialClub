import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
  constructor(props) {
    super(props);

     //this.loadMap = this.loadMap.bind(this);
  }
  
  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={8}
          // style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />
      </div>
    );
  }
}

MapContainer.propTypes = {
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDCtfoHWJ8v0Nxrpf8NkhEy6xTxpCPOL3c'
  })(MapContainer);
