import { Db } from "mongodb";

const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGO_URL
const dbName = 'bdd-test-technique';

let db: Db | undefined;

export default async function connectToDB() {
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