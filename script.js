document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('message', function (event) {
    if (event.source === window && event.data.type === 'FROM_EXTENSION') {
      const receivedData = event.data.data;
      if (Array.isArray(receivedData)) {
        console.log('Received bookmarks from extension:', receivedData);
        // Process received data (bookmarks)
        // Update the UI to display the received bookmarks here
      }
    }
  });

  // Your existing website code...
  const bookmarksList = document.getElementById('bookmarks-list');
  const addBookmarkForm = document.getElementById('addBookmarkForm');

  function displayBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarksList.innerHTML = '';
    bookmarks.forEach(bookmark => {
      const bookmarkElement = createBookmarkElement(bookmark);
      bookmarksList.appendChild(bookmarkElement);
    });
  }

  function createBookmarkElement(bookmark) {
    const bookmarkElement = document.createElement('div');
    bookmarkElement.classList.add('bookmark');
    bookmarkElement.innerHTML = `
      <h3>${bookmark.title}</h3>
      <p><a href="${bookmark.url}" target="_blank">${bookmark.url}</a></p>
      <div class="actions">
        <button onclick="deleteBookmark('${bookmark.title}')">Delete</button>
      </div>
    `;
    return bookmarkElement;
  }

  function deleteBookmark(title) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks = bookmarks.filter(bookmark => bookmark.title !== title);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
  }

  addBookmarkForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const bookmarkTitle = document.getElementById('bookmarkTitle').value;
    const bookmarkURL = document.getElementById('bookmarkURL').value;

    const newBookmark = {
      title: bookmarkTitle,
      url: bookmarkURL
    };

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.push(newBookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
    addBookmarkForm.reset();
  });

  // Display bookmarks when the page loads
  displayBookmarks();
});
