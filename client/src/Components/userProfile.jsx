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
    <div className="Chat">
      
       {/* <button onclick = "signOut()" class = "btn btn danger">Sign Out</button> */}
        </div>
  
  )
  }
}
export default UserProfile;