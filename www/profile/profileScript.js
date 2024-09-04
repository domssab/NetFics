document.addEventListener("DOMContentLoaded", function() {
    // Retrieve user data from localStorage
    let user = JSON.parse(localStorage.getItem('userProfile')) || {
        profileImage: '',
        name: 'World',
        username: '@username',
        booksCount: 0,
        finishedCount: 0,
        bio: ''
    };

    // Load user data into the profile page
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-username').textContent = user.username;
    document.getElementById('books-count').textContent = user.booksCount;
    document.getElementById('finished-count').textContent = user.finishedCount;
    document.getElementById('bio').value = user.bio;

    // Load profile image if available
    const profileImagePreview = document.getElementById('profile-image-preview');
    if (user.profileImage) {
        profileImagePreview.src = user.profileImage;
        profileImagePreview.style.display = 'block';
    }

    // Save user profile data to localStorage
    function saveUserProfile(updatedUser) {
        localStorage.setItem('userProfile', JSON.stringify(updatedUser));
    }

    // Example: Updating book counts
    let books = JSON.parse(localStorage.getItem('books')) || [];
    let finishedBooks = books.filter(book => book.readingStatus === "Finished").length;

    user.booksCount = books.length;
    user.finishedCount = finishedBooks;
    document.getElementById('books-count').textContent = user.booksCount;
    document.getElementById('finished-count').textContent = user.finishedCount;
    saveUserProfile(user);
});