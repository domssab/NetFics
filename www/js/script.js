document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed.");

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
                    window.location.href = `details/detailsIndex.html?bookId=${book.id}`;
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

    // Function to display books
    function displayBooks(booksToShow) {
        bookListContainer.innerHTML = ''; // Clear the book list

        booksToShow.forEach(book => {
            let bookCard = document.createElement('div');
            bookCard.classList.add('book-card');

            bookCard.innerHTML = `
                <div>
                    <img src="${book.cover}" alt="${book.title}">
                    <h3>${book.title}</h3>
                    <p>Author: ${book.author}</p>
                    <p>No. of Chapters: ${book.chapters}</p>
                </div>
            `;

            // Add click event to book card
            bookCard.addEventListener('click', function() {
                window.location.href = `details/detailsIndex.html?bookId=${book.id}`;
            });

            bookListContainer.appendChild(bookCard);
        });
    }

    // Initial display of books
    displayBooks(books);

    // Function to search books based on the input
    function searchBooks() {
        const query = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query)
        );
        displayBooks(filteredBooks);
    }

    // Event listener for the search button
    searchButton.addEventListener('click', searchBooks);

    // Event listener for the Enter key in the search input
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchBooks();
        }
    });
});
