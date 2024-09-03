document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the book details from localStorage
    const book = JSON.parse(localStorage.getItem('selectedBook'));

    // Set the book details from the retrieved object
    if (book) {
        document.getElementById('book-title').textContent = book.title;
        document.getElementById('book-author').textContent = book.author;
        document.getElementById('book-description').textContent = book.description;
        document.getElementById('reading-status').textContent = book.readingStatus;
        document.getElementById('book-status').textContent = book.bookStatus;

        const coverUrl = book.cover;
        if (coverUrl) {
            document.getElementById('book-cover').src = coverUrl;
        }
    }

    // Handle back button click
    document.getElementById('backButton').addEventListener('click', function() {
        const previousPage = localStorage.getItem('previousPage');
        
        if (previousPage) {
            window.location.href = previousPage; // Navigate back to the saved previous page
        } else {
            history.back(); // Fallback to history.back() if no previous page is saved
        }
    });

    // Handle delete button click
    document.getElementById('deleteButton').addEventListener('click', function() {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const updatedBooks = books.filter(storedBook => storedBook.title !== book.title);

        // Update localStorage
        localStorage.setItem('books', JSON.stringify(updatedBooks));

        // Navigate back to the previous page (e.g., library)
        const previousPage = localStorage.getItem('previousPage');
        if (previousPage) {
            window.location.href = previousPage;
        } else {
            history.back();
        }
    });
});
