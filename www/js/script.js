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
});
