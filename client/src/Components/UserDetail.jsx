/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Link, Switch } from 'react-router-dom';

const UserDetail = ({ holdClickedUser, user, display }) => (
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
