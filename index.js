const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

// Middleware
app.use(cors());
app.use(express.json());

// Home
app.get("/", (req, res) => {
  res.send("Task Management Server is Running");
});



app.listen(port, () => {
  console.log(`Task Mangement is running`);
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g7l6o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //   await client.connect();
    const database = client.db("taskTrackerDB");
    const usersCollection = database.collection("users");
    const taskCollection = database.collection("tasks");

    app.post("/users", async (req, res) => {
        const userData = req.body;
        const query = {email: userData.email};
        const existingUser = await usersCollection.findOne(query);
        if(existingUser){
            return res.send({ message: "user already exists", insertedId: null });
        }else{
            const result = await usersCollection.insertOne(userData);
            res.send(result);
        }
      });
    app.post("/tasks", async(req, res) =>{

        const taskData = req.body;
        const result = taskCollection.insertOne(taskData);
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //   await client.close();
  }
}
run().catch(console.dir);
