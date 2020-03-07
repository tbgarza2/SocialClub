import React, { Component } from 'react';
import axios from 'axios';


class OtherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      user: { name: 'Maybe', id: 4, email: 'Yeet@Gmail.com' },
      messageInput: '',
      messages: [],
      openMessages: false,
      openOrClose: 'Open',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenMessages = this.handleOpenMessages.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.interval = setInterval(() => this.getMessages(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getMessages() {
    const { user, userID } = this.state;
    axios.get(`/api/message/${userID}/${user.id}`)
      .then(({ data }) => this.setState({ messages: data }));
  }

  handleOpenMessages() {
    const { openMessages, openOrClose } = this.state;

    this.setState({
      openMessages: !openMessages,
      openOrClose: openOrClose === 'Open' ? 'Close' : 'Open',
    });
  }

  handleChange(e) {
    this.setState({
      messageInput: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleMessage();
    this.setState({
      messageInput: '',
    });
  }

  handleMessage() {
    const { user, userID, messageInput } = this.state;
    console.log(messageInput);
    axios.post(`/api/message/${userID}/${user.id}`, { message: messageInput })
      .then(m => console.log(m))
      .then(() => this.getMessages());
  }

  render() {
    const {
      user,
      messages,
      messageInput,
      openMessages,
      openOrClose
    } = this.state;
    return (
      <div>
        <div className="profileRender">
          <h2 className="emailAddy"> Welcome to {user.name}`s profile!</h2>
          <div id="email" className="col-sm-4"> {user.email}</div>
          <div id="name" className="col-sm-4"> {user.name}</div>
          <div id="email" className="col-sm-4"> {user.email}</div>

        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={this.handleOpenMessages}>{openOrClose} Messages</button>
        </div>
        {openMessages && (
          <div style={{ marginLeft: 150, marginRight: 150 }}>
            <br />
            <div style={{ textAlign: 'center' }}>
              <button onClick={this.handleSubmit}>Send</button>
              <input type="text" onChange={this.handleChange} value={messageInput} />
            </div>
            <br />
            <div>
              <ul className="list-group">
                {messages.slice(0).map(message => (
                  <div key={message.id_message}>
                    <li className="list-group-item">
                      <h4 className="list-group-item active">{message.name}:</h4>
                      <div className="list-group-item">{message.message}</div>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default OtherProfile;
