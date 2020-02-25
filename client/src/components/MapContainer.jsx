import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_TOKEN } from './googleConfig'

class MapContainer extends Component {
  constructor(props) {
    super(props);

    //  this.loadMap = this.loadMap.bind(this);
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
        />
      </div>
    );
  }
}

MapContainer.propTypes = {
};

export default GoogleApiWrapper({
    apiKey: GOOGLE_TOKEN,
  })(MapContainer);
