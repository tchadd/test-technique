const express = require('express');
const app = new express();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// connect to mangodb 
async function connectionMangodb() {
  await client.connect();
  console.log('Connection OK');
  return 'done!'
}

// check db connection 
function checkDb(){
  connectionMangodb() 
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())
}

app.get('/products', async (req, res) => {
  try {
    checkDb()
    const database = client.db();
    const collection = database.collection('products');
    const products = await collection.find({}).toArray();
    res.json(products);
  }
  catch(err) {
    console.error('Failed to fetch products', err);
    res.status(500).send('Internal Server Error');
  }
})

app.listen(3000, () => {
  console.log("Server Listening");
});