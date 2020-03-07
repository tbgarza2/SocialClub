/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import axios from 'axios';

class AttendingEvents extends Component {
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
        <p className="text-center">
          <h3>Your RSVP Events!!</h3>
        </p>
        <ul>
          {this.state.rsvpEvents.map(event => (
            <div>
              <div>
                <button type="button" className="btn btn-info">
                  <li key={event.id} id={event.id} onClick={handleClick}>
                    {event.name}
                  </li>
                </button>
              </div>
              <br />
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
export default AttendingEvents;
