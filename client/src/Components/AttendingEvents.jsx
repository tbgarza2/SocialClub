import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

class UserEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rsvpEvents: [],
    };
  }

  componentDidMount() {
    this.getrsvpEvents();
  }

  getrsvpEvents() {
    const { userId } = this.props;
    axios(`/api/rsvp/rsvp/${userId}`)
      .then(res => {
        console.log("grabbed your RSVP'd");
        this.setState({ rsvpEvents: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { handleClick } = this.props;
    return (
      <div>
        <h3>Your RSVP Events!!</h3>
        <ul>
          {this.state.rsvpEvents.map(event => (
            <li key={event.id} id={event.id} onClick={handleClick}>
              <Link to={{
                pathname: `/${event.id}`,
                state: {
                  eventID: event.id,
                },
              }}
              >
                {event.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* HelloWorld */}
      </div>
    );
  }
}
export default UserEvents;
