const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:3001";
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || "http://localhost:3002";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Best Buy Store Front</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
          }
          h1 { color: #0046be; }
          .card {
            border: 1px solid #ccc;
            padding: 16px;
            margin-bottom: 20px;
            border-radius: 8px;
          }
          input, button {
            padding: 10px;
            margin: 5px 0;
            width: 100%;
          }
          button {
            background-color: #0046be;
            color: white;
            border: none;
            cursor: pointer;
          }
          button:hover {
            background-color: #003399;
          }
        </style>
      </head>
      <body>
        <h1>Best Buy Store Front</h1>

        <div class="card">
          <h2>Customer Portal</h2>
          <p>This is the customer-facing application for the Best Buy cloud-native demo.</p>
        </div>

        <div class="card">
          <h2>Create a Sample Order</h2>
          <form method="POST" action="/order">
            <input type="text" name="customerName" placeholder="Customer Name" required />
            <input type="text" name="productName" placeholder="Product Name" required />
            <input type="number" name="quantity" placeholder="Quantity" required />
            <button type="submit">Place Order</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

app.post("/order", async (req, res) => {
  const { customerName, productName, quantity } = req.body;

  try {
    const response = await fetch(`${ORDER_SERVICE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerName,
        productName,
        quantity: Number(quantity)
      })
    });

    const data = await response.json();

    res.send(`
      <html>
        <body style="font-family: Arial; max-width: 700px; margin: 40px auto;">
          <h1>Order Submitted</h1>
          <p><strong>Customer:</strong> ${customerName}</p>
          <p><strong>Product:</strong> ${productName}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <pre>${JSON.stringify(data, null, 2)}</pre>
          <a href="/">Back to Store Front</a>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`
      <html>
        <body style="font-family: Arial; max-width: 700px; margin: 40px auto;">
          <h1>Order Failed</h1>
          <p>Could not connect to order-service.</p>
          <pre>${error.message}</pre>
          <a href="/">Back</a>
        </body>
      </html>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`store-front running on port ${PORT}`);
});