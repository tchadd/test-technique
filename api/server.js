const express = require('express');
const app = new express();
const router = express.Router()
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

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

// middleware parse JSON requests if exists
app.use(express.json());





const PORT = process.env.PORT_NODEJS_SERVER || 3000;
app.listen(3000, () => {
  console.log("Server Listening");
});