let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


function displayCart() {

    const container =
        document.getElementById("cart");

    const totalElement =
        document.getElementById("total");

    container.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        container.innerHTML =
            "<h2>Your cart is empty</h2>";

        totalElement.innerHTML = "";

        return;
    }

    cart.forEach(product => {

        const div = document.createElement("div");

        const productTotal =
            product.price * product.quantity;

        total += productTotal;

        div.innerHTML = `
            <h2>${product.name}</h2>

            <p>Price: ₹${product.price}</p>

            <p>
                Quantity:
                <button onclick="decrease(${product.id})">-</button>

                ${product.quantity}

                <button onclick="increase(${product.id})">+</button>
            </p>

            <p>
                Product Total: ₹${productTotal}
            </p>

            <button onclick="removeFromCart(${product.id})">
                Remove
            </button>

            <hr>
        `;

        container.appendChild(div);

    });

    totalElement.innerHTML =
        "Total: ₹" + total;
}


function increase(id) {

    const product =
        cart.find(p => p.id === id);

    product.quantity++;

    saveCart();

}


function decrease(id) {

    const product =
        cart.find(p => p.id === id);

    if (product.quantity > 1) {

        product.quantity--;

    }

    saveCart();

}


function removeFromCart(id) {

    cart =
        cart.filter(p => p.id !== id);

    saveCart();

}


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href =
        "checkout.html";
}


displayCart();
