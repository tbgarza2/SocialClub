import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class UserEvents extends Component {
  constructor(props) {
    super(props);
    this.State = {
      userEvents: [],
    };
  }

  // UNSAFE_componentWillMount() {
  //   if (localStorage.getItem('userEvents')) {
  //     this.setState({
  //       events: JSON.parse(localStorage.getItem('userEvents')),
  //     });
  //   }
  // }

  // componentDidMount() {
  //   if (!localStorage.getItem('userEvents')) {
  //     this.setState({
  //       events: this.props.userEvents,
  //     });
  //   }
  // }

  // UNSAFE_componentWillUpdate(nextProps, nextState) {
  //   localStorage.setItem('userEvents', JSON.stringify(nextState.events));
  // }

  render() {
    const events = this.props.userEvents || this.state.userEvents;
    return (
      <div>
        <h3>Events You Created</h3>
        <ul>
          {events.map((event, index) => (
            <Link to={{
              pathname: `/${event.id}`,
              state: {
                eventID: event.id,
              },
            }}
            >
            <li key={event.id} id={event.id} onClick={this.props.handleClick}>
              {event.name}
            </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}
export default UserEvents;
