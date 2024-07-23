console.clear();

import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const PORT = 3000;

const server = express();

// Uncomment these as part of Step 3!
const uri = 'mongodb+srv://ronald:huntercollege@cluster0.og81gq5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
await client.connect();

server.get('/connection', async (req, res) => {
  const ping = await client.db('admin').command({ ping: 1 })
  const dbs = await client.db().admin().listDatabases();
  res.end(JSON.stringify({
    ping,
    dbs
  }));
})

server.get('/db/findOne/:db/:collection', async (req, res) => {
  const { db, collection } = req.params;
  const result = await client.db(db).collection(collection).findOne({});
  res.send(result);
});

server.get('/', (req, res) => {
  res.send('<h1>Include this in your screenshot for Step 2 of your lab report!</h1>')
})

server.listen(PORT, () => {
  console.log(`Server Listening On Port:${PORT}`);
})