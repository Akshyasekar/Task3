const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Get all products
router.get("/", (req, res) => {

    db.query("SELECT * FROM products", (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Error getting products"
            });
        }

        res.json(results);
    });
});


// Get one product
router.get("/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM products WHERE id = ?",
        [id],
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: "Error getting product"
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            res.json(results[0]);
        }
    );
});


// Add product
router.post("/", (req, res) => {

    const {
        name,
        description,
        price,
        image,
        stock
    } = req.body;

    const sql = `
        INSERT INTO products
        (name, description, price, image, stock)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, description, price, image, stock],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Product creation failed",
                    error: err.message
                });
            }

            res.json({
                message: "Product created successfully",
                id: result.insertId
            });
        }
    );
});


// Update product
router.put("/:id", (req, res) => {

    const id = req.params.id;

    const {
        name,
        description,
        price,
        image,
        stock
    } = req.body;

    const sql = `
        UPDATE products
        SET name = ?,
            description = ?,
            price = ?,
            image = ?,
            stock = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [name, description, price, image, stock, id],
        (err) => {

            if (err) {
                return res.status(500).json({
                    message: "Product update failed"
                });
            }

            res.json({
                message: "Product updated successfully"
            });
        }
    );
});


// Delete product
router.delete("/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM products WHERE id = ?",
        [id],
        (err) => {

            if (err) {
                return res.status(500).json({
                    message: "Product deletion failed"
                });
            }

            res.json({
                message: "Product deleted successfully"
            });
        }
    );
});


module.exports = router;
