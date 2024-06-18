// Get elements
var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

// To get base URL (localhost)
var pathparts = location.pathname.split('/');
var baseURL = '';
for (var i = 0; i < pathparts.length - 1; i++) {
  baseURL += '/' + pathparts[i];
}
console.log(baseURL);

// To say welcome on the home page
var username = localStorage.getItem('sessionUsername');
if (username) {
  document.getElementById('username').innerHTML = "Welcome " + username;
}

// User array from local storage
var signUpArray = JSON.parse(localStorage.getItem('users')) || [];

// Check if inputs are empty
function isEmpty() {
  return signupName.value !== "" && signupEmail.value !== "" && signupPassword.value !== "";
}

// Sign up function
function signUp() {
  if (!isEmpty()) {
    document.getElementById('exist').innerText = "All fields are required";
    return;
  }
  
  var userExists = signUpArray.some(user => user.email === signupEmail.value);

  if (userExists) {
    document.getElementById('exist').innerText = "Email already exists";
    return;
  }

  var newUser = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value
  };
  
  signUpArray.push(newUser);
  localStorage.setItem('users', JSON.stringify(signUpArray));
  localStorage.setItem('sessionUsername', newUser.name);
  
  window.location.href = 'welcome.html';
}

// Login function
function login() {
  var user = signUpArray.find(user => user.email === signinEmail.value && user.password === signinPassword.value);

  if (user) {
    localStorage.setItem('sessionUsername', user.name);
    window.location.href = 'welcome.html';
  } else {
    document.getElementById('incorrect').innerText = "Incorrect email or password";
  }
}

// Logout function
function logout() {
  localStorage.removeItem('sessionUsername');
}
