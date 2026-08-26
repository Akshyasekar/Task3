const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const productRoutes =
    require("./routes/productRoutes");

const authRoutes =
    require("./routes/authRoutes");


app.use(cors());

app.use(express.json());


app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/api/auth",
    authRoutes
);


app.get("/", (req, res) => {

    res.send(
        "E-Commerce Backend is Running"
    );

});


const PORT =
    process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});
