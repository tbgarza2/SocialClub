import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { GOOGLE_TOKEN } from './googleConfig'
// import Marker from './Marker';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: props.events || [],
      eventCords: {}
    };

    this.convertAddress = this.convertAddress.bind(this);
    this.loadCords = this.loadCords.bind(this);

    this.loadCords();
  }

  convertAddress(address) {
    return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: address}, (results, status) => {
            if (status === 'OK') {
                let lat = results[0].geometry.location.lat();
                let lng = results[0].geometry.location.lng();
                resolve({lat: lat, lng: lng});
            } else {
                reject(status);
            }    
        });    
    });
  };

  loadCords() {
    this.state.events.forEach(event => {
      this.convertAddress(event.address)
        .then((cords) => {
          this.setState(prevState => {
            let eventCords = Object.assign({}, prevState.eventCords);  // creating copy of state variable jasper
            eventCords[event.id] = cords;                     // update the name property, assign a new value                 
            return { eventCords };                                 // return new object jasper object
          })
        })
        .catch((err) => {
          console.log(err)
        });
    });
  }
  
  render() {
    const styles = {
      map: {
        margin:'50px',
        position: 'absolute',
        top: '50px'
      }
    }
    const { eventCords } = this.state;
    return (
      <div className='map'>
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
          {this.state.events.map(event => <Marker position={eventCords[event.id]}/>)}
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
