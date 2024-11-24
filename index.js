const express = require("express");
const bodyParser = require("body-parser");
const db = require("./services/db");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const result = await db.query("select * FROM users");
    // console.log(result);
    res.json(result);
});

app.get('/users', async (req, res) => {
    const { firstname } = req.query;

    if (firstname) {
        const result = await db.query("select * FROM users WHERE firstname = ?", [firstname]);
        res.json(result);
    } else {
        const result = await db.query("select * FROM users");
        res.json(result);
    }
});

app.get('/category', async (req, res) => {
    const result = await db.query("select * FROM categories");
    res.json(result);
});

app.get('/products', async (req, res) => {
    const result = await db.query(`
        SELECT * 
        FROM products
        INNER JOIN product_details ON products.product_id = product_details.product_id
        INNER JOIN categories ON products.category_id = categories.category_id
    `);
    res.json(result);
});

app.post('/users', async (req, res) => {
    const { username, password, firstname, lastname, email, phonenumber } = req.body;

    const result = await db.query(`
        INSERT INTO users (username, password, firstname, lastname, email, phonenumber)
        VALUES(?, ?, ?, ?, ?, ?)
    `, [username, password, firstname, lastname, email, phonenumber])

    res.json(result);
});

app.listen(4005, () => {
    console.log("API Running");
})