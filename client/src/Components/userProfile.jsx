import React, { Component } from 'react';
class UserProfile extends Component {
  constructor(props){
    super(props);

  }
  render (){
    function onSignIn(googleUser) {
      let profile = googleUser.getBasicProfile();
      let id_token = googleUser.getAuthResponse().id_token;
      console.log("worked");
      $(".g-signin2").css("display", "none");
      $(".data").css("display", "block");
      $("#pic").attr('src', profile.getImageUrl());
      $("#email").text(profile.getEmail());
    }
  return (
    <div className="Chat">
      
        <h2>YOOOOOOOOO</h2>
        </div>
  
  )
  }
}
export default UserProfile;