const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  //db and collections
  const db = client.db("portfolio");
  const projectCollection = db.collection("projects");
  //-----
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

    //api
    app.get("/projects", async (req, res) => {
      const result = await projectCollection.find().toArray();
      res.json(result);
    });
  } catch (error) {
    console.error(error);
  }
}
run().catch(console.dir);
