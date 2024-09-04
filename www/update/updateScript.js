document.addEventListener("DOMContentLoaded", function() {
    const usernameInput = document.getElementById('profile-username')
    let user = JSON.parse(localStorage.getItem('userProfile')) || {
        profileImage: '',
        name: '',
        username: '',
        bio: ''
    };

    // Populate fields with current user data
    document.getElementById('profile-name').value = user.name;
    document.getElementById('profile-username').value = user.username;
    document.getElementById('bio').value = user.bio;
    
    // Load profile image if available
    const profileImagePreview = document.getElementById('profile-preview');
    if (user.profileImage) {
        profileImagePreview.src = user.profileImage;
    }

    // Handle Save Profile
    document.getElementById('saveProfile').addEventListener('click', function() {
        user.name = document.getElementById('profile-name').value;
        user.username = document.getElementById('profile-username').value;
        user.bio = document.getElementById('bio').value;
        
        // Update profile image if changed
        const fileInput = document.getElementById('profile-upload');
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                user.profileImage = e.target.result;
                localStorage.setItem('userProfile', JSON.stringify(user));
                window.location.href = '../profile/profileIndex.html'; // Redirect back to profile page
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            localStorage.setItem('userProfile', JSON.stringify(user));
            window.location.href = '../profile/profileIndex.html'; // Redirect back to profile page
        }
    });

        // Ensure the username always starts with @
        usernameInput.addEventListener('input', function() {
            if (!usernameInput.value.startsWith('@')) {
                usernameInput.value = '@' + usernameInput.value.replace(/^@+/, '');
            }
        });

        
    // Handle cancel button click
    document.getElementById("cancelUpdate").addEventListener('click', function() {
        history.back(); // Navigate back to the previous page without saving changes
        window.location.href = '../profile/profileIndex.html'; // Redirect back to profile page
    });
});