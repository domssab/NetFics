document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("book-form");
    const bookListContainer = document.createElement("book-container"); // Container for the book list
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
        var fileInput = document.getElementById("cover-upload");

        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var bookCover = e.target.result;

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

                // Get the existing books from local storage
                let books = JSON.parse(localStorage.getItem("books")) || [];
                books.push(book);

                // Save the book object to local storage
                localStorage.setItem("books", JSON.stringify(books));

                // Clear the form after saving
                form.reset();
                document.getElementById('cover-preview').style.display = 'none';

                // Display the updated book list
                displayBooks();
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    // Function to preview the book cover
    function loadCover() {
        var fileInput = document.getElementById('cover-upload');
        var preview = document.getElementById('cover-preview');
        var file = fileInput.files[0];
        var plusIcon = document.querySelector('.fa-plus');
        
        if (file) {
            var reader = new FileReader();
    
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block'; // Show the image element
                plusIcon.style.display = 'none'; // Hide the plus icon
            };
    
            reader.readAsDataURL(file);
        } else {
            preview.src = '';
            preview.style.display = 'none'; // Hide the image element if no file is selected
            plusIcon.style.display = 'block'; // Show the plus icon if no file is selected
        }
    }

    // Handle exit button click
    document.getElementById('exitButton').addEventListener('click', function() {
        const previousPage = localStorage.getItem('previousPage');
            
        if (previousPage) {
            window.location.href = previousPage; // Navigate back to the saved previous page
        } else {
            history.back(); // Fallback to history.back() if no previous page is saved
        }
    });

    // Ensure the function is globally accessible
    document.getElementById('cover-upload').addEventListener('change', loadCover);

    // To disable scrolling of text area
    const textarea = document.getElementById('description');
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';  // Reset the height
        this.style.height = this.scrollHeight + 'px';  // Set the height based on the scroll height
    });

    // Trigger the input event to adjust the height if there is already content
    textarea.dispatchEvent(new Event('input'));
});
