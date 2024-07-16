require('dotenv').config();

const express = require('express');
const app = new express();
const { MongoClient } = require('mongodb');


app.listen(3000, () => {
    console.log("Server Listening");
  });

async function connection(){
  await client.connect();
  console.log('connection OK')
  return 'done';
}

// Créer une nouvelle instance de MongoClient
const client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Utilisation de la méthode connect pour se connecter à la base de données
async function connection() {
    await client.connect();
    console.log('Connection OK');
    return 'done!'
  
}
connection()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close())

    app.get('/products', async (req, res) => {
      try {
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