// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart
function addToCart(id, name, price) {
    let item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    saveCart();
    alert("Added to Cart!");
}

// Display cart
function displayCart() {
    let cartContainer = document.getElementById("cart-items");
    let totalContainer = document.getElementById("total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div>
                <h4>${item.name}</h4>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: 
                    <button onclick="changeQty(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQty(${index}, 1)">+</button>
                </p>
                <button onclick="removeItem(${index})">Remove</button>
                <hr>
            </div>
        `;
    });

    totalContainer.innerHTML = "Total: ₹" + total;
}

// Change quantity
function changeQty(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

// Run display on cart page load
displayCart();