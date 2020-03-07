import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Map, GoogleApiWrapper, Marker, InfoWindow,
} from 'google-maps-react';
import axios from 'axios';
import { GOOGLE_TOKEN } from './googleConfig';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventCords: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      filterByAddress: 'All',
      filterByEvent: 'All',
    };

    this.convertAddress = this.convertAddress.bind(this);
    this.loadCords = this.loadCords.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.handleJoinClick = this.handleJoinClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
    this.getAllEvents = this.getAllEvents.bind(this);
    this.handleFilterAddress = this.handleFilterAddress.bind(this);
    this.handleFilterEvent = this.handleFilterEvent.bind(this);
  }

  componentDidMount() {
    this.getAllEvents();
  }

  onMarkerClick(props, marker) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: !this.state.showingInfoWindow,
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  onInfoWindowOpen(props, e) {
    const { selectedPlace, activeMarker } = this.state;
    const infoWindow = (
      <div>
        <h3>{selectedPlace.name}</h3>
        <p>Address: {selectedPlace.address}</p>
        <p>Time: {selectedPlace.time}</p>
        <p>Category: {selectedPlace.category}</p>
        <p>Summary: {selectedPlace.summary}</p>
        <button onClick={this.handleJoinClick}>JOIN</button>
        <button
          onClick={() => {
            this.handleViewClick({ target: { id: activeMarker.id } });
          }}
        >
          VIEW EVENT
        </button>
      </div>
    );
    ReactDOM.render(
      React.Children.only(infoWindow),
      document.getElementById('iwc'),
    );
  }

  getAllEvents() {
    axios.get('api/event/events').then(events => {
      this.setState({
        events: events.data,
      });
      this.loadCords();
    });
  }

  convertAddress(address) {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          resolve({ lat, lng });
        } else {
          reject(status);
        }
      });
    });
  }

  loadCords() {
    this.state.events.forEach(event => {
      this.convertAddress(event.address)
        .then(cords => {
          this.setState(prevState => {
            const eventCords = { ...prevState.eventCords };
            eventCords[event.id] = cords;
            return { eventCords };
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  handleJoinClick() {
    const eventId = this.state.activeMarker.id;
    const { userId } = this.props;
    axios.post(`/api/rsvp/rsvp/${eventId}/${userId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch(res => {
        console.log(res.data);
      });
  }

  handleFilterAddress(event) {
    this.setState({ filterByAddress: event.target.value });
  }

  handleFilterEvent(event) {
    this.setState({ filterByEvent: event.target.value });
  }

  handleViewClick(eventId) {
    this.props.viewSummary(eventId);
  }

  render() {
    const styles = {
      map: {
        margin: '15px',
        position: 'absolute',
        top: '50px',
      },
    };
    const { google } = this.props;
    const { eventCords, activeMarker, showingInfoWindow, events, filterByAddress, filterByEvent } = this.state;
    const addresses = events.map(event => {
      const arr = event.address.split(',');
      const address = arr[0].trim();
      return address;
    });
    const cities = events.map(event => {
      const arr = event.address.split(',');
      const city = arr[1].trim();
      return city;
    });
    const states = events.map(event => {
      const arr = event.address.split(',');
      const state = arr[arr.length - 1].trim().slice(0, 2);
      return state;
    });
    const categories = events.map(event => event.category);

    return (
      <div>
        <div className="d-flex flex-md-row">
          <h2>Filter Map</h2>
          <div className="form-group">
            <label className="control-label" htmlFor="category">Address</label>
            <div>
              <select id="address" name="address" value={filterByAddress} onChange={this.handleFilterAddress}>
                <option value="All">All</option>
                {[...new Set(addresses)].map(address => <option value={address} key={address}>{address}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="category">City</label>
            <div>
              <select id="city" name="city" value={filterByAddress} onChange={this.handleFilterAddress}>
                <option value="All">All</option>
                {[...new Set(cities)].map(city => <option value={city} key={city}>{city}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
           <label className="control-label" htmlFor="category">State</label>
            <div>
              <select id="state" name="state" value={filterByAddress} onChange={this.handleFilterAddress}>
                <option value="All">All</option>
                {[...new Set(states)].map(state => <option value={state} key={state}>{state}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="category">Event</label>
            <div>
              <select id="event" name="event" value={filterByEvent} onChange={this.handleFilterEvent}>
                <option value="All">All</option>
                {[...new Set(categories)].map(category => <option value={category} key={category}>{category}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="map">
          <Map
            style={styles.map}
            google={google}
            zoom={10}
            minZoom={2}
            maxZoom={15}
            // style={mapStyles}
            initialCenter={{ lat: 29.969, lng: -90.0733 }}
            disableDefaultUI
            onClick={this.onMapClicked}
          >
            {events
              .filter(event => (filterByAddress !== 'All' ? event.address.includes(filterByAddress) : event))
              .filter(event => (filterByEvent !== 'All' ? event.category.includes(filterByEvent) : event))
              .map(event => <Marker id={event.id} address={event.address} time={event.time} category={event.category} summary={event.summary} name={event.name} onClick={this.onMarkerClick} key={event.id} position={eventCords[event.id]} />)}
            <InfoWindow
              marker={activeMarker}
              visible={showingInfoWindow}
              onOpen={e => {
                this.onInfoWindowOpen(this.props, e);
              }}
            >
              <div id="iwc" />
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

MapContainer.propTypes = {
};

export default GoogleApiWrapper({
  apiKey: GOOGLE_TOKEN,
})(MapContainer);
