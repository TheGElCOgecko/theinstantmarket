document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.split('/').pop() === 'buyer.html') document.getElementById("searchBtn").click();

    // Initialize sessionStorage with default products if not present
    if (!sessionStorage.getItem('products')) {
        const defaultProducts = [
            { id: 1, name: "Apples", description: "Fresh and crispy apples.", price: "$1.00" },
            { id: 2, name: "iPhones", description: "Latest model iPhones with advanced features.", price: "$999" },
            { id: 3, name: "Hats", description: "Stylish hats for all seasons.", price: "$20" }
        ];
        sessionStorage.setItem('products', JSON.stringify(defaultProducts));
        console.log("Initialized sessionStorage with default products.");
    } else console.log("sessionStorage already initialized.");

    // Call the function to load the navbar
    loadNavbar();
});

// Function to load the navbar
function loadNavbar() {
    fetch('navbar.html')
        .then(response => {
            if (!response.ok)
                throw new Error('Network response was not ok ' + response.statusText);
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            // Set the active link based on the current page
            setActiveNavLink();
        })
        .catch(error => {
            console.error('There was a problem loading the navbar:', error);
        });
}

// Function to set the active class on the navbar based on the current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
        else link.classList.remove('active');
    });
}