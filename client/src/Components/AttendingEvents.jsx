import React, { Component } from 'react';
import axios from 'axios';

<<<<<<< HEAD
class AttendingEvents extends Component {
=======
class UserEvents extends Component {
>>>>>>> 45ecec6a7a1facacaa69a79a26c7783d47768e02
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
              {event.name}
            </li>
          ))}
        </ul>
        {/* HelloWorld */}
      </div>
    );
  }
}
export default UserEvents;
