function loadCover(event) {
    const coverPreview = document.getElementById('cover-preview');
    coverPreview.src = URL.createObjectURL(event.target.files[0]);
    coverPreview.onload = function () {
        URL.revokeObjectURL(coverPreview.src); // Free memory
    }
}

document.getElementById('book-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        chapters: document.getElementById('chapters').value,
        description: document.getElementById('description').value,
        readingStatus: document.querySelector('input[name="reading-status"]:checked').value,
        bookStatus: document.querySelector('input[name="book-status"]:checked').value
    };

    console.log('Book Data:', bookData);

    // You can now send the bookData to your backend or save it locally
});
