document.addEventListener("DOMContentLoaded", function() {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Set the book details from URL parameters
    document.getElementById('book-title').textContent = getQueryParam('title');
    document.getElementById('book-author').textContent = getQueryParam('author');
    document.getElementById('book-description').textContent = getQueryParam('description');
    document.getElementById('reading-status').textContent = getQueryParam('readingStatus');
    document.getElementById('book-status').textContent = getQueryParam('bookStatus');
    
    // Set the book cover image
    const coverUrl = getQueryParam('cover');
    if (coverUrl) {
        document.getElementById('book-cover').src = coverUrl;
    }
});
