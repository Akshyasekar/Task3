const ordersContainer =
    document.getElementById("orders");

const order =
    JSON.parse(localStorage.getItem("lastOrder"));


if (!order) {

    ordersContainer.innerHTML =
        "<h2>No orders found</h2>";

} else {

    let html = `

        <h2>Order Details</h2>

        <p>
            Name: ${order.name}
        </p>

        <p>
            Address: ${order.address}
        </p>

        <p>
            Phone: ${order.phone}
        </p>

        <p>
            Date: ${order.date}
        </p>

        <h3>Order Status: Placed</h3>

        <h3>Products</h3>
    `;


    order.products.forEach(product => {

        html += `

            <p>
                ${product.name}
                -
                ₹${product.price}
                ×
                ${product.quantity}
            </p>

        `;

    });


    ordersContainer.innerHTML = html;

}
