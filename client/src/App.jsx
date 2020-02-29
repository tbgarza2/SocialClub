import React, { Component } from "react";
import "./App.css";
//import { hot } from "react-hot-loader";
import MapContainer from "./components/MapContainer"
import axios from 'axios'
import  { onSignIn } from "../dist/script"
//Topbar Menu imports
import MenuItem from "./MenuItem"
import Menu from './Menu'
import MenuButton from './MenuButton'
//Chatkit
import ChatMessage from './Components/ChatMessage';
import Signup from './Components/Signup';
import ChatApp from './Components/ChatApp';
import UserProfile from './Components/userProfile';
import GoogleLogin  from "react-google-login"
import CreateEvent from "./CreateEvent";
import Home from "./Components/Home"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleUser: [],
      menuOpen: false,
      currentUsername: '',
      currentId: '',
      currentView: 'Signup',
      appView: 'Home'
    }
   //console.log(googleUser);
    this.changeView = this.changeView.bind(this);
    this.createUser = this.createUser.bind(this);
    //this.userProfile = this.userProfile.bind(this)
    this.createEvent = this.createEvent.bind(this)
  }

  createEvent () {
    this.setState({
      appView: 'CreateEvent'
    })
  }
  // changes chat view
  // userProfile() {
  //   this.setState({
  //     appView: 'UserProfile'
  //   })
  // }

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

  handleLinkClick(link) {
    this.setState({ menuOpen: false });
    this.setState({appView: link.val})
  }
  render() {
    //
    const responseGoogle = (response) => {
      console.log(response)
    }
    //
    const onSignIn = (googleUser) => {
      console.log(googleUser, "settingstate");
       this.setState({
        appView: 'UserProfile',
        currentUsername: googleUser.profileObj.name,
        googleUser: googleUser
      })
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
        paddingTop: '65px', 
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
          onClick={() => { this.handleLinkClick({val}); }}>{val}</MenuItem>)

    }
    );

    //chatbox condition render
    let view ='';
    
    if (this.state.currentView === "ChatMessage") {
        view = <ChatMessage  changeView={this.changeView}/>
    } else if (this.state.currentView === "Signup") {
        view = <Signup onSubmit={this.createUser}/>
    } else if (this.state.currentView === "chatApp") {
        view = <ChatApp currentid={this.state.currentId} />
     } 
    //  else if (this.state.currentView === "userProfile") {
    //   view = <UserProfile currentUsername={this.state.currentUsername} />
    // }

    let appView = '';
    if (this.state.appView === 'Home') {
      appView = <Home handleClick={this.createEvent} />
    } 
    if (this.state.appView === 'UserProfile') {
      appView = <UserProfile user = {this.state.googleUser}></UserProfile>
    }
      
    return (
      <div>
        <div className="g-signin2">
        <GoogleLogin
          clientId="870155244088-hav8sg0oo71s181ghhetvqdgrssuo8ln.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={onSignIn}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
          </div>


      <div className = "data">
        <img id="pic" className = "img-circle" width = "100" height = "100"></img>
          <p id="email" className = "alert alert danger">.col</p>
      <h2 class = "emailAddy"> Email Address</h2>
       <div id="email" className="col-sm-4">.col-sm-4</div>
    <div className="col-sm-4">.col-sm-4</div>
    <div className="col-sm-4">.col-sm-4</div>
        <button  className = "btn btn danger">Sign Out</button>
    </div>
  
      
        
       
        <div style={styles.container}>
          <MenuButton open={this.state.menuOpen} onClick={() => this.handleMenuClick()} color='white' />
          <div style={styles.logo}>Social Club</div>
        </div>
        <div>
        <Menu open={this.state.menuOpen}>
          
          {menuItems}
        </Menu>
        </div>
        {/* <Home /> */}
        {/* <CreateEvent /> */}
        {/* chatbox */}
        {appView}
        {/* <div className="Chat">
          {view}
        </div> */}
      </div>
    );
  }
}

export default App;