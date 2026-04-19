const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:3001";
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || "http://localhost:3002";
const MAKELINE_SERVICE_URL = process.env.MAKELINE_SERVICE_URL || "http://localhost:3003";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Best Buy Admin</title>
        <style>
          body {
            font-family: Arial;
            max-width: 800px;
            margin: 40px auto;
          }
          h1 { color: #0046be; }
          .card {
            border: 1px solid #ccc;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 8px;
          }
          input, button {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
          }
          button {
            background-color: #28a745;
            color: white;
            border: none;
          }
        </style>
      </head>
      <body>
        <h1>Best Buy Admin Panel</h1>

        <div class="card">
          <h2>Create Product</h2>
          <form method="POST" action="/product">
            <input name="name" placeholder="Product Name" required />
            <input name="price" placeholder="Price" required />
            <button>Create Product</button>
          </form>
        </div>

        <div class="card">
          <h2>Process Orders</h2>
          <form method="POST" action="/process">
            <button>Run Makeline</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

app.post("/product", async (req, res) => {
  try {
    const response = await fetch(`${PRODUCT_SERVICE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: req.body.name,
        price: Number(req.body.price)
      })
    });

    const data = await response.json();
    res.send(`<pre>${JSON.stringify(data, null, 2)}</pre><a href="/">Back</a>`);
  } catch (err) {
    res.send("Error connecting to product-service");
  }
});

app.post("/process", async (req, res) => {
  try {
    const response = await fetch(`${MAKELINE_SERVICE_URL}/process`, {
      method: "POST"
    });

    const data = await response.json();
    res.send(`<pre>${JSON.stringify(data, null, 2)}</pre><a href="/">Back</a>`);
  } catch (err) {
    res.send("Error running makeline");
  }
});

app.listen(PORT, () => {
  console.log(`store-admin running on port ${PORT}`);
});