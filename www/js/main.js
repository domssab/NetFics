document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("book-form");
    const exitButton = document.getElementById('exitButton'); // Exit button
    const addBookLink = document.querySelector('a[href="../add/addIndex.html"]');  // Add a Book page

    

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
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    // Function to preview the book cover
    function loadCover() {
        var fileInput = document.getElementById('cover-upload');
        var preview = document.getElementById('cover-preview');
        var plusIcon = document.querySelector('.fa-plus');
        
        if (fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block'; // Show the image element
                plusIcon.style.display = 'none'; // Hide the plus icon
            };
            reader.readAsDataURL(fileInput.files[0]);
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

        // Check if there is a book to edit
        const bookToEdit = JSON.parse(localStorage.getItem('bookToEdit'));
        if (bookToEdit) {
            // Populate the form with the existing book data
            document.getElementById("title").value = bookToEdit.title;
            document.getElementById("author").value = bookToEdit.author;
            document.getElementById("chapters").value = bookToEdit.chapters;
            document.getElementById("description").value = bookToEdit.description;
    
            document.querySelector(`input[name="reading-status"][value="${bookToEdit.readingStatus}"]`).checked = true;
            document.querySelector(`input[name="book-status"][value="${bookToEdit.bookStatus}"]`).checked = true;
            
            const preview = document.getElementById('cover-preview');
            preview.src = bookToEdit.cover;
            preview.style.display = 'block';
            document.querySelector('.fa-plus').style.display = 'none';
        }
    
        // Handle form submission for editing or adding a book
        form.addEventListener("submit", function (e) {
            e.preventDefault();
    
            // Capture the form data
            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value;
            const chapters = document.getElementById("chapters").value;
            const description = document.getElementById("description").value;
            const readingStatus = document.querySelector('input[name="reading-status"]:checked').value;
            const bookStatus = document.querySelector('input[name="book-status"]:checked').value;
            const fileInput = document.getElementById("cover-upload");
    
            // Create or update the book object
            let bookCover = bookToEdit ? bookToEdit.cover : ''; // Use existing cover if not changed
            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    bookCover = e.target.result;
                    saveOrUpdateBook({ title, author, chapters, description, readingStatus, bookStatus, cover: bookCover });
                };
                reader.readAsDataURL(fileInput.files[0]);
            } else {
                saveOrUpdateBook({ title, author, chapters, description, readingStatus, bookStatus, cover: bookCover });
            }
        });
    
        function saveOrUpdateBook(book) {
            let books = JSON.parse(localStorage.getItem("books")) || [];
    
            if (bookToEdit) {
                // Update existing book
                books = books.map(storedBook => storedBook.title === bookToEdit.title ? book : storedBook);
            } else {
                // Add new book
                books.push(book);
            }
    
            // Save to localStorage
            localStorage.setItem("books", JSON.stringify(books));
            // Clear the bookToEdit from localStorage
            localStorage.removeItem('bookToEdit');
    
            // Redirect back to the library or details page
            window.location.href = "../books/booksIndex.html";
        }

    // Ensure the function is globally accessible
    document.getElementById('cover-upload').addEventListener('change', loadCover);

    // To disable scrolling of textarea
    const textarea = document.getElementById('description');
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';  // Reset the height
        this.style.height = this.scrollHeight + 'px';  // Set the height based on the scroll height
    });
    textarea.dispatchEvent(new Event('input')); // Adjust height if there's content
});
