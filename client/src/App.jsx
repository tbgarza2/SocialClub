import React, { Component } from "react";
import "./App.css";
//import { hot } from "react-hot-loader";
import MapContainer from "./components/MapContainer"
import axios from 'axios'

//Topbar Menu imports
import MenuItem from "./MenuItem"
import Menu from './Menu'
import MenuButton from './MenuButton'
//Chatkit
import ChatMessage from './Components/ChatMessage';
import Signup from './Components/Signup';
import ChatApp from './Components/ChatApp';
import GoogleLogin  from "react-google-login"


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
    this.signedUp = this.signedUp.bind(this)
    //this.responseGoogle = this.responseGoogle.bind(this);
  }
  signedUp(res, type){

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
      console.log(err)
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
  responseGoogle (response) {
    console.log(response)
  }
  render() {
    const responseGoogle = (response) => {
      console.log(response);
      this.signedUp(response, "Google")
    }
    
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
        <GoogleLogin
          clientId="870155244088-hav8sg0oo71s181ghhetvqdgrssuo8ln.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <div style={styles.container}>
          <MenuButton open={this.state.menuOpen} onClick={() => this.handleMenuClick()} color='white' />
          <div style={styles.logo}>Social Club</div>
        </div>
        <Menu open={this.state.menuOpen}>
          <div class="g-signin2" data-onsuccess="onSignIn"></div>
          {menuItems}
        </Menu>
        <MapContainer></MapContainer>
        {/* chatbox */}
        <div className="Chat">
          {view}
        </div>
      </div>
    );
  }
}

export default App;