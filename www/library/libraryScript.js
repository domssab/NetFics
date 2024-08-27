document.getElementById('layout-toggle').addEventListener('click', function() {
    document.querySelector('.dropdown').classList.toggle('show');
});

function setLayout(layout) {
    const library = document.getElementById('library');
    if (layout === 'grid') {
        library.classList.remove('list-layout');
        library.classList.add('grid-layout');
    } else if (layout === 'list') {
        library.classList.remove('grid-layout');
        library.classList.add('list-layout');
    }
    document.querySelector('.dropdown').classList.remove('show');
}

const books = [
    { title: "Title goes here", author: "Author" },
    { title: "Title goes here", author: "Author" },
    { title: "Title goes here", author: "Author" },
    { title: "Title goes here", author: "Author" },
    { title: "Title goes here", author: "Author" },
    { title: "Title goes here", author: "Author" }
];

function displayBooks() {
    const library = document.getElementById('library');
    library.innerHTML = ''; // Clear existing content
    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <img src="placeholder-image.png" alt="Book Cover">
            <h2>${book.title}</h2>
            <p>${book.author}</p>
        `;
        library.appendChild(bookItem);
    });
}

displayBooks();

// Close dropdown if clicked outside
window.addEventListener('click', function(event) {
    if (!event.target.matches('#layout-toggle') && !event.target.matches('.dropdown-item')) {
        const dropdowns = document.getElementsByClassName("dropdown");
        for (let i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains('show')) {
                dropdowns[i].classList.remove('show');
            }
        }
    }
});
