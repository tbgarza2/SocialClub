import React, { Component } from 'react';
import axios from 'axios';


class OtherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      user: { name: 'Maybe', id: 4 },
      messageInput: '',
      messages: [],
      openMessages: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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
    const { openMessages } = this.state;

    this.setState({
      openMessages: !openMessages,
    });
  }

  handleChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleMessage();
    this.setState({
      message: '',
    });
  }

  handleMessage() {
    const { user, userID, message } = this.state;
    axios.post(`/api/message/${userID}/${user.id}`, { message })
      .then(m => console.log(m))
      .then(() => this.getMessages());
  }

  render() {
    const { user, messages, messageInput } = this.state;
    return (
      <div>
        <h2>{user.name}</h2>
        {messages.slice(0).reverse().map(message => (
          <div>
            <h4>{message.name}:</h4>
            <div>{message.message}</div>
          </div>
        ))}
        <input type="text" onChange={this.handleChange} value={messageInput} />
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    );
  }
}

export default OtherProfile;
