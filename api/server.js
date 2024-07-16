const express = require('express');
const app = new express();
const productRoutes = require('./routes/products.js');
require('dotenv').config();
const { connectToDb } = require("./config/db.js")

async function main() {
  let db = await connectToDb();

  // Middleware to add db to req
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  // Middleware parse JSON requests if exists
  app.use(express.json());
  app.use('/api/products', productRoutes);

  const PORT = process.env.NODEJS_PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server Listening on port", PORT);
  });
}

main().catch(err => {
  console.error('Failed to start server:', err);
});