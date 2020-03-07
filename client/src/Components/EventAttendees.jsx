import React, { Component } from 'react';
import UserDetail from './UserDetail.jsx';

class EventAttendees extends Component {
  constructor(props) {
    super(props);
    this.showUserProfile = this.showUserProfile.bind(this);
  }

  bringUser() {
    const { holdClickedUser } = this.props;
    holdClickedUser();
  }

  showUserProfile() {
    console.log(this.props);
    // console.log('hi');
    const { viewOtherProfileClick } = this.props;
    viewOtherProfileClick();
    this.bringUser();
  }

  render() {
    const { rsvpUsers } = this.props;
    return (
      <div>
        <p className="text-center">
          <h3>RSVP LIST</h3>
        </p>
        {rsvpUsers.map(user => (
          <UserDetail
            // holdClickedUser={holdClickedUser}
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
