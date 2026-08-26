const form =
    document.getElementById("checkoutForm");


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const address =
        document.getElementById("address").value;

    const phone =
        document.getElementById("phone").value;

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const order = {

        name: name,

        address: address,

        phone: phone,

        products: cart,

        date: new Date().toLocaleString()

    };

    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );

    localStorage.removeItem("cart");

    alert("Order placed successfully!");

    window.location.href =
        "orders.html";

}); 
