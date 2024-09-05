document.addEventListener("DOMContentLoaded", function() {
    const bookListContainer = document.getElementById('book-container');
    
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchButton = document.getElementById('search-btn');
    const urlParams = new URLSearchParams(window.location.search);
    
    // Fetch books from localStorage and filter for reading books
    function displayBooks() {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        const readingBooks = books.filter(book => book.readingStatus === "Reading");
        bookListContainer.innerHTML = ''; // Clear previous content

        readingBooks.forEach((book) => {
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

    // Fetch books from localStorage and filter for "To-read" books
    const toReadListContainer = document.getElementById('to-read-container');
    function displayToReadBooks() {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        const toReadBooks = books.filter(book => book.readingStatus === "to-read");
        toReadListContainer.innerHTML = ''; // Clear previous content

        toReadBooks.forEach((book) => {
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
            toReadListContainer.appendChild(bookItem);
        });
    }

    // Initialize book display
    displayBooks();
    displayToReadBooks();

    
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

    // Retrieve book data from localStorage
    let books = JSON.parse(localStorage.getItem('books')) || [];


    // Function to filter books by search query
    function filterBooks(query) {
        return books.filter(book => {
            return book.title.toLowerCase().includes(query.toLowerCase()) || 
                   book.author.toLowerCase().includes(query.toLowerCase());
        });
    }

    // Function to display search results in the dropdown
    function displayResults(filteredBooks) {
        searchResults.innerHTML = ''; // Clear previous results

        if (filteredBooks.length === 0) {
            let noResultItem = document.createElement('li');
            noResultItem.textContent = 'No results found';
            searchResults.appendChild(noResultItem);
        } else {
            filteredBooks.forEach(book => {
                let resultItem = document.createElement('li');
                resultItem.textContent = `${book.title} by ${book.author}`;
                resultItem.addEventListener('click', function () {
                    window.location.href = 'details/detailsIndex.html?bookId=${book.id}';
                });
                searchResults.appendChild(resultItem);
            });
        }
    }

    // Add event listener for input to search in real-time
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            const filteredBooks = filterBooks(query);
            displayResults(filteredBooks);
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none'; // Hide the dropdown if the input is empty
        }
    });

    // Hide the dropdown if the user clicks outside the search container
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.search-container')) {
            searchResults.style.display = 'none';
        }
    });
});
