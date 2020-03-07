import React from 'react';
import { Link, Switch } from 'react-router-dom';

const UserDetail = ({ user, display }) => (
  <div>
    <Link to={{
      pathname: '/otherprofile',
      state: {
        user,
      },
    }}
    >
      <li style={{ listStyleType: 'none' }}>{user.name}</li>
    </Link>
  </div>
);
// this.props.location.state.user

export default UserDetail;
