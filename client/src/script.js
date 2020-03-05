function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const { id_token } = googleUser.getAuthResponse();
  $('.g-signin2').css('display', 'none');
  $('.data').css('display', 'block');
  $('#pic').attr('src', profile.getImageUrl());
  $('#email').text(profile.getEmail());

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://yourbackend.example.com/tokensignin');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    console.log(`Signed in as: ${xhr.responseText}`);
  };
  xhr.send(`idtoken=${id_token}`);
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    alert('You have been successfully signed out');
    $('.g-signin2').css('display', 'block');
    $('.data').css('display', 'none');
  });
}
module.exports = {
  signOut,
  onSignIn,
};
