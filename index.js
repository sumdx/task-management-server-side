const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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

    // add users
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

    //   Post Task
    app.post("/tasks", async(req, res) =>{

        const taskData = req.body;
        const result = await taskCollection.insertOne(taskData);
        res.send(result);
    })
    //   Post Task
    app.delete("/tasks/:id", async(req, res) =>{

        const {id} = req.params;
        const query = {_id: new ObjectId(id)};
        const result = await taskCollection.deleteOne(query);
        res.send(result);
    })

    // get all task by user email
    app.get("/tasks/:email", async(req,res)=>{

        const {email} = req.params;
        const query = {ownerEmail : email};
        const result = await taskCollection.find(query).toArray();

        const toDo = result.filter(task => task.category === "toDo");
        const inProgress = result.filter(task => task.category === "inProgress");
        const done = result.filter(task => task.category === "done");

        const tasks = {toDo, inProgress, done};
        res.send(tasks);
    })

    app.patch("/task", async(req,res)=>{
        const id = req.body.sourceId;
        const update = req.body.category;
        const result = taskCollection.updateOne(
            {_id : new ObjectId(id)},
            {$set: {category : update}}
        )
        res.send(result);
    })
    app.patch("/tasks/:id", async(req,res)=>{
        const id = req.params.id;
        const updateDoc = req.body;
      
        const result = taskCollection.updateOne(
            {_id : new ObjectId(id)},
            {$set: updateDoc}
        )
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    //   await client.close();
  }
}
run().catch(console.dir);
