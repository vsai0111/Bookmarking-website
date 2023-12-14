// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const bookmarksList = document.getElementById('bookmarks-list');
    const addBookmarkForm = document.getElementById('addBookmarkForm');
  
    // Function to display bookmarks (fetching from backend)
    function displayBookmarks() {
      fetch('/api/bookmarks') // Fetch bookmarks from backend API
        .then(response => response.json())
        .then(data => {
          bookmarksList.innerHTML = ''; // Clear previous bookmarks
          data.forEach(bookmark => {
            const bookmarkElement = document.createElement('div');
            bookmarkElement.classList.add('bookmark');
            bookmarkElement.innerHTML = `
              <h3>${bookmark.title}</h3>
              <p>${bookmark.url}</p>
              <div class="actions">
                <button onclick="editBookmark(${bookmark.id})">Edit</button>
                <button onclick="deleteBookmark(${bookmark.id})">Delete</button>
              </div>
            `;
            bookmarksList.appendChild(bookmarkElement);
          });
        })
        .catch(error => {
          console.error('Error fetching bookmarks:', error);
        });
    }
  
    // Function to edit a bookmark (replace with actual implementation)
    function editBookmark(bookmarkId) {
      // Implement edit functionality
      // Example:
      // Redirect to a dedicated edit page or open a modal for editing
      console.log(`Editing bookmark with ID ${bookmarkId}`);
    }
  
    // Function to delete a bookmark (replace with actual implementation)
    function deleteBookmark(bookmarkId) {
      // Implement delete functionality
      // Example:
      // Send a DELETE request to the backend API to delete the bookmark
      fetch(`/api/bookmarks/${bookmarkId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          // Bookmark deleted successfully, refresh the list
          displayBookmarks();
        } else {
          // Handle error response
          console.error('Failed to delete bookmark');
        }
      })
      .catch(error => {
        console.error('Error deleting bookmark:', error);
      });
    }
  
    // Event listener for form submission (adding a bookmark)
    addBookmarkForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const bookmarkTitle = document.getElementById('bookmarkTitle').value;
      const bookmarkURL = document.getElementById('bookmarkURL').value;
  
      // Send data to backend to add a new bookmark
      fetch('/api/bookmarks', {
        method: 'POST',
        body: JSON.stringify({ title: bookmarkTitle, url: bookmarkURL }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Bookmark added successfully, refresh the list
          displayBookmarks();
          addBookmarkForm.reset(); // Reset form fields
        } else {
          // Handle error response
          console.error('Failed to add bookmark');
        }
      })
      .catch(error => {
        console.error('Error adding bookmark:', error);
      });
    });
  
    // Load bookmarks when the page loads
    displayBookmarks();
  });
  