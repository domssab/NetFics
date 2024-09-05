document.addEventListener("DOMContentLoaded", function() {
    const usernameInput = document.getElementById('profile-username');
    const headerProfileImage = document.getElementById('header-profile');
    const headerName = document.getElementById('header-name');

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
        headerProfileImage.src = user.profileImage; // Set header profile image
    }

    // Update header with user data
    document.getElementById('header-profile').src = user.profileImage;
    document.getElementById('header-name').textContent = `Hello, ${user.name}!`;

    // Handle profile image upload
    const profileUpload = document.getElementById('profile-upload');
    profileUpload.addEventListener('change', function() {
        const file = profileUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImagePreview.src = e.target.result;
                headerProfileImage.src = e.target.result; // Update header profile image
                user.profileImage = e.target.result;
                localStorage.setItem('userProfile', JSON.stringify(user));
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Handle Save Profile
    document.getElementById('saveProfile').addEventListener('click', function() {
        console.log("Save button clicked!"); // Debugging statement
        user.name = document.getElementById('profile-name').value;
        user.username = document.getElementById('profile-username').value;
        user.bio = document.getElementById('bio').value;
        
        headerName.textContent = user.name; // Update header name in real-time
        
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
        console.log("Cancel button clicked!"); // Debugging statement
        history.back(); // Navigate back to the previous page without saving changes
    });

    // To disable scrolling of textarea
    const textarea = document.getElementById('bio');
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';  // Reset the height
        this.style.height = this.scrollHeight + 'px';  // Set the height based on the scroll height
    });
    textarea.dispatchEvent(new Event('input')); // Adjust height if there's content
});
