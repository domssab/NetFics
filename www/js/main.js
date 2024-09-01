document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("book-form");
    const bookListContainer = document.createElement("div"); // Container for the book list
    document.body.appendChild(bookListContainer);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Capture the form data
        var title = document.getElementById("title").value;
        var author = document.getElementById("author").value;
        var chapters = document.getElementById("chapters").value;
        var description = document.getElementById("description").value;
        var readingStatus = document.querySelector('input[name="reading-status"]:checked').value;
        var bookStatus = document.querySelector('input[name="book-status"]:checked').value;
        var bookCover = document.getElementById("cover-preview").src[0]

        // Create a book object
        const book = {
            title: title,
            author: author,
            chapters: chapters,
            description: description,
            readingStatus: readingStatus,
            bookStatus: bookStatus,
            cover: bookCover
        };

        // Save the book object to local storage
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));

        // Clear the form after saving
        form.reset();
        document.getElementById('cover-preview').style.display = 'none';
        // Display the updated book list
        displayBooks();
    });

    // Function to display the books on the app
    function displayBooks() {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        bookListContainer.innerHTML = ''; // Clear previous content

        books.forEach((book, index) => {
            const bookItem = document.createElement("div");
            bookItem.className = "book-item";
            bookItem.innerHTML = `
                <img src="${book.cover}" alt="Book Cover" class="book-cover">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Chapters:</strong> ${book.chapters}</p>
                <p><strong>Description:</strong> ${book.description}</p>
                <p><strong>Reading Status:</strong> ${book.readingStatus}</p>
                <p><strong>Book Status:</strong> ${book.bookStatus}</p>
            `;
            bookListContainer.appendChild(bookItem);
        });
    }

    // Function to preview the book cover
    function loadCover(event) {
        const coverPreview = document.getElementById('cover-preview');
        coverPreview.src = URL.createObjectURL(event.target.files[0]);
        coverPreview.style.display = 'block'; // Make sure the preview is visible
    }

    // Ensure the function is globally accessible
    document.getElementById('cover-upload').addEventListener('change', loadCover);

    // Display the books when the page loads
    displayBooks();
});
