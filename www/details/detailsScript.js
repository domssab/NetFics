document.addEventListener("DOMContentLoaded", function() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const bookItems = document.querySelectorAll('.book-item');

    bookItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const book = books[index];
            const url = `bookDetail.html?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&description=${encodeURIComponent(book.description)}&cover=${encodeURIComponent(book.cover)}&readingStatus=${encodeURIComponent(book.readingStatus)}&bookStatus=${encodeURIComponent(book.bookStatus)}`;
            window.location.href = url;
        });
    });
});
