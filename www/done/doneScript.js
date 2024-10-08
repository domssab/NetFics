document.addEventListener("DOMContentLoaded", function() {
    const bookListContainer = document.getElementById('book-container');
    const dropdownIcon = document.querySelector('.fa-ellipsis-vertical');
    const dropdown = document.querySelector('.dropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    // Fetch books from localStorage and filter for finished books
    function displayBooks() {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        const finishedBooks = books.filter(book => book.readingStatus === "Finished");
        bookListContainer.innerHTML = ''; // Clear previous content

        finishedBooks.forEach((book) => {
            const bookItem = document.createElement("div");
            bookItem.className = "book-item";
            bookItem.innerHTML = `
                <img src="${book.cover}" alt="Book Cover" class="book-cover">
                <div class="book-details">
                    <span class="title" data-label="Title">${book.title}</span><br>
                    <span class="author" data-label="Author">${book.author}</span><br>
                </div>
            `;
            bookItem.addEventListener('click', function() {
                // Save the current page (library) URL before navigating
                localStorage.setItem('previousPage', window.location.href);

                // Save the selected book details to localStorage
                localStorage.setItem('selectedBook', JSON.stringify(book));

                // Navigate to the details page
                window.location.href = '../details/detailsIndex.html';
            });
            bookListContainer.appendChild(bookItem);
        });
    }

    // Initialize book display
    displayBooks();

    // Handle dropdown toggle
    if (dropdownIcon && dropdown) {
        dropdownIcon.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent this click event from triggering the window click listener
            dropdown.classList.toggle('show');
        });
    }

    // Handle dropdown item selection
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function() {
            dropdownItems.forEach(function(item) {
                item.classList.remove('active');
            });
            this.classList.add('active');

            const selectedLayout = this.getAttribute('data-value');
            localStorage.setItem('selectedLayout', selectedLayout);
            switchLayout(selectedLayout);
        });
    });

    // Load and apply the saved layout
    const selectedLayout = localStorage.getItem('selectedLayout');
    if (selectedLayout) {
        dropdownItems.forEach(function(item) {
            item.classList.remove('active');
            if (item.getAttribute('data-value') === selectedLayout) {
                item.classList.add('active');
            }
        });
        switchLayout(selectedLayout);
    }

    // Function to switch layout
    function switchLayout(layout) {
        if (bookListContainer) {
            if (layout === 'gridLayout') {
                bookListContainer.classList.remove('book-list');
                bookListContainer.classList.add('book-grid');
            } else if (layout === 'listLayout') {
                bookListContainer.classList.remove('book-grid');
                bookListContainer.classList.add('book-list');
            }
        }
    }

    // Close the dropdown if clicked outside
    document.addEventListener('click', function(event) {
        if (dropdown && dropdown.classList.contains('show') && dropdownIcon && !dropdownIcon.contains(event.target)) {
            dropdown.classList.remove('show');
        }
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
