document.addEventListener("DOMContentLoaded", function() {
    const bookListContainer = document.getElementById('book-container');
    
    // Fetch books from localStorage and filter for finished books
    function displayBooks() {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        const finishedBooks = books.filter(book => book.readingStatus === "Reading");
        bookListContainer.innerHTML = ''; // Clear previous content

        finishedBooks.forEach((book) => {
            const bookItem = document.createElement("div");
            bookItem.className = "book-item";
            bookItem.innerHTML = `
                <img src="${book.cover}" alt="Book Cover" class="book-cover">
                <div class="book-details">
                    <span class="title" data-label="Title">${book.title}</span><br>
                    <span class="author" data-label="Author">${book.author}</span><br>
                </div>
            `;
            bookItem.addEventListener('click', function() {
                // Save the current page (library) URL before navigating
                localStorage.setItem('previousPage', window.location.href);

                // Save the selected book details to localStorage
                localStorage.setItem('selectedBook', JSON.stringify(book));

                // Navigate to the details page
                window.location.href = 'details/detailsIndex.html';
            });
            bookListContainer.appendChild(bookItem);
        });
    }

    // Initialize book display
    displayBooks();

    // Retrieve user data from localStorage
    let user = JSON.parse(localStorage.getItem('userProfile')) || {
        profileImage: 'img/profile.png', // Default image if not set
        name: 'World', // Default name if not set
        username: '@username',
        booksCount: 0,
        finishedCount: 0,
        bio: ''
    };

    // Update header with user data
    document.getElementById('header-profile').src = user.profileImage;
    document.getElementById('header-name').textContent = `Hello, ${user.name}!`;    
});
