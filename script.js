// scripts.js
document.addEventListener('DOMContentLoaded', function() {
  const loginSection = document.getElementById('login-section');
  const bookmarksSection = document.getElementById('bookmarks-section');
  const addBookmarkSection = document.getElementById('add-bookmark-section');
  const loginForm = document.getElementById('loginForm');
  const logoutButton = document.getElementById('logoutButton');
  const loginError = document.getElementById('loginError');
  const bookmarksList = document.getElementById('bookmarksList');
  
  // Function to authenticate user
  function authenticateUser(username, password) {
    // Your authentication logic here (e.g., check credentials against a hardcoded list)
    // For demo purposes, let's assume username: "user123", password: "password123" for authentication
    return (username === "user123" && password === "password123");
  }

  // Function to display bookmarks
  function displayBookmarks() {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarksList.innerHTML = '';
    storedBookmarks.forEach(bookmark => {
      const bookmarkElement = document.createElement('div');
      bookmarkElement.innerHTML = `<h3>${bookmark.title}</h3><p>${bookmark.url}</p>`;
      bookmarksList.appendChild(bookmarkElement);
    });
  }

  // Event listener for login form submission
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const authenticated = authenticateUser(username, password);
    if (authenticated) {
      loginError.style.display = 'none';
      loginSection.style.display = 'none';
      bookmarksSection.style.display = 'block';
      addBookmarkSection.style.display = 'block';
      displayBookmarks();
    } else {
      loginError.style.display = 'block';
    }
  });

  // Event listener for logout button
  logoutButton.addEventListener('click', function() {
    localStorage.removeItem('bookmarks');
    loginSection.style.display = 'block';
    bookmarksSection.style.display = 'none';
    addBookmarkSection.style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  });

  // Function to add bookmark
  function addBookmark(event) {
    event.preventDefault();
    const title = document.getElementById('bookmarkTitle').value;
    const url = document.getElementById('bookmarkURL').value;
    const bookmark = { title, url };
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    storedBookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(storedBookmarks));
    displayBookmarks();
    document.getElementById('bookmarkTitle').value = '';
    document.getElementById('bookmarkURL').value = '';
  }

  // Event listener for adding a new bookmark
  document.getElementById('addBookmarkForm').addEventListener('submit', addBookmark);
});
