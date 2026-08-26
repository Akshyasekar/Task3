let products = [];

async function loadProducts() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/products"
        );

        products = await response.json();

        const container = document.getElementById("products");

        container.innerHTML = "";

        products.forEach(product => {

            const div = document.createElement("div");

            div.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Price: ₹${product.price}</p>
                <p>Stock: ${product.stock}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            `;

            container.appendChild(div);
        });

    } catch (error) {

        console.log(error);

    }
}


function addToCart(productId) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const product =
        products.find(p => p.id === productId);

    const existingProduct =
        cart.find(p => p.id === productId);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            quantity: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Product added to cart!");
}


loadProducts();
