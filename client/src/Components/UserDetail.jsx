import React from 'react';

const UserDetail = ({ user, display }) => (
  <div>
    <li style={{ listStyleType: 'none' }}>{user.name}</li>
    <button onClick={display}>Profile</button>
  </div>
);

export default UserDetail;
