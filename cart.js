document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".cart-items")) {
        updateCartDisplay();
    }

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const product = event.target.closest(".product");
            const productName = product.querySelector("h3").innerText;
            const productPrice = parseInt(product.querySelector(".price").innerText.replace("₹", "").replace(",", ""));
            const productImage = product.querySelector("img").src;

            addToCart(productName, productPrice, productImage);
        });
    });
});

// Function to add item to cart
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart! 🛒`);
}

// Function to update cart display
function updateCartDisplay() {
    const cartContainer = document.querySelector(".cart-items");
    const totalContainer = document.querySelector(".total-price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";

    let totalCost = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
        totalContainer.innerHTML = "";
    } else {
        cart.forEach((item, index) => {
            totalCost += item.price * item.quantity;

            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-image">
                <div class="cart-details">
                    <p><strong>${item.name}</strong></p>
                    <p>Price: ₹${item.price.toLocaleString()}</p>
                    <p>Quantity: 
                        <button class="decrease-qty" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-qty" data-index="${index}">+</button>
                    </p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        totalContainer.innerHTML = `<h3>Total: ₹${totalCost.toLocaleString()}</h3>`;
    }

    setupQuantityButtons();
    setupRemoveButtons();
}

// Function to handle quantity update buttons
function setupQuantityButtons() {
    document.querySelectorAll(".increase-qty").forEach(button => {
        button.addEventListener("click", (event) => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let index = event.target.getAttribute("data-index");
            cart[index].quantity += 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        });
    });

    document.querySelectorAll(".decrease-qty").forEach(button => {
        button.addEventListener("click", (event) => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let index = event.target.getAttribute("data-index");
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1); // Remove item if quantity reaches 0
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        });
    });
}

// Function to handle item removal
function setupRemoveButtons() {
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (event) => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        });
    });
}
