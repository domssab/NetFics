document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);

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

    const bookListContainer = document.querySelector('.book-list');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchButton = document.getElementById('search-btn');

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
                    window.location.href = 'details/detailsIndex.html';
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