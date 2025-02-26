// Grab the shopping cart button, the cart itself, the main container, and the close button
let iconCart = document.querySelector('.iconCart'); 
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

// When you click the cart button, show or hide the cart
iconCart.addEventListener('click', () => {
    if (cart.style.right === '-100%') { 
        // If the cart is hidden, slide it in and move the container to the left
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    } else { 
        // If the cart is open, slide it back out and reset the container
        cart.style.right = '-100%'; 
        container.style.transform = 'translateX(0)';
    }
});

// When you click the close button, hide the cart
close.addEventListener('click', () => {
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
});

// A place to store the product list (empty for now)
let products = null;

// Fetch product data from an external file
fetch('product.json')
    .then(response => response.json()) // Convert file data to JavaScript objects
    .then(data => {
        products = data; // Save the data in the "products" list
        addDataToHTML(); // Show the products on the page
    })
    .catch(error => console.error('Error loading products:', error)); // Show error if the file can't load

// Function to show products on the webpage
function addDataToHTML() {
    let listProductHTML = document.querySelector('.listproduct');
    listProductHTML.innerHTML = ''; // Clear out anything that was there before

    if (products) {
        products.forEach(product => { 
            let newProduct = document.createElement('div'); // Create a new product box
            newProduct.classList.add('item'); // Give it a class for styling
            newProduct.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <div class="price">₱${product.price.toFixed(2)}</div>
                <button onclick="addcart(${product.id})">Add to Order</button>
            `;
            listProductHTML.appendChild(newProduct); // Add the product to the page
        });
    }
}

// Shopping cart object to store selected products
let listcart = {};

// Check if there's already a cart saved in localStorage
function checkcart() {
    let savedCart = localStorage.getItem("listcart");
    if (savedCart) {
        try {
            listcart = JSON.parse(savedCart); // Convert saved data back into JavaScript objects

            // Ensure all cart items have an image
            Object.keys(listcart).forEach(id => {
                let product = products.find(p => p.id == id);
                if (product) {
                    listcart[id].image = product.image;
                }
            });

        } catch (error) {
            console.error('Error parsing cart data:', error);
            listcart = {}; // If something goes wrong, reset the cart
        }
    }
}
checkcart(); // Load cart when the page starts
addCartToHTML(); // Show the cart's contents

// Function to add items to the cart
function addcart(idproduct) {
    let dataproduct = products.find(product => product.id == idproduct); // Find the product by ID
    if (!dataproduct) return; // If the product is not found, stop

    if (!listcart[idproduct]) {
        // If the product isn't in the cart, add it with a quantity of 1
        listcart[idproduct] = { 
            ...dataproduct, 
            quantity: 1
        };
    } else {
        // If it's already in the cart, just increase the quantity
        listcart[idproduct].quantity++;
    }

    localStorage.setItem("listcart", JSON.stringify(listcart)); // Save cart to localStorage
    addCartToHTML(); // Update the cart display
}

// Function to update the cart UI
function addCartToHTML() {
    let listcartHTML = document.querySelector('.listcart');
    listcartHTML.innerHTML = ''; // Clear out the old cart display

    let totalHTML = document.querySelector('.totalquantity'); // Get the total quantity element
    let totalquantity = 0; // Start counting total items

    Object.values(listcart).forEach(product => {
        if (product) {
            let newcart = document.createElement('div'); // Create a new cart item
            newcart.classList.add('item');

            // Ensure there's a valid image (otherwise use a default image)
            let imageSrc = product.image ? product.image : 'images/default.jpg';

            newcart.innerHTML = `
                <img src="${imageSrc}" alt="${product.name}">
                <div class="content">
                    <div class="name">${product.name}</div>
                    <div class="price">₱${product.price.toFixed(2)} / 1 product</div>
                </div>
                <div class="quantity">
                    <button onclick="updateQuantity(${product.id}, -1)">-</button>
                    <span class="value">${product.quantity}</span>
                    <button onclick="updateQuantity(${product.id}, 1)">+</button>
                </div>
            `;
            listcartHTML.appendChild(newcart); // Add the new cart item to the cart
            totalquantity += product.quantity; // Add to total item count
        }
    });

    totalHTML.innerText = totalquantity; // Show the total number of items in the cart
}

// Function to update item quantity
function updateQuantity(id, change) {
    if (listcart[id]) {
        listcart[id].quantity += change; // Increase or decrease quantity
        if (listcart[id].quantity <= 0) {
            delete listcart[id]; // Remove item if quantity reaches 0
        }
        localStorage.setItem("listcart", JSON.stringify(listcart)); // Save changes
        addCartToHTML(); // Refresh cart display
    }
}
