// Toggle the dropdown
document.querySelector('.fa-ellipsis-vertical').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent this click event from triggering the window click listener
    document.querySelector('.dropdown').classList.toggle('show');
});

// Add event listeners to each dropdown item
var dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(function(item) {
    item.addEventListener('click', function() {
        // Remove active class from all items
        dropdownItems.forEach(function(item) {
            item.classList.remove('active');
        });
        // Add active class to the clicked item
        this.classList.add('active');

        // Save the selected layout to localStorage
        const selectedLayout = this.getAttribute('data-value');
        localStorage.setItem('selectedLayout', selectedLayout);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const selectedLayout = localStorage.getItem('selectedLayout');
    if (selectedLayout) {
        var dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(function(item) {
            // Remove active class from all items
            item.classList.remove('active');
            // Apply active class to the item that matches the saved layout
            if (item.getAttribute('data-value') === selectedLayout) {
                item.classList.add('active');
            }
        });
    }
});


// Close the dropdown if clicked outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    const icon = document.querySelector('.fa-ellipsis-vertical');
    
    if (dropdown.classList.contains('show') && !icon.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const bookContainer = document.getElementById('book-container');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const layout = this.getAttribute('data-value');
            switchLayout(layout);
        });
    });

    function switchLayout(layout) {
        if (layout === 'gridLayout') {
            bookContainer.classList.remove('book-list');
            bookContainer.classList.add('book-grid');
        } else if (layout === 'listLayout') {
            bookContainer.classList.remove('book-grid');
            bookContainer.classList.add('book-list');
        }
    }
});