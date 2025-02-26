let newcart = [];

// Function to load cart from localStorage
function checkcart() {
    let savedCart = localStorage.getItem("listcart");
    if (savedCart) {
        try {
            newcart = JSON.parse(savedCart) || [];
        } catch (error) {
            console.error("Error parsing cart data:", error);
            newcart = [];
        }
    }
}

checkcart();
addCartToHTML();

// Function to update the checkout page UI
function addCartToHTML() {
    let newcartHTML = document.querySelector('.returncart .list');
    newcartHTML.innerHTML = '';

    let totalquantityHTML = document.querySelector('.totalquantity');
    let totalpriceHTML = document.querySelector('.totalprice');

    let totalquantity = 0;
    let totalprice = 0;

    // If cart contains products
    if (Object.keys(newcart).length > 0) {
        Object.values(newcart).forEach(product => {
            if (product) {
                let newP = document.createElement('div');
                newP.classList.add('item');

                // Ensure image exists
                let imageSrc = product.image ? product.image : 'images/default.jpg';

                newP.innerHTML = `
                    <img src="${imageSrc}" alt="${product.name}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">₱${product.price.toFixed(2)} / 1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnprice">₱${(product.price * product.quantity).toFixed(2)}</div>
                `;

                newcartHTML.appendChild(newP);
                totalquantity += product.quantity;
                totalprice += product.price * product.quantity;
            }
        });
    }

    totalquantityHTML.innerText = totalquantity;
    totalpriceHTML.innerText = `₱${totalprice.toFixed(2)}`;
}

// Function to clear cart on checkout
document.querySelector('.checkout').addEventListener('click', function () {
    alert("Order Placed Successfully!");
    localStorage.removeItem("listcart"); // Clear cart
    window.location.href = "/"; // Redirect to homepage
});
