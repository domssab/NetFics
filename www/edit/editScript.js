document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the selected book details from localStorage
    const book = JSON.parse(localStorage.getItem('selectedBook'));


    if (book) {
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('chapters').value = book.chapters;
        document.getElementById('description').value = book.description;

        document.querySelector(`input[name="reading-status"][value="${book.readingStatus}"]`).checked = true;
        document.querySelector(`input[name="book-status"][value="${book.bookStatus}"]`).checked = true;

        const coverPreview = document.getElementById('cover-preview');
        if (book.cover) {
            coverPreview.src = book.cover;
            coverPreview.style.display = 'block';
        }
    }

    // Handle form submission to save changes
    document.getElementById('edit-form').addEventListener('submit', function(e) {
        e.preventDefault();

        // Update the book object with new values
        book.title = document.getElementById('title').value;
        book.author = document.getElementById('author').value;
        book.chapters = document.getElementById('chapters').value;
        book.description = document.getElementById('description').value;
        book.readingStatus = document.querySelector('input[name="reading-status"]:checked').value;
        book.bookStatus = document.querySelector('input[name="book-status"]:checked').value;

        const fileInput = document.getElementById('cover-upload');
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                book.cover = e.target.result;
                saveEditedBook(book);
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            saveEditedBook(book);
        }
    });

    // Save the edited book back to localStorage
    function saveEditedBook(updatedBook) {
        let books = JSON.parse(localStorage.getItem('books')) || [];

        // Find and update the existing book in the books array
        books = books.map(storedBook => storedBook.title === book.title ? updatedBook : storedBook);

        // Update localStorage with the modified books array
        localStorage.setItem('books', JSON.stringify(books));

        // Update the selectedBook in localStorage to reflect the changes
        localStorage.setItem('selectedBook', JSON.stringify(updatedBook));

        // Redirect back to the details page
        window.location.href = '../details/detailsIndex.html';
    }

    // Handle cancel button click
    document.getElementById('cancelEdit').addEventListener('click', function() {
        history.back(); // Navigate back to the previous page without saving changes
    });
    
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
