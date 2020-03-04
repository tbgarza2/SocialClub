import React, { Component } from 'react';
import axios from 'axios';
import UserDetail from './UserDetail.jsx';

class EventAttendees extends Component {
  constructor(props) {
    super(props);
    this.showUserProfile = this.showUserProfile.bind(this);
  }

  showUserProfile() {
    console.log('clicked on a name');
  }

  render() {
    const { rsvpUsers } = this.props;
    return (
      <div>
        <h3>RSVP LIST</h3>
        {rsvpUsers.map(user => (
          <UserDetail
            key={user.id}
            user={user}
            display={this.showUserProfile}
          />
        ))}
      </div>
    );
  }
}
export default EventAttendees;
