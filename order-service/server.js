const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "bestbuy";
const COLLECTION = "orders";

let db = null;
let useMemoryStore = false;
let memoryOrders = [];

async function connectToMongo() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db(DB_NAME);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed. Using in-memory demo mode.");
    useMemoryStore = true;
  }
}

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "order-service",
    storage: useMemoryStore ? "memory" : "mongodb"
  });
});

app.get("/orders", async (req, res) => {
  try {
    if (useMemoryStore) {
      return res.json(memoryOrders);
    }

    const orders = await db.collection(COLLECTION).find({}).toArray();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const order = {
      id: Date.now(),
      ...req.body,
      status: "pending",
      createdAt: new Date()
    };

    if (useMemoryStore) {
      memoryOrders.push(order);
      return res.status(201).json({
        message: "Order created (memory mode)",
        order
      });
    }

    const result = await db.collection(COLLECTION).insertOne(order);
    res.status(201).json({
      message: "Order created",
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`order-service running on port ${PORT}`);
  });
});
