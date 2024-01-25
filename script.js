document.addEventListener('DOMContentLoaded', function () {
  // Function to send data to the extension
  const sendDataToExtension = (data) => {
    chrome.runtime.sendMessage({ type: 'FROM_WEBSITE', data: data });
  };

  // Function to display bookmarks on the website
  const displayBookmarks = (bookmarks) => {
    const bookmarksContainer = document.getElementById('bookmarks-container');
    if (!bookmarksContainer) {
      console.error('Bookmarks container element not found.');
      return;
    }
    bookmarksContainer.innerHTML = ''; // Clear previous bookmarks
    bookmarks.forEach(bookmark => {
      const bookmarkElement = createBookmarkElement(bookmark);
      bookmarksContainer.appendChild(bookmarkElement);
    });
  };

  // Function to create bookmark element
  const createBookmarkElement = (bookmark) => {
    const bookmarkElement = document.createElement('div');
    bookmarkElement.classList.add('bookmark');
    bookmarkElement.innerHTML = `
      <h3>${bookmark.title}</h3>
      <p><a href="${bookmark.url}" target="_blank">${bookmark.url}</a></p>
      <button class="delete-button">Delete</button>
    `;
    bookmarkElement.querySelector('.delete-button').addEventListener('click', () => deleteBookmark(bookmark));
    return bookmarkElement;
  };

  // Function to delete bookmark
  const deleteBookmark = (bookmark) => {
    if (!confirm(`Are you sure you want to delete "${bookmark.title}"?`)) {
      return;
    }
    sendDataToExtension({ action: 'delete', bookmark: bookmark });
  };

  // Function to add a bookmark and notify the extension
  const addBookmarkAndNotify = (newBookmark) => {
    sendDataToExtension({ action: 'add', bookmark: newBookmark });
  };

  // Event listener for the form submission to add a bookmark
  const addBookmarkForm = document.getElementById('addBookmarkForm');
  if (addBookmarkForm) {
    addBookmarkForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const bookmarkTitle = document.getElementById('bookmarkTitle').value;
      const bookmarkURL = document.getElementById('bookmarkURL').value;
      const newBookmark = { title: bookmarkTitle, url: bookmarkURL };
      addBookmarkAndNotify(newBookmark);
      addBookmarkForm.reset();
    });
  }

  // Listen for messages from the extension
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'FROM_EXTENSION') {
      const receivedData = message.data;
      if (Array.isArray(receivedData)) {
        // Display the bookmarks on the website
        displayBookmarks(receivedData);
      }
    }
  });

  // Other existing code...
});
