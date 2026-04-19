const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "bestbuy";
const COLLECTION = "orders";
// test
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
  res.status(200).json({ status: "ok", service: "makeline-service" });
});

app.post("/process", async (req, res) => {
  try {
    const pendingOrder = await db.collection(COLLECTION).findOne({ status: "pending" });

    if (!pendingOrder) {
      return res.status(404).json({ message: "No pending orders found" });
    }

    await db.collection(COLLECTION).updateOne(
      { _id: pendingOrder._id },
      { $set: { status: "completed", processedAt: new Date() } }
    );

    res.json({
      message: "Order processed successfully",
      orderId: pendingOrder._id
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process order" });
  }
});

connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`makeline-service running on port ${PORT}`);
  });
});
