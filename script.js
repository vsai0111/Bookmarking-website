// scripts.js
document.addEventListener('DOMContentLoaded', function() {
  const loginForms = document.getElementById('loginForms');
  const createAccountForm = document.getElementById('createAccountForm');
  const createAccountBtn = document.getElementById('createAccountBtn');

  // Function to handle account creation
  function createAccount(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
    } else if (localStorage.getItem(newUsername)) {
      alert('Username already exists. Please choose a different username.');
    } else {
      localStorage.setItem(newUsername, JSON.stringify({ email, newPassword }));
      alert('Account created successfully!');
      document.getElementById('email').value = '';
      document.getElementById('newUsername').value = '';
      document.getElementById('newPassword').value = '';
      document.getElementById('confirmPassword').value = '';
      toggleForms(); // Hide create account form after successful creation
    }
  }

  // Event listener for Create Account form submission
  createAccountForm.addEventListener('submit', createAccount);

  // Event listener for Create Account button click
  createAccountBtn.addEventListener('click', function() {
    toggleForms();
  });

  // Other functions remain the same
});
