import React, { Component } from 'react';
import UserDetail from './UserDetail.jsx';

class EventAttendees extends Component {
  constructor(props) {
    super(props);
    this.showUserProfile = this.showUserProfile.bind(this);
  }

  showUserProfile() {
    console.log(this.props);
    console.log('hi');
    const { viewOtherProfileClick } = this.props;
    viewOtherProfileClick();
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
