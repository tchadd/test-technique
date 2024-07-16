const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGO_URL
const dbName = 'bdd-test-technique';

let db;

const connectToDb = async () => {
  if (db) return db;

  try {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connecté à MongoDB');
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Erreur de connexion à MongoDB', error);
    throw error;
  }
};

module.exports = { connectToDb };




// let client;
// let productsCollection;

// async function connectDb() {
//   try {
//     client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
//     await client.connect();
//     console.log('Connected to MongoDB');
//     const db = client.db(); // Accéder à la base de données par défaut
//     productsCollection = db.collection('products');
//   } catch (err) {
//     console.error('Failed to connect to MongoDB', err);
//     process.exit(1);
//   }
//   return productsCollection
// }

// module.exports = {
//   connectDb,
// };


// URL de connexion à MongoDB (remplacez <username>, <password>, <cluster-url>, et <dbname> par vos informations)