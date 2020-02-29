import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import { GOOGLE_TOKEN } from './googleConfig'
// import Marker from './Marker';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: props.events || [],
      eventCords: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };

    this.convertAddress = this.convertAddress.bind(this);
    this.loadCords = this.loadCords.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);

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
            let eventCords = Object.assign({}, prevState.eventCords);
            eventCords[event.id] = cords;              
            return { eventCords };
          })
        })
        .catch((err) => {
          console.log(err)
        });
    });
  }

  onMarkerClick(props, marker, e) {
    console.log('clicked')
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: !this.state.showingInfoWindow
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  
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
          onClick={this.onMapClicked}
        >
          {this.state.events.map(event => <Marker onClick={this.onMarkerClick} key={event.id}  position={eventCords[event.id]}/>)}
          <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
              <div>
                <h1>INFOWINDOW</h1>
              </div>
            </InfoWindow>
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
