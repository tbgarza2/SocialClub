import React, { Component } from 'react';
class UserProfile extends Component {
  constructor(props){
    super(props);
console.log(props);
  }
  render (){
   
      let profile = this.props.user.getBasicProfile();
    let id_token = this.props.user.getAuthResponse().id_token;
      console.log("worked");
      $(".g-signin2").css("display", "none");
      $(".data").css("display", "block");
    $("#pic").attr('src', profile.getImageUrl());
    $("#email").text(profile.getEmail());
    //console.log("JD" + profile.getName())
    $("#name").text(profile.getName());
    $("#id").text(profile.getId());
    
  return (
      
    <div className = "test">
      <img id="pic" className="img-circle" width="100" height="100" src={this.props.user.profileObj.imageUrl}/> 
      <h2 className="emailAddy"> Welcome Back {this.props.userName}!</h2>
      <div id="email" className="col-sm-4"> {this.props.user.profileObj.email}</div>
      <div id="name" className="col-sm-4"> {this.props.user.profileObj.name}</div>
      <div id="id" className="col-sm-4"> {this.props.user.profileObj.googleId}</div>
      <button className="dangerButton" onClick={this.signOut}>Sign Out</button>
    </div>
  
  )
  }
}
export default UserProfile;