document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed.");

    // Retrieve book data from localStorage
    let books = JSON.parse(localStorage.getItem('books')) || [];

    const bookListContainer = document.querySelector('.book-list');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');

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
