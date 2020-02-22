import React, { Component } from "react";
import "./App.css";
import { hot } from "react-hot-loader";
import axios from 'axios'
//Topbar Menu imports
import MenuItem from "./MenuItem"
import Menu from './Menu'
import MenuButton from './MenuButton'
//Chatkit
import ChatMessage from './Components/ChatMessage';
import Signup from './Components/Signup';
import ChatApp from './Components/ChatApp';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      currentUsername: '',
      currentId: '',
      currentView: 'Signup'
    }
    this.changeView = this.changeView.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  // changes chat view
  changeView(view) {
    this.setState({
      currentView: view
    })
  }
  //chat sign up
  createUser(username) {
    axios({
      method: 'post',
      url: 'api/chatkit/users',
      data: {
        id: username,
        name: username,
      }
    })
    .then((res) => {
      console.log(res.data.id)
      this.setState({
        currentUsername: res.data.name,
        currentId: res.data.id,
        currentView: 'chatApp'
      })
    }).catch((err) => {
      if (err.status === 400) {
        this.setState({
          currentUsername: username,
          currentId: username,
          currentView: 'chatApp'
        })
      } else {
        console.log(err.status);
      }
    });
  }
  //Menu handler
  handleMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleLinkClick() {
    this.setState({ menuOpen: false });
  }

  render() {
    //navbar css
    const styles =
    {
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: '99',
        opacity: 0.9,
        display: 'flex',
        alignItems: 'center',
        background: 'black',
        width: '100%',
        color: 'white',
        fontFamily: 'Lobster',
      },
      logo: {
        margin: '0 auto',
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        filter: this.state.menuOpen ? 'blur(2px)' : null,
        transition: 'filter 0.5s ease',
      },
    }
    //navbar menu items
    const menu = ['Home', 'Created Events', 'RSVP\'d Events',]
    const menuItems = menu.map((val, index) => {
      return (
        <MenuItem
          key={index}
          delay={`${index * 0.1}s`}
          onClick={() => { this.handleLinkClick(); }}>{val}</MenuItem>)

    }
    );

    //chatbox condition render
    let view ='';
    
    if (this.state.currentView === "ChatMessage") {
        view = <ChatMessage  changeView={this.changeView}/>
    } else if (this.state.currentView === "Signup") {
        view = <Signup onSubmit={this.createUser}/>
    } else if (this.state.currentView === "chatApp") {
        view = <ChatApp currentId={this.state.currentId} />
    }

    return (
      <div>
        {/* navbar  */}
        <div style={styles.container}>
          <MenuButton open={this.state.menuOpen} onClick={() => this.handleMenuClick()} color='white' />
          <div style={styles.logo}>Social Club</div>
        </div>
        <Menu open={this.state.menuOpen}>
          {menuItems}
        </Menu>
        {/* chatbox */}
        <div className="Chat">
          {view}
        </div>
      </div>
    );
  }
}

export default hot(module)(App); 