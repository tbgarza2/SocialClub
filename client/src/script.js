function onSignIn(googleUser){
let profile = googleUser.getBasicProfile();
let id_token = googleUser.getAuthResponse().id_token;
console.log("worked");
$(".g-signin2").css("display", "none");
$(".data").css("display", "block");
$("#pic").attr('src', profile.getImageUrl());
$("#email").text(profile.getEmail());

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://yourbackend.example.com/tokensignin');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    console.log('Signed in as: ' + xhr.responseText);
  };
  xhr.send('idtoken=' + id_token);

}

function signOut(){
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function(){
      alert("You have been successfully signed out");
      $(".g-signin2").css("display", "block");
      $(".data").css("display", "none");
    })
}
module.exports = {
  signOut,
  onSignIn
}