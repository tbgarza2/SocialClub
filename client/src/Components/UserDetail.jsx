/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

const UserDetail = ({ holdClickedUser, user, display }) => (
  <div>
    <div>
      <button type="button" className="btn btn-info">
        <li
          onClick={display}
          holdClickedUser={holdClickedUser}
          style={{ listStyleType: "none" }}
        >
          {user.name}
        </li>
      </button>
    </div>
    <br />
  </div>
);

export default UserDetail;
