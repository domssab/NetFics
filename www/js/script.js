document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed.");

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

    // Example: updating other parts of the profile page (if needed)
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-username').textContent = user.username;
    document.getElementById('books-count').textContent = user.booksCount;
    document.getElementById('finished-count').textContent = user.finishedCount;

    // Additional logic for profile image, bio, etc., as needed
    const bioElement = document.getElementById('bio');
    if (!user.bio.trim()) {
        bioElement.textContent = "Tap here to add a description about yourself...";
    } else {
        bioElement.textContent = user.bio;
    }
});
