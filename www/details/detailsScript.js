document.addEventListener("DOMContentLoaded", function() {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Set the book details from URL parameters
    const title = getQueryParam('title');
    document.getElementById('book-title').textContent = title;
    document.getElementById('book-author').textContent = getQueryParam('author');
    document.getElementById('book-description').textContent = getQueryParam('description');
    document.getElementById('reading-status').textContent = getQueryParam('readingStatus');
    document.getElementById('book-status').textContent = getQueryParam('bookStatus');
    
    const coverUrl = getQueryParam('cover');
    if (coverUrl) {
        document.getElementById('book-cover').src = coverUrl;
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
        const updatedBooks = books.filter(book => book.title !== title);

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
