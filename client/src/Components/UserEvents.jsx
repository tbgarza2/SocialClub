import React, { Component } from 'react';


class UserEvents extends Component {
  constructor(props) {
    super(props);
    this.State = {
      events: [],
    };
  }

  UNSAFE_componentWillMount() {
    if (localStorage.getItem('events')) {
      this.setState({
        events: JSON.parse(localStorage.getItem('events')),
      });
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('events')) {
      this.setState({
        events: this.props.events,
      });
    }
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('events', JSON.stringify(nextState.events));
  }

  render() {
    const events = this.props.events || this.state.events;
    return (
      <div>
        <h3>Events You Created</h3>
        <ul>
          {events.map(event => (
            <li key={event.id} id={event.id} onClick={this.props.handleClick}>
              {event.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default UserEvents;
