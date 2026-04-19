const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "bestbuy";
const COLLECTION = "products";

//test

let db;

async function connectToMongo() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db(DB_NAME);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "product-service" });
});

app.get("/products", async (req, res) => {
  try {
    const products = await db.collection(COLLECTION).find({}).toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = req.body;
    const result = await db.collection(COLLECTION).insertOne(product);
    res.status(201).json({ message: "Product created", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`product-service running on port ${PORT}`);
  });
});
