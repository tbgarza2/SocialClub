import React, { Component } from 'react';
import axios from 'axios';
// Chatkit
// import ChatMessage from './ChatMessage.jsx';
import EventAttendees from './EventAttendees.jsx';
// import ChatApp from './ChatApp.jsx';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: [],
      // currentId: '',
      // currentView: '',
      // currentUsername: '',
      // roomID: '',
      users: [],
    };
    // this.changeView = this.changeView.bind(this);
    // this.createUser = this.createUser.bind(this);
  }

  componentDidMount() {
    // const eventID = this.props.eventID || this.props.location.state.userID;
    // console.log('BON', eventID, 'BON', this.props.match.params.eventId);
    // const { users } = this.state;
    const eventID = this.props.match.params.eventId;

    axios({
      method: 'get',
      url: `api/event/events/page/${eventID}`,
    }).then(res => {
      this.setState({ eventData: res.data[0] });
    });
    axios
      .get(`/api/rsvp/rsvp/conf/${eventID}`)
      .then(rsvpUsers => {
        console.log('rsvp list grabbed');
        this.setState({
          users: rsvpUsers.data,
        });
      })
      .catch(error => {
        console.log("No users rsvp'd");
        console.log(error);
      });
    // this.createUser();
  }

  // chat view
  // changeView(view) {
  //   this.setState({
  //     currentView: view,
  //   });
  // }

  // chat sign up
  // createUser() {
  //   const { googleUser } = this.props;
  //   axios({
  //     method: 'post',
  //     url: 'api/chatkit/users',
  //     data: {
  //       id: googleUser.profileObj.email,
  //       name: googleUser.profileObj.name,
  //     },
  //   })
  //     .then(() => {
  //       this.setState({
  //         // currentUsername: googleUser.profileObj.name,
  //         currentId: googleUser.profileObj.email,
  //         currentView: 'chatApp',
  //       });
  //     }).catch((err) => {
  //       console.log(err);

  //       this.setState({
  //         // currentUsername: googleUser.profileObj.name,
  //         currentId: googleUser.profileObj.email,
  //         currentView: 'chatApp',
  //       });
  //     });
  // }

  render() {
    // let view = '';
    // if (currentView === 'ChatMessage') {
    //   view = <ChatMessage changeView={this.changeView} />;
    // } else if (currentView === 'chatApp') {
    //   view = <ChatApp currentid={currentId} roomID={eventData.roomID} />;
    // }
    const { eventData } = this.state;
    return (
      <div>
        <p>{eventData.name}</p>
        <p>Location:{eventData.address}</p>
        <p>Time: {eventData.time}</p>
        <p>Category: {eventData.category}</p>
        <p>Summary: {eventData.summary}</p>
        {/* <div className="Chat">{view}</div> */}
        <div>
          <EventAttendees
            holdClickedUser={this.props.holdClickedUser}
            viewOtherProfileClick={this.props.viewOtherProfileClick}
            rsvpUsers={this.state.users}
            userId={this.props.userId}
          />
        </div>
      </div>
    );
  }
}
export default EventPage;
