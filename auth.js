// auth.js

// SIGN UP
document.getElementById('signupForm')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !email || !password) {
    alert('Please fill in all fields');
    return;
  }

  const user = { username, email, password };
  localStorage.setItem('user', JSON.stringify(user));

  alert('Account created successfully! Please log in.');
  window.location.href = 'login.html';
});

// LOGIN
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Login function triggered');
   window.location.href = 'index.html';

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.email === email && user.password === password) {
    localStorage.setItem('loggedInUser', user.username);
    alert(Welcome, `${user.username}!`);
    // Redirect to home page
    window.location.href = 'index.html';
  } else {
    alert('Invalid email or password. Please try again.');
  }
});
const logoutLink = document.getElementById('logoutLink');

if (logoutLink) {
  logoutLink.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
    window.location.href = 'login.html';
  });
}

