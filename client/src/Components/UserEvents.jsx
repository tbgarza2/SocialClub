/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';


class UserEvents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p className="text-center">
          <h3>Events You Created</h3>
        </p>
        <ul>
          {this.props.events.map(event => (
            <div>
              <div>
                <button type="button" className="btn btn-info">
                  <li
                    key={event.id}
                    id={event.id}
                    onClick={this.props.handleClick}
                  >
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
export default UserEvents;
