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
